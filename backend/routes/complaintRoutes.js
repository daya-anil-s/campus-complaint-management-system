import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createComplaint,
  getComplaints,
  getMyComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
} from "../controllers/complaintController.js";

const router = express.Router();

// Create Complaint
router.post("/", authMiddleware, upload.array("images", 5), createComplaint);

// Get ALL complaints (Dashboard)
router.get("/", authMiddleware, getComplaints);

// Get ONLY logged-in student's complaints (My Complaints)
router.get("/my", authMiddleware, getMyComplaints);

// Get single complaint details
router.get("/:id", authMiddleware, getComplaintById);

// Update complaint (Admin)
router.put("/:id", authMiddleware, updateComplaint);

// Delete complaint (Admin)
router.delete("/:id", authMiddleware, deleteComplaint);

export default router;