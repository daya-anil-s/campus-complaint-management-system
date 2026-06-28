import Comment from "../models/Comment.js";
import Complaint from "../models/Complaint.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { complaintId, message } = req.body;

    // Check if complaint exists
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Students can only comment on their own complaints
    if (
      req.user.role === "Student" &&
      complaint.student.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const comment = await Comment.create({
      complaint: complaintId,
      user: req.user.id,
      message,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET COMMENTS OF A COMPLAINT
export const getComments = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.complaintId);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    // Students can only view comments of their own complaints
    if (
      req.user.role === "Student" &&
      complaint.student.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const comments = await Comment.find({
      complaint: req.params.complaintId,
    })
      .populate("user", "name role")
      .sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};