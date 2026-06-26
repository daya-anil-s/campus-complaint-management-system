import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import {
  ButtonLink,
  Card,
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

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const chartData = [
  {
    name: "Pending",
    value: stats.pending,
  },
  {
    name: "In Progress",
    value: stats.inProgress,
  },
  {
    name: "Resolved",
    value: stats.resolved,
  },
];

const COLORS = [
  "#F59E0B",
  "#3B82F6",
  "#22C55E",
];
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await axios.get(
        "http://localhost:3001/api/dashboard/stats"
      );

      setStats(statsRes.data);

      const complaintsRes = await axios.get(
        "http://localhost:3001/api/complaints"
      );

      setComplaints(complaintsRes.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

 return (
  <PageShell>
    <PageHeader
      eyebrow="Admin Dashboard"
      title="Complaint Operations"
      description="Manage, track, and resolve campus complaints from a clean operational dashboard."
      actions={
        <ButtonLink to="/admin/complaints">
          View All Complaints
        </ButtonLink>
      }
    />

    <div className="mb-8 grid gap-6 lg:grid-cols-3">
      {/* Total Complaints Card */}
      <div className="lg:col-span-1">
        <StatCard
          icon={FaClipboardList}
          label="Total Complaints"
          value={stats.total}
        />
      </div>

      {/* Pie Chart */}
      <div className="lg:col-span-2">
        <Card className="h-full p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Complaint Status Overview
          </h2>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
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
              <Td className="font-medium text-slate-900">
                {complaint.title}
              </Td>

              <Td>
                <StatusBadge status={complaint.status} />
              </Td>

              <Td>
                <Link
                  to={`/admin/update/${complaint._id}`}
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