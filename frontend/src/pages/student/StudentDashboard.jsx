import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaCheckCircle,
  FaClock,
  FaPlusCircle,
  FaListUl,
  FaBell,
  FaWrench,
} from "react-icons/fa";

import {
  ButtonLink,
  Card,
  PageHeader,
  PageShell,
  StatCard,
} from "../../components/ui";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getCurrentUser } from "../../utils/auth";
import { SkeletonCard, SkeletonChart } from "../../components/SkeletonLoader";

function StudentDashboard() {
  const user = getCurrentUser();

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch only logged in student complaints
      const complaintsRes = await api.get("/complaints/my");
      const fetchedComplaints = complaintsRes.data;

      // Compute statistics locally
      const computedStats = {
        total: fetchedComplaints.length,
        pending: fetchedComplaints.filter((c) => c.status === "Pending").length,
        inProgress: fetchedComplaints.filter((c) => c.status === "In Progress").length,
        resolved: fetchedComplaints.filter((c) => c.status === "Resolved").length,
      };
      setStats(computedStats);

      // Fetch comments for recent complaints (up to 5) to compile replies & activities
      const activeComplaints = fetchedComplaints.slice(0, 5);
      const commentsPromises = activeComplaints.map(async (c) => {
        try {
          const commentsRes = await api.get(`/comments/${c._id}`);
          return { complaintId: c._id, title: c.title, comments: commentsRes.data };
        } catch (err) {
          console.error("Error fetching comments for complaint", c._id, err);
          return { complaintId: c._id, title: c.title, comments: [] };
        }
      });

      const commentsResults = await Promise.all(commentsPromises);

      // Compile Today's Notifications (alerts in the last 48h / recent status shifts)
      const compiledNotifications = [];
      fetchedComplaints.forEach((c) => {
        const createdAt = new Date(c.createdAt);
        const updatedAt = new Date(c.updatedAt);

        // Submitted
        compiledNotifications.push({
          type: "submit",
          title: "Complaint submitted",
          message: `Complaint "${c.title}" has been successfully submitted.`,
          date: createdAt,
          complaintId: c._id,
        });

        // Status movements
        if (c.status !== "Pending") {
          compiledNotifications.push({
            type: "status",
            title: `Moved to ${c.status}`,
            message: `Complaint "${c.title}" moved to status "${c.status}".`,
            date: updatedAt,
            complaintId: c._id,
          });
        }
      });

      commentsResults.forEach(({ comments, complaintId }) => {
        comments.forEach((comment) => {
          if (comment.user?.role === "Admin") {
            compiledNotifications.push({
              type: "reply",
              title: "Admin replied",
              message: `Admin commented: "${comment.message.substring(0, 50)}..."`,
              date: new Date(comment.createdAt),
              complaintId,
            });
          }
        });
      });

      // Sort notifications by date descending
      compiledNotifications.sort((a, b) => b.date - a.date);
      setNotifications(compiledNotifications.slice(0, 3));

      // Compile Recent Activities (a unified timeline stream)
      const compiledActivities = [];
      fetchedComplaints.forEach((c) => {
        compiledActivities.push({
          type: "submitted",
          message: `You submitted complaint "${c.title}"`,
          time: new Date(c.createdAt),
          color: "blue",
        });

        if (c.status === "In Progress") {
          compiledActivities.push({
            type: "in_progress",
            message: `Complaint "${c.title}" moved to In Progress`,
            time: new Date(c.updatedAt),
            color: "amber",
          });
        } else if (c.status === "Resolved") {
          compiledActivities.push({
            type: "resolved",
            message: `Complaint "${c.title}" was resolved`,
            time: new Date(c.updatedAt),
            color: "green",
          });
        }
      });

      commentsResults.forEach(({ title, comments }) => {
        comments.forEach((comment) => {
          const isAdm = comment.user?.role === "Admin";
          compiledActivities.push({
            type: isAdm ? "admin_comment" : "student_comment",
            message: `${isAdm ? "Admin" : "You"} commented on "${title}"`,
            time: new Date(comment.createdAt),
            color: isAdm ? "purple" : "slate",
          });
        });
      });

      compiledActivities.sort((a, b) => b.time - a.time);
      setRecentActivity(compiledActivities.slice(0, 5));

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(fetchDashboardData);
  }, [fetchDashboardData]);

  // Recharts custom colors
  const chartData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
  ].filter(item => item.value > 0);

  // Wonder Theme Colors: Stone (Pending), Pilot Gold (In Progress), Mist (Resolved)
  const COLORS = ["#57534e", "#cab16a", "#d6d3d1"];

  const formatShortDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

  return (
    <PageShell>
      <PageHeader
        eyebrow="Student Dashboard"
        title={user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
        description="A focused view of your complaint status, latest updates, and notifications."
        actions={
          <ButtonLink to="/student/complaint" className="h-12 px-6 shadow-md">
            <FaPlusCircle className="mr-2" /> New Complaint
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
            <div className="lg:col-span-2">
              <SkeletonChart />
            </div>
            <SkeletonCard />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={FaListUl} label="Total" value={stats.total} />
            <StatCard icon={FaClock} label="Pending" value={stats.pending} />
            <StatCard icon={FaWrench} label="In Progress" value={stats.inProgress} />
            <StatCard icon={FaCheckCircle} label="Resolved" value={stats.resolved} />
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-fog">
                    Complaint Status
                  </h2>
                  <p className="mt-1 text-xs text-pebble">Current distribution across your complaints.</p>
                </div>
              </div>

              {chartData.length === 0 ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-mist">No complaint data to display.</p>
                  <p className="mt-1 text-xs text-pebble">Submit a complaint to start tracking status.</p>
                </div>
              ) : (
                <div className="relative mt-5 flex min-h-[260px] items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={72}
                        outerRadius={100}
                        paddingAngle={4}
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={
                              entry.name === "Pending"
                                ? COLORS[0]
                                : entry.name === "In Progress"
                                ? COLORS[1]
                                : COLORS[2]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "#1c1917",
                          border: "1px solid #292524",
                          borderRadius: "8px",
                          color: "#e5e7eb",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-whyte text-4xl font-light text-fog">{stats.total}</span>
                    <span className="font-circularxxmono text-[10px] font-semibold uppercase tracking-[0.08em] text-pebble">
                      Total
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-4 grid gap-2 text-[11px] font-medium text-mist sm:grid-cols-3">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#57534e]" />
                  Pending ({stats.pending})
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#cab16a]" />
                  In Progress ({stats.inProgress})
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d6d3d1]" />
                  Resolved ({stats.resolved})
                </span>
              </div>
            </Card>

            <Card className="p-6 lg:col-span-3">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-fog">
                    Recent Activity
                  </h2>
                  <p className="mt-1 text-xs text-pebble">Latest 5 complaint updates.</p>
                </div>
              </div>

              {recentActivity.length === 0 ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                  <p className="text-sm font-medium text-mist">No recent activity yet.</p>
                  <p className="mt-1 text-xs text-pebble">Updates will appear here as complaints move forward.</p>
                </div>
              ) : (
                <div className="relative space-y-5 border-l border-charcoal pl-5">
                  {recentActivity.map((activity, index) => (
                    <div key={`${activity.type}-${activity.time}-${index}`} className="relative">
                      <span
                        className={`absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border-2 border-graphite ${
                          activity.color === "amber"
                            ? "bg-mist"
                            : activity.color === "slate"
                            ? "bg-stone"
                            : "bg-pilot-gold"
                        }`}
                      />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <p className="text-sm font-medium leading-6 text-mist">{activity.message}</p>
                        <span className="shrink-0 font-circularxxmono text-[10px] uppercase tracking-[0.05em] text-pebble">
                          {formatShortDate(activity.time)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <Card className="p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-fog">
                  <FaBell className="text-pilot-gold" /> Notifications
                </h2>
                <p className="mt-1 text-xs text-pebble">Latest 3 alerts from your complaint feed.</p>
              </div>
            </div>

            {notifications.length === 0 ? (
              <div className="flex min-h-[120px] flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-mist">You are all caught up.</p>
                <p className="mt-1 text-xs text-pebble">No notifications to show right now.</p>
              </div>
            ) : (
              <div className="grid gap-3 lg:grid-cols-3">
                {notifications.map((notif, index) => (
                  <Link
                    key={`${notif.type}-${notif.date}-${index}`}
                    to={`/student/complaint/${notif.complaintId}`}
                    className="block rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal/30 p-4 no-underline transition hover:border-slate hover:bg-charcoal/60"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-pilot-gold" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="truncate text-xs font-semibold text-fog">{notif.title}</p>
                          <span className="shrink-0 font-circularxxmono text-[9px] uppercase tracking-[0.05em] text-pebble">
                            {formatShortDate(notif.date)}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-mist">{notif.message}</p>
                        <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-[0.05em] text-pilot-gold">
                          View Details
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </PageShell>
  );
}

export default StudentDashboard;
