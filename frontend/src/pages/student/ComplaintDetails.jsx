import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import {
  Button,
  ButtonLink,
  Card,
  PageHeader,
  PageShell,
  StatusBadge,
} from "../../components/ui";

function ComplaintDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await api.get(`/complaints/${id}`);
        setComplaint(res.data);
      } catch (error) {
        console.error("Error fetching complaint:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <PageShell compact>
        <p className="text-center text-slate-600">Loading...</p>
      </PageShell>
    );
  }

  if (!complaint) {
    return (
      <PageShell compact>
        <p className="text-center text-red-600">
          Complaint not found.
        </p>

        <div className="mt-6 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => navigate("/student/complaints")}
          >
            Back to Complaints
          </Button>
        </div>
      </PageShell>
    );
  }

  const details = [
    ["Title", complaint.title],
    ["Category", complaint.category],
    ["Location", complaint.location],
    [
      "Date Submitted",
      new Date(complaint.createdAt).toLocaleDateString(),
    ],
    ["Description", complaint.description],
  ];

  return (
    <PageShell compact>
      <PageHeader
        eyebrow="Student"
        title="Complaint Details"
        description="Detailed status and submission information for this complaint."
      />

      <Card className="p-6 sm:p-8">
        <div className="space-y-5">
          {details.map(([label, value]) => (
            <div key={label}>
              <h2 className="text-sm font-semibold text-slate-500">
                {label}
              </h2>
              <p className="mt-1 text-base text-slate-950">
                {value}
              </p>
            </div>
          ))}

          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-500">
              Status
            </h2>
            <StatusBadge status={complaint.status} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/student/complaints")}
          >
            Back to Complaints
          </Button>

          <ButtonLink
            to="/student/dashboard"
            variant="secondary"
          >
            Dashboard
          </ButtonLink>
        </div>
      </Card>
    </PageShell>
  );
}

export default ComplaintDetails;