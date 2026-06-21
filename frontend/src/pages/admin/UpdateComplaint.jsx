import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function UpdateComplaint() {
  const [status, setStatus] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 300));
      showSuccess("Complaint updated successfully.");
    } finally {
      setIsLoading(false);
    }
  };

  const details = [
    ["Complaint Title", "WiFi Not Working"],
    ["Student", "Vismaya"],
    ["Category", "Internet/Wi-Fi"],
    [
      "Description",
      "Internet connection is unavailable on the second floor of the library.",
    ],
  ];

  return (
    <PageShell compact>
      <div className="mb-6">
        <ButtonLink to="/admin/complaints" variant="secondary">
          Back to Complaints
        </ButtonLink>
      </div>

      <PageHeader
        eyebrow="Admin"
        title="Update Complaint"
        description="Change the status and add internal remarks for the selected complaint."
      />

      <Card className="p-6 sm:p-8">
        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label} className={label === "Description" ? "sm:col-span-2" : ""}>
              <h2 className="text-sm font-semibold text-slate-500">{label}</h2>
              <p className="mt-1 text-base text-slate-950">{value}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Update Status">
            <select
              className={inputClass}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </Field>

          <Field label="Remarks">
            <textarea
              rows="4"
              className={textareaClass}
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Field>

          <div className="flex gap-3">
            <Button type="button" variant="secondary" className="w-full" onClick={() => navigate(-1)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Complaint"}
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}

export default UpdateComplaint;
