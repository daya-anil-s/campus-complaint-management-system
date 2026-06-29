import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import {
  Button,
  ButtonLink,
  Card,
  PageHeader,
  PageShell,
  StatusBadge,
} from "../../components/ui";
import { SkeletonComplaint } from "../../components/SkeletonLoader";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Send comment
  const handleCommentSubmit = async () => {
    if (!message.trim()) return;

    try {
      setSending(true);

      await api.post("/comments", {
        complaintId: id,
        message,
      });

      setMessage("");
      await fetchComments();
    } catch (error) {
      console.error("Error sending comment:", error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        setComplaint(res.data);

        await fetchComments();
      } catch (error) {
        console.error("Error fetching complaint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <PageShell compact>
        <SkeletonComplaint />
      </PageShell>
    );
  }

  if (!complaint) {
    return (
      <PageShell compact>
        <p className="text-center text-signal-red font-semibold">
          Complaint not found.
        </p>

        <div className="mt-6 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => navigate("/student/complaints")}
          >
            Back to Complaints
          </Button>
        </div>
      </PageShell>
    );
  }

  const details = [
    ["Title", complaint.title],
    ["Category", complaint.category],
    ["Location", complaint.location],
    [
      "Date Submitted",
      new Date(complaint.createdAt).toLocaleDateString(),
    ],
    ["Description", complaint.description],
  ];

  return (
    <PageShell compact>
      <PageHeader
        eyebrow="Student"
        title="Complaint Details"
        description="Detailed status and submission information for this complaint."
      />

      <Card className="p-6 sm:p-8">
        <div className="space-y-6">
          {details.map(([label, value]) => (
            <div key={label}>
              <h2 className="text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
                {label}
              </h2>
              <p className="mt-1.5 text-base text-fog font-medium leading-relaxed font-circularxx">
                {value}
              </p>
            </div>
          ))}

          <div>
            <h2 className="mb-2 text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
              Status
            </h2>
            <StatusBadge status={complaint.status} />
          </div>

          {complaint.images && complaint.images.length > 0 && (
            <div>
              <h2 className="mb-2.5 text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
                Attached Images
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {complaint.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3001/uploads/${image}`}
                    alt="Complaint"
                    className="h-40 w-full rounded-[var(--radius-images)] border border-charcoal object-cover hover:border-slate transition duration-200"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Discussion */}
          <hr className="my-8 border-charcoal/40" />

          <h2 className="text-lg font-medium text-fog font-circularxx">
            Discussion
          </h2>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-sm text-pebble italic font-circularxx">
                No comments yet.
              </p>
            ) : (
              comments.map((comment) => {
                const isAdmin = comment.user.role === "Admin";
                return (
                  <div
                    key={comment._id}
                    className={`p-4 rounded-[var(--radius-cards)] border ${
                      isAdmin 
                        ? "bg-pilot-gold/10 border-pilot-gold/20 mr-8 text-fog" 
                        : "bg-charcoal/40 border-charcoal/40 ml-8 text-mist"
                    }`}
                  >
                    <p className={`text-xs font-semibold ${isAdmin ? "text-pilot-gold" : "text-mist"} font-circularxxmono`}>
                      {comment.user.name} ({comment.user.role})
                    </p>

                    <p className="mt-2 text-sm text-mist leading-relaxed font-circularxx">
                      {comment.message}
                    </p>

                    <p className="mt-2 text-[10px] text-pebble font-circularxxmono">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Add Comment */}
          <div className="mt-6">
            <textarea
              className="w-full rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 py-3 text-sm text-fog outline-none transition placeholder:text-stone/70 focus:border-slate focus:ring-1 focus:ring-slate/20 font-circularxx"
              rows="3"
              placeholder="Write your comment..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <Button
              className="mt-3 cursor-pointer border-transparent"
              onClick={handleCommentSubmit}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row pt-4 border-t border-charcoal/20">
          <Button
            type="button"
            variant="secondary"
            onClick={() =>
              navigate("/student/complaints")
            }
          >
            Back to Complaints
          </Button>

          <ButtonLink
            to="/student/dashboard"
            variant="secondary"
          >
            Dashboard
          </ButtonLink>
        </div>
      </Card>
    </PageShell>
  );
}

export default ComplaintDetails;