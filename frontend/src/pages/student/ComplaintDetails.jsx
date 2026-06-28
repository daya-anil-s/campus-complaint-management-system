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
        <p className="text-center text-red-600">
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
        <div className="space-y-5">
          {details.map(([label, value]) => (
            <div key={label}>
              <h2 className="text-sm font-semibold text-slate-500">
                {label}
              </h2>
              <p className="mt-1 text-base text-slate-950">
                {value}
              </p>
            </div>
          ))}

          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-500">
              Status
            </h2>
            <StatusBadge status={complaint.status} />
          </div>

          {complaint.images && complaint.images.length > 0 && (
  <div>
    <h2 className="mb-2 text-sm font-semibold text-slate-500">
      Images
    </h2>

    <div className="grid grid-cols-2 gap-4">
      {complaint.images.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3001/uploads/${image}`}
          alt="Complaint"
          className="h-40 w-full rounded-lg border object-cover"
        />
      ))}
    </div>
  </div>
)}

          {/* Discussion */}
          <hr className="my-8" />

          <h2 className="text-xl font-semibold">
            Discussion
          </h2>

          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-gray-500">
                No comments yet.
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="rounded-lg border p-4"
                >
                  <p className="font-semibold">
                    {comment.user.name} ({comment.user.role})
                  </p>

                  <p className="mt-2">
                    {comment.message}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment */}
          <div className="mt-6">
            <textarea
              className="w-full rounded-lg border p-3"
              rows="4"
              placeholder="Write your comment..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <Button
              className="mt-3"
              onClick={handleCommentSubmit}
              disabled={sending}
            >
              {sending ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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