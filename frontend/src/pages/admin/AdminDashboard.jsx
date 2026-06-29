import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaClipboardList, FaClock, FaWrench, FaCheckCircle } from "react-icons/fa";
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
  ResponsiveContainer,
} from "recharts";

import { SkeletonCard, SkeletonChart, SkeletonTable } from "../../components/SkeletonLoader";
import AdminUpdateModal from "../../components/AdminUpdateModal";

function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

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
  ].filter(item => item.value > 0);

  // Wonder Theme Colors: Stone (Pending), Pilot Gold (In Progress), Mist (Resolved)
  const COLORS = [
    "#57534e",
    "#cab16a",
    "#d6d3d1",
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const statsRes = await api.get("/dashboard/stats");
      setStats(statsRes.data);

      const complaintsRes = await api.get("/complaints"); 
      setComplaints(complaintsRes.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Complaint Operations"
        description="Manage, track, and resolve campus complaints from a clean operational dashboard."
        actions={
          <ButtonLink to="/admin/complaints" className="transition shadow-sm">
            View All Complaints
          </ButtonLink>
        }
      />

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SkeletonCard />
            </div>
            <div className="lg:col-span-2">
              <SkeletonChart />
            </div>
          </div>
          <SkeletonTable rows={3} cols={3} />
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* STATS OVERVIEW */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 font-circularxx">
            <div className="hover:scale-102 transition duration-200">
              <StatCard
                icon={FaClipboardList}
                label="Total Complaints"
                value={stats.total}
              />
            </div>
            <div className="hover:scale-102 transition duration-200">
              <StatCard
                icon={FaClock}
                label="Pending"
                value={stats.pending}
              />
            </div>
            <div className="hover:scale-102 transition duration-200">
              <StatCard
                icon={FaWrench}
                label="In Progress"
                value={stats.inProgress}
              />
            </div>
            <div className="hover:scale-102 transition duration-200">
              <StatCard
                icon={FaCheckCircle}
                label="Resolved"
                value={stats.resolved}
              />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Quick Summary Info */}
            <div className="lg:col-span-1 flex flex-col gap-4 font-circularxx">
              <Card className="p-6 h-full flex flex-col justify-between hover:shadow-subtle transition">
                <div>
                  <h3 className="text-sm font-semibold tracking-[0.08em] text-fog uppercase font-circularxx mb-2">Operations Summary</h3>
                  <p className="text-xs text-pebble leading-relaxed">
                    Check assigned departments, update resolutions and estimated completion times. Keep student notifications active for higher customer satisfaction.
                  </p>
                </div>
                <div className="pt-4 border-t border-charcoal/40 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-mist">Pending Rate</span>
                    <span className="font-bold text-pilot-gold font-circularxxmono">
                      {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-mist">Resolution Rate</span>
                    <span className="font-bold text-mist font-circularxxmono">
                      {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Pie Chart */}
            <div className="lg:col-span-2">
              <Card className="h-full p-6 hover:shadow-subtle transition">
                <h2 className="mb-4 text-sm font-semibold tracking-[0.08em] text-fog uppercase font-circularxx">
                  Complaint Status Overview
                </h2>

                {chartData.length === 0 ? (
                  <div className="h-48 flex items-center justify-center font-circularxx">
                    <p className="text-sm text-pebble italic font-medium">No complaint statistics available.</p>
                  </div>
                ) : (
                  <div style={{ width: "100%", height: 200 }} className="relative flex justify-center items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          className="font-circularxxmono text-[10px] fill-fog"
                        >
                          {chartData.map((entry, index) => {
                            let cellColor = COLORS[0];
                            if (entry.name === "In Progress") cellColor = COLORS[1];
                            if (entry.name === "Resolved") cellColor = COLORS[2];
                            return <Cell key={index} fill={cellColor} />;
                          })}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* RECENT COMPLAINTS TABLE */}
          <TableCard title="Recent Complaints">
            {complaints.length === 0 ? (
              <div className="p-8 text-center border-t border-charcoal/40 bg-graphite">
                <p className="text-sm text-pebble italic font-medium font-circularxx">No complaints submitted yet.</p>
              </div>
            ) : (
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
                      <Td className="font-semibold text-fog">
                        {complaint.title}
                      </Td>

                      <Td>
                        <StatusBadge status={complaint.status} />
                      </Td>

                      <Td>
                        <button
                          onClick={() => setSelectedComplaintId(complaint._id)}
                          className="font-semibold text-pilot-gold hover:underline transition cursor-pointer bg-transparent border-0 p-0 font-circularxxmono text-xs tracking-wide"
                        >
                          Update
                        </button>
                      </Td>
                    </TableRow>
                  ))}
                </tbody>
              </DataTable>
            )}
          </TableCard>
        </div>
      )}

      {/* OVERLAY UPDATE MODAL */}
      {selectedComplaintId && (
        <AdminUpdateModal
          complaintId={selectedComplaintId}
          onClose={() => setSelectedComplaintId(null)}
          onUpdateSuccess={fetchDashboardData}
        />
      )}
    </PageShell>
  );
}

export default AdminDashboard;