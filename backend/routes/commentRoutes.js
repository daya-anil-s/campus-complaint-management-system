import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

const router = express.Router();

// Create Comment
router.post("/", authMiddleware, createComment);

// Get Comments of a Complaint
router.get("/:complaintId", authMiddleware, getComments);

export default router;