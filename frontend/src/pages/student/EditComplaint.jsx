import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  ButtonLink,
  Card,
  Field,
  PageHeader,
  PageShell,
} from "../../components/ui";
import { inputClass, textareaClass } from "../../components/uiStyles";
import { useToast } from "../../components/toastContext";
import api from "../../services/api";

function EditComplaint() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({
  title: "",
  category: "",
  location: "",
  description: "",
  priority: "Medium",
});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
  setImages([...e.target.files]);
};

useEffect(() => {
  fetchComplaint();
}, []);

const fetchComplaint = async () => {
  try {
    const res = await api.get(`/complaints/${id}`);

    setFormData({
      title: res.data.title,
      category: res.data.category,
      location: res.data.location,
      description: res.data.description,
      priority: res.data.priority,
    });
    setExistingImages(res.data.images || []);
  } catch (error) {
    console.error(error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
     

await api.put(`/complaints/student/${id}`, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
     setFormData({
  title: "",
  category: "",
  location: "",
  description: "",
  priority: "Medium",
});

setImages([]);

showSuccess("Complaint updated successfully.");    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageShell compact>
      <div className="mb-6">
        <ButtonLink to="/student/dashboard" variant="secondary">
          Back to Dashboard
        </ButtonLink>
      </div>

      <PageHeader
        eyebrow="Student"
title="Edit Complaint"
description="Update your complaint details."      />

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Complaint Title">
            <input
              type="text"
              name="title"
              value={formData.title}
              className={inputClass}
              placeholder="Enter complaint title"
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Category">
            <select
              name="category"
              value={formData.category}
              className={inputClass}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Classroom</option>
              <option>Laboratory</option>
              <option>Hostel</option>
              <option>Library</option>
              <option>Internet/Wi-Fi</option>
              <option>Electrical</option>
              <option>Water Supply</option>
              <option>Cleanliness</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Priority">
  <select
    name="priority"
    value={formData.priority}
    className={inputClass}
    onChange={handleChange}
    required
  >
    <option value="High">🔴 High</option>
    <option value="Medium">🟡 Medium</option>
    <option value="Low">🟢 Low</option>
  </select>
</Field>

          <Field label="Location">
            <input
              type="text"
              name="location"
              value={formData.location}
              className={inputClass}
              placeholder="Enter location"
              onChange={handleChange}
              required
            />
          </Field>

          <Field label="Description">
            <textarea
              rows="6"
              name="description"
              value={formData.description}
              className={textareaClass}
              placeholder="Describe the issue in detail"
              onChange={handleChange}
              required
            />
          </Field>

<Field label="Uploaded Images">

  {existingImages.length > 0 && (
    <div className="mb-4 grid grid-cols-2 gap-4">
      {existingImages.map((image, index) => (
        <img
          key={index}
          src={`http://localhost:3001/uploads/${image}`}
          alt="Complaint"
          className="h-40 w-full rounded-lg border object-cover"
        />
      ))}
    </div>
  )}

  <input
    type="file"
    multiple
    accept="image/*"
    className={inputClass}
    onChange={handleImageChange}
  />
</Field>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}

export default EditComplaint;
