import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";import { FaCheckCircle, FaClipboardList, FaClock, FaSearch } from "react-icons/fa";
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
import { getCurrentUser } from "../../utils/auth";

function StudentDashboard() {
  const user = getCurrentUser();
  const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  resolved: 0,
  inProgress: 0,
});

const [complaints, setComplaints] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      const statsRes = await api.get("/dashboard/stats");
      setStats(statsRes.data);

      const complaintsRes = await api.get("/complaints");
      setComplaints(complaintsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
  

  return (
    <PageShell>
      <div className="mb-8 flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm sm:w-80">
        <FaSearch className="text-slate-400" />
        <input
          type="text"
          placeholder="Search complaints"
          className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </div>

      <PageHeader
        eyebrow="Student Dashboard"
        title={user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
        description="Track submitted complaints, review status updates, and create a new complaint from one dashboard."
        actions={
          <>
            <ButtonLink to="/student/complaint">Submit Complaint</ButtonLink>
            <ButtonLink to="/student/complaints" variant="secondary">
              My Complaints
            </ButtonLink>
          </>
        }
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatCard
  icon={FaClipboardList}
  label="Total Complaints"
  value={stats.total}
/>

<StatCard
  icon={FaClock}
  label="Pending"
  value={stats.pending}
/>

<StatCard
  icon={FaCheckCircle}
  label="Resolved"
  value={stats.resolved}
/>
      </div>

      <TableCard title="Recent Complaints">
        <DataTable>
          <TableHead>
            <tr>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </tr>
          </TableHead>
          <tbody>
            {complaints.map((complaint) => (
              <TableRow key={complaint._id}>
                <Td className="font-medium text-slate-900">{complaint.title}</Td>
                <Td>
                  <StatusBadge status={complaint.status} />
                </Td>
                <Td>
                  <Link
to={`/student/complaint/${complaint._id}`}                    className="font-semibold text-[#2563EB] no-underline hover:underline"
                  >
                    View
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

export default StudentDashboard;
