import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { FaUpload } from "react-icons/fa";
import api from "../../services/api";

function EditComplaint() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
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

      showSuccess("Complaint updated successfully.");
      navigate("/student/complaints");
    } finally {
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
        description="Update your complaint details."
      />

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
              <option value="" className="bg-graphite text-fog">Select Category</option>
              <option className="bg-graphite text-fog">Classroom</option>
              <option className="bg-graphite text-fog">Laboratory</option>
              <option className="bg-graphite text-fog">Hostel</option>
              <option className="bg-graphite text-fog">Library</option>
              <option className="bg-graphite text-fog">Internet/Wi-Fi</option>
              <option className="bg-graphite text-fog">Electrical</option>
              <option className="bg-graphite text-fog">Water Supply</option>
              <option className="bg-graphite text-fog">Cleanliness</option>
              <option className="bg-graphite text-fog">Other</option>
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
              <option value="High" className="bg-graphite text-fog">🔴 High</option>
              <option value="Medium" className="bg-graphite text-fog">🟡 Medium</option>
              <option value="Low" className="bg-graphite text-fog">🟢 Low</option>
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
                    className="h-40 w-full rounded-[var(--radius-images)] border border-charcoal object-cover"
                  />
                ))}
              </div>
            )}

            <div className="relative flex items-center justify-center border border-dashed border-charcoal rounded-[var(--radius-inputs)] bg-charcoal/20 p-6 hover:border-slate transition cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={handleImageChange}
              />
              <div className="text-center space-y-1">
                <FaUpload className="mx-auto text-pilot-gold mb-1" size={16} />
                <p className="text-xs text-mist font-medium">
                  {images.length > 0
                    ? `${images.length} new file(s) selected`
                    : "Click to upload more photo evidence"}
                </p>
                <p className="text-[10px] text-pebble font-circularxxmono tracking-wide">PNG, JPG up to 5MB</p>
              </div>
            </div>
          </Field>

          <Button type="submit" className="w-full cursor-pointer border-transparent" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}

export default EditComplaint;
