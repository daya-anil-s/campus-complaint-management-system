import { Link } from "react-router-dom";
import { FaCheckCircle, FaClipboardList, FaClock, FaTasks } from "react-icons/fa";
import {
  ButtonLink,
  DataTable,
  PageHeader,
  PageShell,
  StatCard,
  StatusBadge,
  TableCard,
  TableHead,
  TableRow,
  Td,
  Th,
} from "../../components/ui";

function AdminDashboard() {
  const complaints = [
    { id: 1, title: "WiFi Not Working", student: "Vismaya", status: "Pending" },
    { id: 2, title: "Broken Fan", student: "Rahul", status: "In Progress" },
    { id: 3, title: "Water Supply Issue", student: "Anu", status: "Resolved" },
  ];

  return (
    <PageShell>
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Complaint Operations"
        description="Manage, track, and resolve campus complaints from a clean operational dashboard."
        actions={<ButtonLink to="/admin/complaints">View All Complaints</ButtonLink>}
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={FaClipboardList} label="Total Complaints" value="25" />
        <StatCard icon={FaClock} label="Pending" value="8" />
        <StatCard icon={FaTasks} label="In Progress" value="10" />
        <StatCard icon={FaCheckCircle} label="Resolved" value="7" />
      </div>

      <TableCard title="Recent Complaints">
        <DataTable>
          <TableHead>
            <tr>
              <Th>Title</Th>
              <Th>Student</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </TableHead>
          <tbody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <Td className="font-medium text-slate-900">{complaint.title}</Td>
                <Td>{complaint.student}</Td>
                <Td>
                  <StatusBadge status={complaint.status} />
                </Td>
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
      </TableCard>
    </PageShell>
  );
}

export default AdminDashboard;
