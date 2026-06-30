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

  const statusItems = [
    {
      name: "Pending",
      value: stats.pending,
      color: "#cab16a",
    },
    {
      name: "In Progress",
      value: stats.inProgress,
      color: "#5b8def",
    },
    {
      name: "Resolved",
      value: stats.resolved,
      color: "#89b482",
    },
  ];

  const chartData = statusItems.filter(item => item.value > 0);

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
                  <div className="flex flex-col items-center gap-5">
                    <div className="relative h-[220px] w-[220px] sm:h-[240px] sm:w-[240px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                          <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius="62%"
                            outerRadius="88%"
                            paddingAngle={3}
                            stroke="#1c1917"
                            strokeWidth={3}
                            isAnimationActive={false}
                          >
                            {chartData.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              background: "#1c1917",
                              border: "1px solid #44403c",
                              borderRadius: 8,
                              color: "#e5e7eb",
                            }}
                            itemStyle={{ color: "#e5e7eb" }}
                            formatter={(value, name) => [
                              `${value} (${stats.total > 0 ? Math.round((value / stats.total) * 100) : 0}%)`,
                              name,
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="font-circularxxmono text-3xl font-bold text-fog">
                          {stats.total}
                        </span>
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-pilot-gold">
                          Total
                        </span>
                      </div>
                    </div>

                    <div className="grid w-full gap-2 sm:grid-cols-3">
                      {statusItems.map((item) => {
                        const percentage = stats.total > 0
                          ? Math.round((item.value / stats.total) * 100)
                          : 0;

                        return (
                          <div
                            key={item.name}
                            className="flex items-center justify-between gap-3 rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal/45 px-3 py-2"
                          >
                            <div className="flex min-w-0 items-center gap-2">
                              <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="truncate text-xs font-semibold text-mist">
                                {item.name}
                              </span>
                            </div>
                            <div className="shrink-0 text-right font-circularxxmono">
                              <div className="text-xs font-bold text-fog">{item.value}</div>
                              <div className="text-[10px] text-pilot-gold">{percentage}%</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
