import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },
    priority: {
  type: String,
  enum: ["High", "Medium", "Low"],
  default: "Medium",
},

    remarks: {
      type: String,
      default: "",
    },

    student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
images: [
  {
    type: String,
  },
],

  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Complaint",
  complaintSchema
);