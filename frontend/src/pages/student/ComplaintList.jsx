import { Link } from "react-router-dom";
import {
  ButtonLink,
  DataTable,
  EmptyState,
  PageHeader,
  PageShell,
  StatusBadge,
  TableCard,
  TableHead,
  TableRow,
  Td,
  Th,
} from "../../components/ui";

function ComplaintList() {
  const complaints = [
    {
      id: 1,
      title: "WiFi Not Working",
      category: "Internet/Wi-Fi",
      status: "Pending",
      date: "17-06-2026",
    },
    {
      id: 2,
      title: "Broken Fan",
      category: "Classroom",
      status: "In Progress",
      date: "15-06-2026",
    },
    {
      id: 3,
      title: "Water Supply Issue",
      category: "Hostel",
      status: "Resolved",
      date: "12-06-2026",
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Student"
        title="My Complaints"
        description="Review your submitted complaints and open any record for more detail."
        actions={
          <ButtonLink to="/student/dashboard" variant="secondary">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <TableCard>
        {complaints.length === 0 ? (
          <EmptyState description="Submit your first complaint to get started." />
        ) : (
        <DataTable>
          <TableHead>
            <tr>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Action</Th>
            </tr>
          </TableHead>
          <tbody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <Td className="font-medium text-slate-900">{complaint.title}</Td>
                <Td>{complaint.category}</Td>
                <Td>
                  <StatusBadge status={complaint.status} />
                </Td>
                <Td>{complaint.date}</Td>
                <Td>
                  <Link
                    to={`/student/complaint/${complaint.id}`}
                    className="font-semibold text-[#2563EB] no-underline hover:underline"
                  >
                    View Details
                  </Link>
                </Td>
              </TableRow>
            ))}
          </tbody>
        </DataTable>
        )}
      </TableCard>
    </PageShell>
  );
}

export default ComplaintList;
