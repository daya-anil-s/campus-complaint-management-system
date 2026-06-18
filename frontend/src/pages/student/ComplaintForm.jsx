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

function ComplaintForm() {
  const [success, setSuccess] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccess(true);
    setFormData({
      title: "",
      category: "",
      location: "",
      description: "",
    });
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
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

      {success && (
        <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-[#2563EB]">
          Complaint submitted successfully.
        </div>
      )}

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

          <Button type="submit" className="w-full">
            Submit Complaint
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}

export default ComplaintForm;
