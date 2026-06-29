import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useToast } from "./toastContext";
import { inputClass, textareaClass } from "./uiStyles";
import { FaTimes, FaCalendarAlt, FaBuilding, FaExclamationTriangle, FaInfoCircle, FaPaperPlane } from "react-icons/fa";

export default function AdminUpdateModal({ complaintId, onClose, onUpdateSuccess }) {
  const { showSuccess, showError } = useToast();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [department, setDepartment] = useState("");
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [notifyStudent, setNotifyStudent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Discussion comments
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSendingComment, setIsSendingComment] = useState(false);

  useEffect(() => {
    if (complaintId) {
      fetchComplaintDetails();
    }
  }, [complaintId]);

  const fetchComplaintDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/complaints/${complaintId}`);
      const data = response.data;
      setComplaint(data);
      setStatus(data.status || "Pending");
      setPriority(data.priority || "Medium");
      setDepartment(data.department || "");
      setEstimatedCompletionDate(
        data.estimatedCompletionDate
          ? new Date(data.estimatedCompletionDate).toISOString().split("T")[0]
          : ""
      );
      setRemarks(data.remarks || "");
      setNotifyStudent(data.notifyStudent || false);

      // Comments
      const commentsResponse = await api.get(`/comments/${complaintId}`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error(error);
      showError("Failed to load complaint details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSendingComment(true);
    try {
      await api.post("/comments", {
        complaintId,
        message: newComment,
      });
      setNewComment("");
      // Refresh comments
      const commentsResponse = await api.get(`/comments/${complaintId}`);
      setComments(commentsResponse.data);
      showSuccess("Comment posted.");
    } catch (error) {
      console.error(error);
      showError("Failed to post comment.");
    } finally {
      setIsSendingComment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const updatedData = {
        status,
        priority,
        remarks,
        department,
        estimatedCompletionDate: estimatedCompletionDate || null,
        notifyStudent,
      };

      await api.put(`/complaints/${complaintId}`, updatedData);
      showSuccess("Complaint updated successfully.");
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      showError("Failed to update complaint.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!complaintId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-graphite rounded-[var(--radius-cards)] border border-charcoal shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden scale-in font-circularxx"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-charcoal bg-charcoal/40">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-pilot-gold bg-charcoal border border-charcoal/40 px-2.5 py-1 rounded-full font-circularxxmono">
              Update Panel
            </span>
            <h3 className="text-xl font-medium text-fog mt-2">
              Complaint Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-charcoal/20 text-mist hover:text-fog transition cursor-pointer"
            aria-label="Close details"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 p-8 flex flex-col justify-center items-center gap-3 bg-graphite">
            <div className="h-10 w-10 border-4 border-pilot-gold border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-pebble font-circularxxmono">Fetching complaint details...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-graphite">
            
            {/* COMPLAINT INFORMATION */}
            <div className="bg-charcoal/20 rounded-[var(--radius-cards)] p-5 border border-charcoal/40 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wide text-pebble font-circularxxmono">Title</h4>
                  <p className="text-base font-semibold text-fog mt-0.5">{complaint?.title}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wide text-pebble font-circularxxmono">Category</h4>
                  <p className="text-base font-semibold text-fog mt-0.5">{complaint?.category}</p>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wide text-pebble font-circularxxmono">Description</h4>
                <p className="text-sm text-mist mt-1 whitespace-pre-wrap leading-relaxed">
                  {complaint?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wide text-pebble font-circularxxmono">Location</h4>
                  <p className="text-sm font-medium text-mist mt-0.5">{complaint?.location}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wide text-pebble font-circularxxmono">Submitted</h4>
                  <p className="text-sm font-medium text-mist mt-0.5 font-circularxxmono">
                    {complaint?.createdAt ? new Date(complaint.createdAt).toLocaleString("en-GB") : ""}
                  </p>
                </div>
              </div>

              {/* IMAGES */}
              {complaint?.images && complaint.images.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wide text-pebble font-circularxxmono mb-2">Attached Images</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {complaint.images.map((image, index) => (
                      <a 
                        key={index} 
                        href={`http://localhost:3001/uploads/${image}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="group overflow-hidden rounded-[var(--radius-images)] border border-charcoal block h-20 bg-charcoal hover:border-slate transition"
                      >
                        <img
                          src={`http://localhost:3001/uploads/${image}`}
                          alt={`complaint-${index}`}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-200"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FORM OPTIONS */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* STATUS */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-pebble mb-2 font-circularxxmono">
                    Update Status
                  </label>
                  <select
                    className={`${inputClass}`}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending" className="bg-graphite text-fog font-circularxx">🕒 Pending</option>
                    <option value="In Progress" className="bg-graphite text-fog font-circularxx">⚙️ In Progress</option>
                    <option value="Resolved" className="bg-graphite text-fog font-circularxx">✅ Resolved</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-pebble mb-2 font-circularxxmono">
                    Update Priority
                  </label>
                  <select
                    className={`${inputClass}`}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High" className="bg-graphite text-fog font-circularxx">🔴 High</option>
                    <option value="Medium" className="bg-graphite text-fog font-circularxx">🟡 Medium</option>
                    <option value="Low" className="bg-graphite text-fog font-circularxx">🟢 Low</option>
                  </select>
                </div>

                {/* DEPARTMENT */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-pebble mb-2 flex items-center gap-1.5 font-circularxxmono">
                    <FaBuilding className="text-pebble" size={12} /> Assign Department
                  </label>
                  <select
                    className={`${inputClass}`}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="" className="bg-graphite text-fog font-circularxx">-- Select Department --</option>
                    <option value="Electrical" className="bg-graphite text-fog font-circularxx">Electrical</option>
                    <option value="Plumbing" className="bg-graphite text-fog font-circularxx">Plumbing</option>
                    <option value="Hostel" className="bg-graphite text-fog font-circularxx">Hostel</option>
                    <option value="IT Support" className="bg-graphite text-fog font-circularxx">IT Support</option>
                    <option value="Library" className="bg-graphite text-fog font-circularxx">Library</option>
                    <option value="Maintenance" className="bg-graphite text-fog font-circularxx">Maintenance</option>
                  </select>
                </div>

                {/* ESTIMATED COMPLETION DATE */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-pebble mb-2 flex items-center gap-1.5 font-circularxxmono">
                    <FaCalendarAlt className="text-pebble" size={12} /> Estimated Completion
                  </label>
                  <input
                    type="date"
                    className={`${inputClass}`}
                    value={estimatedCompletionDate}
                    onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                  />
                </div>
              </div>

              {/* INTERNAL REMARKS */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-pebble mb-2 flex items-center gap-1.5 font-circularxxmono">
                  <FaInfoCircle className="text-pebble" size={12} /> Internal Comment / Remarks
                </label>
                <textarea
                  rows="3"
                  className={`${textareaClass}`}
                  placeholder="Enter remarks and details about the resolution..."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>

              {/* NOTIFY STUDENT */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notifyStudent"
                  className="h-4.5 w-4.5 rounded-[var(--radius-images)] border-charcoal bg-charcoal text-pilot-gold focus:ring-pilot-gold cursor-pointer"
                  checked={notifyStudent}
                  onChange={(e) => setNotifyStudent(e.target.checked)}
                />
                <label 
                  htmlFor="notifyStudent" 
                  className="text-sm font-medium text-mist hover:text-fog select-none cursor-pointer"
                >
                  Notify Student via Email / Feed
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-[var(--radius-buttons)] border border-slate text-sm font-normal text-fog hover:bg-slate/10 transition cursor-pointer bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 px-4 rounded-[var(--radius-buttons)] bg-pilot-gold hover:bg-pilot-gold/90 text-sm font-medium text-obsidian shadow-sm disabled:opacity-60 transition cursor-pointer border-transparent"
                >
                  {isUpdating ? "Updating..." : "Update Complaint"}
                </button>
              </div>
            </form>

            <hr className="border-charcoal/40" />

            {/* DISCUSSION BOARD */}
            <div className="space-y-4">
              <h4 className="text-base font-medium text-fog">Discussion Log</h4>
              
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <p className="text-sm text-pebble italic">No messages exchanged yet.</p>
                ) : (
                  comments.map((comment) => {
                    const isAdmin = comment.user?.role === "Admin";
                    return (
                      <div 
                        key={comment._id} 
                        className={`p-3.5 rounded-[var(--radius-cards)] border ${
                          isAdmin 
                            ? "bg-pilot-gold/10 border-pilot-gold/20 mr-8 text-fog" 
                            : "bg-charcoal/40 border-charcoal/40 ml-8 text-mist"
                        }`}
                      >
                        <div className="flex justify-between items-baseline gap-2">
                          <span className={`text-xs font-semibold ${isAdmin ? "text-pilot-gold" : "text-mist"} font-circularxxmono`}>
                            {comment.user?.name} ({comment.user?.role})
                          </span>
                          <span className="text-[10px] text-pebble font-circularxxmono">
                            {new Date(comment.createdAt).toLocaleString("en-GB")}
                          </span>
                        </div>
                        <p className="text-sm text-mist mt-1 leading-normal">
                          {comment.message}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* POST MESSAGE */}
              <form onSubmit={handleSendComment} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Post comment to this thread..."
                  className="flex-1 rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 py-2.5 text-sm text-fog placeholder:text-stone/70 focus:outline-none focus:border-slate"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSendingComment || !newComment.trim()}
                  className="px-4 py-2.5 rounded-[var(--radius-inputs)] bg-charcoal text-pilot-gold border border-charcoal hover:bg-charcoal/50 disabled:opacity-50 transition flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Send comment"
                >
                  {isSendingComment ? (
                    <div className="h-4 w-4 border-2 border-pilot-gold border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <FaPaperPlane size={14} />
                  )}
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
