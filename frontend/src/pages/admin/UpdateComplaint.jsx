
  import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import {
  Button,
  ButtonLink,
  Card,
  Field,
  PageHeader,
  PageShell,
} from "../../components/ui";

import {
  inputClass,
  textareaClass,
} from "../../components/uiStyles";

import { useToast } from "../../components/toastContext";

function UpdateComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("Pending");
const [priority, setPriority] = useState("Medium");
const [remarks, setRemarks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/complaints/${id}`
      );

      setComplaint(response.data);
setStatus(response.data.status);
setPriority(response.data.priority || "Medium");
setRemarks(response.data.remarks || "");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await axios.put(
        `http://localhost:3001/api/complaints/${id}`,
        {
  status,
  priority,
  remarks,
}
      );

      showSuccess("Complaint updated successfully.");

window.location.href = "/admin/complaints";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!complaint) {
    return (
      <PageShell>
        <h2>Loading...</h2>
      </PageShell>
    );
  }

   return (
    <PageShell compact>
      <div className="mb-6">
        <ButtonLink
          to="/admin/complaints"
          variant="secondary"
        >
          Back to Complaints
        </ButtonLink>
      </div>

      <PageHeader
        eyebrow="Admin"
        title="Update Complaint"
        description="Change the status and add internal remarks."
      />

      <Card className="p-6 sm:p-8">
        <div className="mb-8 grid gap-5 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-500">
              Complaint Title
            </h2>

            <p className="mt-1 text-base">
              {complaint.title}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-500">
              Category
            </h2>

            <p className="mt-1 text-base">
              {complaint.category}
            </p>
          </div>

          <div className="sm:col-span-2">
            <h2 className="text-sm font-semibold text-slate-500">
              Description
            </h2>

            <p className="mt-1 text-base">
              {complaint.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-500">
              Location
            </h2>

            <p className="mt-1 text-base">
              {complaint.location}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Field label="Update Status">
            <select
              className={inputClass}
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </Field>
<Field label="Update Priority">
  <select
    className={inputClass}
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="High">🔴 High</option>
    <option value="Medium">🟡 Medium</option>
    <option value="Low">🟢 Low</option>
  </select>
</Field>
          <Field label="Remarks">
            <textarea
              rows="4"
              className={textareaClass}
              value={remarks}
              placeholder="Enter remarks..."
              onChange={(e) =>
                setRemarks(e.target.value)
              }
            />
          </Field>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Updating..."
                : "Update Complaint"}
            </Button>
          </div>
        </form>
      </Card>
    </PageShell>
  );
}

export default UpdateComplaint;