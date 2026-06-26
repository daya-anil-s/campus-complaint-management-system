import { useNavigate } from "react-router-dom";
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

  const complaint = {
    title: "WiFi Not Working",
    category: "Internet/Wi-Fi",
    location: "Library Block",
    date: "17 June 2026",
    status: "In Progress",
    description:
      "Internet connection is unavailable on the second floor of the library.",
  };

  const details = [
    ["Title", complaint.title],
    ["Category", complaint.category],
    ["Location", complaint.location],
    ["Date Submitted", complaint.date],
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
              <h2 className="text-sm font-semibold text-slate-500">{label}</h2>
              <p className="mt-1 text-base text-slate-950">{value}</p>
            </div>
          ))}

          <div>
            <h2 className="mb-2 text-sm font-semibold text-slate-500">Status</h2>
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
          <ButtonLink to="/student/dashboard" variant="secondary">
            Dashboard
          </ButtonLink>
        </div>
      </Card>
    </PageShell>
  );
}

export default ComplaintDetails;
