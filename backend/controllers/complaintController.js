import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComplaints = async (req, res) => {
  try {
    let filter = {};

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const complaints = await Complaint.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
  req.params.id,
  {
    status: req.body.status,
    priority: req.body.priority,
    remarks: req.body.remarks,
  },
  {
    new: true,
  }
);

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};