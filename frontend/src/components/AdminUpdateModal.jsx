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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Update Panel
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              Complaint Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition"
            aria-label="Close details"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 p-8 flex flex-col justify-center items-center gap-3">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-500">Fetching complaint details...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            
            {/* COMPLAINT INFORMATION */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Title</h4>
                  <p className="text-base font-semibold text-slate-900 mt-0.5">{complaint?.title}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Category</h4>
                  <p className="text-base font-semibold text-slate-900 mt-0.5">{complaint?.category}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Description</h4>
                <p className="text-sm text-slate-700 mt-1 whitespace-pre-wrap leading-relaxed">
                  {complaint?.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Location</h4>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">{complaint?.location}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Submitted</h4>
                  <p className="text-sm font-medium text-slate-800 mt-0.5">
                    {complaint?.createdAt ? new Date(complaint.createdAt).toLocaleString("en-GB") : ""}
                  </p>
                </div>
              </div>

              {/* IMAGES */}
              {complaint?.images && complaint.images.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Attached Images</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {complaint.images.map((image, index) => (
                      <a 
                        key={index} 
                        href={`http://localhost:3001/uploads/${image}`}
                        target="_blank" 
                        rel="noreferrer"
                        className="group overflow-hidden rounded-xl border border-slate-200 block h-20 bg-slate-100 hover:border-blue-400 transition"
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Update Status
                  </label>
                  <select
                    className={`${inputClass} border-slate-200 focus:border-blue-500`}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">🕒 Pending</option>
                    <option value="In Progress">⚙️ In Progress</option>
                    <option value="Resolved">✅ Resolved</option>
                  </select>
                </div>

                {/* PRIORITY */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Update Priority
                  </label>
                  <select
                    className={`${inputClass} border-slate-200 focus:border-blue-500`}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>

                {/* DEPARTMENT */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                    <FaBuilding className="text-slate-400" size={14} /> Assign Department
                  </label>
                  <select
                    className={`${inputClass} border-slate-200 focus:border-blue-500`}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="">-- Select Department --</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Hostel">Hostel</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Library">Library</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                {/* ESTIMATED COMPLETION DATE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400" size={14} /> Estimated Completion
                  </label>
                  <input
                    type="date"
                    className={`${inputClass} border-slate-200 focus:border-blue-500`}
                    value={estimatedCompletionDate}
                    onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                  />
                </div>
              </div>

              {/* INTERNAL REMARKS */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <FaInfoCircle className="text-slate-400" size={14} /> Internal Comment / Remarks
                </label>
                <textarea
                  rows="3"
                  className={`${textareaClass} border-slate-200 focus:border-blue-500`}
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
                  className="h-4.5 w-4.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={notifyStudent}
                  onChange={(e) => setNotifyStudent(e.target.checked)}
                />
                <label 
                  htmlFor="notifyStudent" 
                  className="text-sm font-medium text-slate-700 select-none cursor-pointer"
                >
                  Notify Student via Email / Feed
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-60 transition cursor-pointer"
                >
                  {isUpdating ? "Updating..." : "Update Complaint"}
                </button>
              </div>
            </form>

            <hr className="border-slate-100" />

            {/* DISCUSSION BOARD */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-slate-900">Discussion Log</h4>
              
              <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
                {comments.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No messages exchanged yet.</p>
                ) : (
                  comments.map((comment) => {
                    const isAdmin = comment.user?.role === "Admin";
                    return (
                      <div 
                        key={comment._id} 
                        className={`p-3.5 rounded-2xl border ${
                          isAdmin 
                            ? "bg-blue-50/40 border-blue-100/50 mr-8" 
                            : "bg-slate-50/80 border-slate-100 ml-8"
                        }`}
                      >
                        <div className="flex justify-between items-baseline gap-2">
                          <span className={`text-xs font-bold ${isAdmin ? "text-blue-700" : "text-slate-700"}`}>
                            {comment.user?.name} ({comment.user?.role})
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(comment.createdAt).toLocaleString("en-GB")}
                          </span>
                        </div>
                        <p className="text-sm text-slate-800 mt-1 leading-normal">
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
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={isSendingComment || !newComment.trim()}
                  className="px-4 py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Send comment"
                >
                  {isSendingComment ? (
                    <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
