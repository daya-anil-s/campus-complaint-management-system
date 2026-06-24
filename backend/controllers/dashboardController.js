import Complaint from "../models/Complaint.js";

export const getDashboardStats = async (
  req,
  res
) => {
  try {
    const total =
      await Complaint.countDocuments();

    const pending =
      await Complaint.countDocuments({
        status: "Pending",
      });

    const resolved =
      await Complaint.countDocuments({
        status: "Resolved",
      });

    const inProgress =
      await Complaint.countDocuments({
        status: "In Progress",
      });

    res.status(200).json({
      total,
      pending,
      resolved,
      inProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};