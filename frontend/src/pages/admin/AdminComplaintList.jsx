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

function AdminComplaintList() {
  const complaints = [
    {
      id: 1,
      title: "WiFi Not Working",
      student: "Vismaya",
      category: "Internet/Wi-Fi",
      status: "Pending",
      date: "17-06-2026",
    },
    {
      id: 2,
      title: "Broken Fan",
      student: "Rahul",
      category: "Classroom",
      status: "In Progress",
      date: "15-06-2026",
    },
    {
      id: 3,
      title: "Water Supply Issue",
      student: "Anu",
      category: "Hostel",
      status: "Resolved",
      date: "12-06-2026",
    },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Admin"
        title="All Complaints"
        description="Review every submitted complaint and open a record to update its status."
        actions={
          <ButtonLink to="/admin/dashboard" variant="secondary">
            Back to Dashboard
          </ButtonLink>
        }
      />

      <TableCard>
        {complaints.length === 0 ? (
          <EmptyState description="Submitted complaints will appear here." />
        ) : (
        <DataTable>
          <TableHead>
            <tr>
              <Th>Title</Th>
              <Th>Student</Th>
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
                <Td>{complaint.student}</Td>
                <Td>{complaint.category}</Td>
                <Td>
                  <StatusBadge status={complaint.status} />
                </Td>
                <Td>{complaint.date}</Td>
                <Td>
                  <Link
                    to={`/admin/update/${complaint.id}`}
                    className="font-semibold text-[#2563EB] no-underline hover:underline"
                  >
                    Update
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

export default AdminComplaintList;
