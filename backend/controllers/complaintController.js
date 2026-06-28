import Complaint from "../models/Complaint.js";

// CREATE COMPLAINT
export const createComplaint = async (req, res) => {
  try {
   const images = req.files
  ? req.files.map((file) => file.filename)
  : [];

const complaint = await Complaint.create({
  ...req.body,
  student: req.user.id,
  images,
});

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL COMPLAINTS (Dashboard)
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

// GET ONLY LOGGED-IN STUDENT COMPLAINTS
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET SINGLE COMPLAINT
export const getComplaintById = async (req, res) => {
  try {
    let complaint;

if (req.user.role === "Admin") {
  complaint = await Complaint.findById(req.params.id);
} else {
  complaint = await Complaint.findOne({
    _id: req.params.id,
    student: req.user.id,
  });
}

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

// STUDENT EDIT COMPLAINT
export const editComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      student: req.user.id,
    });

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    complaint.title = req.body.title;
    complaint.category = req.body.category;
    complaint.location = req.body.location;
    complaint.description = req.body.description;
    complaint.priority = req.body.priority;

    await complaint.save();

    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE COMPLAINT
export const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        priority: req.body.priority,
        remarks: req.body.remarks,
        department: req.body.department,
        estimatedCompletionDate: req.body.estimatedCompletionDate,
        notifyStudent: req.body.notifyStudent,
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

// DELETE COMPLAINT
export const deleteComplaint = async (req, res) => {
  try {
    let complaint;

    if (req.user.role === "Admin") {
      complaint = await Complaint.findById(req.params.id);
    } else {
      complaint = await Complaint.findOne({
        _id: req.params.id,
        student: req.user.id,
      });
    }

    if (!complaint) {
      return res.status(404).json({
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};