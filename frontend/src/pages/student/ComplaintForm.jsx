import { useState } from "react";
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

function ComplaintForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccess } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 300));
      console.log(formData);
      setFormData({ title: "", category: "", location: "", description: "" });
      showSuccess("Complaint submitted successfully.");
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
        title="Submit Complaint"
        description="Share the complaint details so the campus team can review and respond."
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Complaint"}
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}

export default ComplaintForm;
