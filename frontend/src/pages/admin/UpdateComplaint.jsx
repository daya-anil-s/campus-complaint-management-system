import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  ButtonLink,
  Card,
  Field,
  PageHeader,
  PageShell,
} from "../../components/ui";

import {
  inputClass,
  textareaClass,
} from "../../components/uiStyles";

import { useToast } from "../../components/toastContext";

function UpdateComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComplaint = async () => {
    try {
      const response = await api.get(`/complaints/${id}`);

      setComplaint(response.data);
      setStatus(response.data.status);
      setPriority(response.data.priority || "Medium");
      setRemarks(response.data.remarks || "");
      await fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

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
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await api.put(`/complaints/${id}`, {
        status,
        priority,
        remarks,
      });

      showSuccess("Complaint updated successfully.");

      window.location.href = "/admin/complaints";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!complaint) {
    return (
      <PageShell>
        <div className="flex-1 p-8 flex flex-col justify-center items-center gap-3">
          <div className="h-10 w-10 border-4 border-pilot-gold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-pebble font-circularxxmono">Loading complaint details...</p>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell compact>
      <div className="mb-6">
        <ButtonLink
          to="/admin/complaints"
          variant="secondary"
        >
          Back to Complaints
        </ButtonLink>
      </div>

      <PageHeader
        eyebrow="Admin"
        title="Update Complaint"
        description="Change the status and add internal remarks."
      />

      <Card className="p-6 sm:p-8">
        <div className="mb-8 grid gap-5 sm:grid-cols-2 font-circularxx">
          <div>
            <h2 className="text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
              Complaint Title
            </h2>
            <p className="mt-1.5 text-base text-fog font-medium">
              {complaint.title}
            </p>
          </div>

          <div>
            <h2 className="text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
              Category
            </h2>
            <p className="mt-1.5 text-base text-fog font-medium">
              {complaint.category}
            </p>
          </div>

          <div className="sm:col-span-2">
            <h2 className="text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
              Description
            </h2>
            <p className="mt-1.5 text-sm text-mist leading-relaxed whitespace-pre-wrap">
              {complaint.description}
            </p>
          </div>

          <div className="sm:col-span-2">
            <h2 className="text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble">
              Location
            </h2>
            <p className="mt-1.5 text-sm text-mist font-medium">
              {complaint.location}
            </p>
          </div>

          {complaint.images && complaint.images.length > 0 && (
            <div className="sm:col-span-2">
              <h2 className="text-[10px] font-bold font-circularxxmono uppercase tracking-[0.08em] text-pebble mb-3">
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
        </div>

        <hr className="my-8 border-charcoal/40" />

        {/* Discussion Board */}
        <div className="space-y-4">
          <h2 className="text-base font-medium text-fog font-circularxx">
            Discussion
          </h2>

          <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-sm text-pebble italic font-circularxx">No comments yet.</p>
            ) : (
              comments.map((comment) => {
                const isAdmin = comment.user.role === "Admin";
                return (
                  <div
                    key={comment._id}
                    className={`p-4 rounded-[var(--radius-cards)] border ${
                      isAdmin 
                        ? "bg-pilot-gold/10 border-pilot-gold/20 mr-8 text-fog font-circularxx" 
                        : "bg-charcoal/40 border-charcoal/40 ml-8 text-mist font-circularxx"
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

          <div className="mt-6">
            <textarea
              rows="3"
              className={`${textareaClass} font-circularxx`}
              placeholder="Reply to student..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              className="mt-3 border-transparent"
              type="button"
              disabled={sending}
              onClick={handleCommentSubmit}
            >
              {sending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </div>

        <hr className="my-8 border-charcoal/40" />

        {/* Update Form options */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Field label="Update Status">
            <select
              className={inputClass}
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option value="Pending" className="bg-graphite text-fog font-circularxx">Pending</option>
              <option value="In Progress" className="bg-graphite text-fog font-circularxx">In Progress</option>
              <option value="Resolved" className="bg-graphite text-fog font-circularxx">Resolved</option>
            </select>
          </Field>
          
          <Field label="Update Priority">
            <select
              className={inputClass}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="High" className="bg-graphite text-fog font-circularxx">🔴 High</option>
              <option value="Medium" className="bg-graphite text-fog font-circularxx">🟡 Medium</option>
              <option value="Low" className="bg-graphite text-fog font-circularxx">🟢 Low</option>
            </select>
          </Field>
          
          <Field label="Remarks">
            <textarea
              rows="3"
              className={`${textareaClass} font-circularxx`}
              value={remarks}
              placeholder="Enter remarks..."
              onChange={(e) =>
                setRemarks(e.target.value)
              }
            />
          </Field>

          <div className="flex gap-4 pt-4 border-t border-charcoal/20">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full border-transparent"
              disabled={isLoading}
            >
              {isLoading
                ? "Updating..."
                : "Update Complaint"}
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}

export default UpdateComplaint;