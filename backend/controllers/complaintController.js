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
    const complaints = await Complaint.find();

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateComplaint = async (
  req,
  res
) => {
  try {
    const complaint =
      await Complaint.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComplaint = async (
  req,
  res
) => {
  try {
    await Complaint.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};