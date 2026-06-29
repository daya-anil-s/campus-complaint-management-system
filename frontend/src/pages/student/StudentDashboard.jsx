import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaSearch,
  FaLightbulb,
  FaChevronLeft,
  FaChevronRight,
  FaPlusCircle,
  FaUser,
  FaListUl,
  FaBell,
  FaSyncAlt,
  FaCommentAlt,
  FaWrench,
  FaInfoCircle
} from "react-icons/fa";

import {
  ButtonLink,
  Card,
  PageHeader,
  PageShell,
  StatCard,
  StatusBadge,
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
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recentReplies, setRecentReplies] = useState([]);
  
  // Progress tracker selection
  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Tips carousel state
  const tips = [
    "Upload images for faster resolution.",
    "Provide accurate location details when submitting.",
    "Use comments for additional updates instead of submitting new complaints.",
    "Check estimated completion dates regularly for progress updates."
  ];
  const [tipIndex, setTipIndex] = useState(0);

  // Auto rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
  };

  const handlePrevTip = () => {
    setTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch only logged in student complaints
      const complaintsRes = await api.get("/complaints/my");
      const fetchedComplaints = complaintsRes.data;
      setComplaints(fetchedComplaints);

      // Select first complaint for progress bar by default
      if (fetchedComplaints.length > 0) {
        setSelectedComplaintId(fetchedComplaints[0]._id);
        setSelectedComplaint(fetchedComplaints[0]);
      }

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

      // Compile Recent Admin Replies
      const allAdminReplies = [];
      commentsResults.forEach(({ title, comments }) => {
        comments.forEach((comment) => {
          if (comment.user?.role === "Admin") {
            allAdminReplies.push({
              _id: comment._id,
              complaintTitle: title,
              message: comment.message,
              author: comment.user?.name || "Admin",
              createdAt: new Date(comment.createdAt),
            });
          }
        });
      });
      allAdminReplies.sort((a, b) => b.createdAt - a.createdAt);
      setRecentReplies(allAdminReplies.slice(0, 3));

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

      commentsResults.forEach(({ title, comments, complaintId }) => {
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
      setRecentActivity(compiledActivities.slice(0, 4));

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle complaint selection for progress bar
  const handleComplaintChange = (e) => {
    const id = e.target.value;
    setSelectedComplaintId(id);
    const complaint = complaints.find((c) => c._id === id);
    setSelectedComplaint(complaint || null);
  };

  // Recharts custom colors
  const chartData = [
    { name: "Pending", value: stats.pending },
    { name: "In Progress", value: stats.inProgress },
    { name: "Resolved", value: stats.resolved },
  ].filter(item => item.value > 0);

  // Wonder Theme Colors: Stone (Pending), Pilot Gold (In Progress), Mist (Resolved)
  const COLORS = ["#57534e", "#cab16a", "#d6d3d1"];

  // Helper to calculate progress percent
  const getProgressDetails = (status) => {
    switch (status) {
      case "Pending":
        return { percent: 33, step: 1 };
      case "In Progress":
        return { percent: 66, step: 2 };
      case "Resolved":
        return { percent: 100, step: 3 };
      default:
        return { percent: 0, step: 0 };
    }
  };

  const selectedProgress = selectedComplaint ? getProgressDetails(selectedComplaint.status) : { percent: 0, step: 0 };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Student Dashboard"
        title={user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
        description="Track your complaints, browse resolutions, and request maintenance."
        actions={
          <div className="flex gap-2">
            <ButtonLink to="/student/complaint" className="shadow-md">
              <FaPlusCircle className="mr-2" /> New Complaint
            </ButtonLink>
            <button 
              onClick={fetchDashboardData}
              className="p-3 border border-lavender-mist bg-transparent rounded-[var(--radius-buttons)] text-silver-smoke hover:border-laser-violet hover:bg-lavender-mist/10 transition hover:scale-102 flex items-center justify-center cursor-pointer"
              title="Refresh feed"
            >
              <FaSyncAlt />
            </button>
          </div>
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
        <div className="space-y-6">
          
          {/* TOP ROW: Statistics & Status Chart */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Stat Cards */}
            <div className="lg:col-span-2 grid gap-4 grid-cols-2">
              <div className="hover:scale-[1.02] transition duration-200">
                <StatCard
                  icon={FaListUl}
                  label="Total Complaints"
                  value={stats.total}
                />
              </div>
              <div className="hover:scale-[1.02] transition duration-200">
                <StatCard
                  icon={FaClock}
                  label="Pending"
                  value={stats.pending}
                />
              </div>
              <div className="hover:scale-[1.02] transition duration-200">
                <StatCard
                  icon={FaWrench}
                  label="In Progress"
                  value={stats.inProgress}
                />
              </div>
              <div className="hover:scale-[1.02] transition duration-200">
                <StatCard
                  icon={FaCheckCircle}
                  label="Resolved"
                  value={stats.resolved}
                />
              </div>
            </div>

            {/* Doughnut Chart */}
            <Card className="p-6 flex flex-col justify-between hover:shadow-subtle transition">
              <h2 className="text-sm font-semibold tracking-[0.08em] text-fog uppercase font-circularxx mb-2">Complaint Status</h2>
              
              {chartData.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center py-6">
                  <p className="text-xs text-pebble italic">No complaint data to display</p>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center relative min-h-[160px]">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                      >
                        {chartData.map((entry, index) => (
                          <Cell
                            key={index}
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
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                    <span className="text-2xl font-light text-fog font-whyte">{stats.total}</span>
                    <span className="text-[9px] uppercase font-semibold font-circularxxmono tracking-[0.05em] text-pebble">Total</span>
                  </div>
                </div>
              )}
              
              {/* Legend Indicators */}
              <div className="flex flex-wrap justify-center gap-4 text-[11px] font-medium text-mist mt-2 font-circularxxmono">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#57534e]"></span>Pending ({stats.pending})</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#cab16a]"></span>Active ({stats.inProgress})</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#d6d3d1]"></span>Resolved ({stats.resolved})</span>
              </div>
            </Card>
          </div>

          {/* MIDDLE ROW: Recent Activity & Notifications */}
          <div className="grid gap-6 md:grid-cols-2">
            
            {/* Recent Activity Card (Timeline) */}
            <Card className="p-6 hover:shadow-md transition">
              <h2 className="text-sm font-semibold tracking-[0.08em] text-paper-white uppercase font-uncut-sans mb-4">
                Recent Activity
              </h2>
              
              {recentActivity.length === 0 ? (
                <div className="h-48 flex flex-col justify-center items-center text-center">
                  <p className="text-ash-wisp text-sm font-medium">No recent activities logged.</p>
                  <p className="text-xs text-ash-wisp mt-1">Activities appear as updates happen.</p>
                </div>
              ) : (
                <div className="relative pl-4 border-l border-charcoal/40 space-y-4 font-circularxx">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="relative group">
                      {/* Bullet point */}
                      <span className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-graphite shadow-sm ${
                        activity.color === "blue" ? "bg-pilot-gold" :
                        activity.color === "amber" ? "bg-mist" :
                        activity.color === "green" ? "bg-pilot-gold" :
                        activity.color === "purple" ? "bg-pilot-gold" : "bg-stone"
                      }`} />
                      
                      <div className="flex justify-between items-baseline gap-2">
                        <p className="text-sm font-medium text-mist leading-tight">
                          {activity.message}
                        </p>
                        <span className="text-[10px] text-ash-wisp shrink-0 font-martian">
                          {new Date(activity.time).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short"
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Today's Notifications Card */}
            <Card className="p-6 hover:shadow-md transition">
              <h2 className="text-sm font-semibold tracking-[0.08em] text-paper-white uppercase font-uncut-sans mb-4 flex items-center gap-2">
                <FaBell className="text-ash-wisp" /> Notifications
              </h2>
              
              {notifications.length === 0 ? (
                <div className="h-48 flex flex-col justify-center items-center text-center">
                  <div className="h-10 w-10 bg-carbon-ink rounded-full flex items-center justify-center text-ash-wisp mb-3 border border-lavender-mist/40">
                    <FaBell size={16} />
                  </div>
                  <p className="text-sm font-semibold text-paper-white font-uncut-sans">You're all caught up!</p>
                  <p className="text-xs text-ash-wisp mt-1">No notifications for today.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif, index) => (
                    <div key={index} className="p-3 bg-charcoal/30 hover:bg-charcoal/60 rounded-[var(--radius-inputs)] border border-charcoal/50 flex items-start gap-3 transition">
                      <span className={`h-2.5 w-2.5 rounded-full mt-1.5 shrink-0 ${
                        notif.type === "reply" ? "bg-pilot-gold animate-pulse" :
                        notif.type === "status" ? "bg-pilot-gold" : "bg-pilot-gold"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <p className="text-xs font-semibold text-fog">{notif.title}</p>
                          <span className="text-[9px] text-pebble font-medium font-circularxxmono">
                            {new Date(notif.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-mist mt-0.5 truncate">{notif.message}</p>
                        <Link 
                          to={`/student/complaint/${notif.complaintId}`}
                          className="text-[10px] text-pilot-gold font-medium hover:underline mt-1.5 inline-block"
                        >
                          View Details &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* BOTTOM ROW: Recent Replies, Quick Actions, Tips & Complaint Progress */}
          <div className="grid gap-6 lg:grid-cols-3">
            
            {/* Recent Replies Card */}
            <Card className="p-6 hover:shadow-subtle transition lg:col-span-1">
              <h2 className="text-sm font-semibold tracking-[0.08em] text-fog uppercase font-circularxx mb-4 flex items-center gap-2">
                <FaCommentAlt className="text-pebble" /> Recent Replies
              </h2>

              {recentReplies.length === 0 ? (
                <div className="h-44 flex flex-col justify-center items-center text-center">
                  <p className="text-pebble text-sm italic font-medium">No replies yet.</p>
                  <p className="text-xs text-pebble mt-1">Admin messages will show up here.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {recentReplies.map((reply) => (
                    <div key={reply._id} className="border-b border-charcoal/40 last:border-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="text-xs font-bold text-mist">{reply.author}</span>
                        <span className="text-[9px] text-pebble font-circularxxmono">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-mist mt-0.5 line-clamp-2 leading-relaxed font-circularxx">
                        {reply.message}
                      </p>
                      <span className="text-[10px] text-pilot-gold font-medium block mt-1 font-circularxxmono">
                        on: <span className="italic">{reply.complaintTitle}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Quick Actions & Tips Card */}
            <div className="space-y-4 lg:col-span-1">
              {/* Quick Actions */}
              <Card className="p-5 hover:shadow-subtle transition">
                <h2 className="text-xs font-bold uppercase tracking-[0.08em] text-pebble mb-3 font-circularxx">Quick Actions</h2>
                <div className="grid grid-cols-3 gap-2">
                  <Link 
                    to="/student/complaint" 
                    className="flex flex-col items-center justify-center p-3 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal hover:bg-charcoal/50 text-mist hover:text-fog text-xs font-medium text-center transition hover:scale-105"
                  >
                    <FaPlusCircle className="mb-1.5 text-pilot-gold" size={16} />
                    <span>New Complaint</span>
                  </Link>
                  
                  <Link 
                    to="/student/complaints" 
                    className="flex flex-col items-center justify-center p-3 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal hover:bg-charcoal/50 text-mist hover:text-fog text-xs font-medium text-center transition hover:scale-105"
                  >
                    <FaListUl className="mb-1.5 text-pilot-gold" size={16} />
                    <span>My Feed</span>
                  </Link>
                  
                  <Link 
                    to="/profile" 
                    className="flex flex-col items-center justify-center p-3 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal hover:bg-charcoal/50 text-mist hover:text-fog text-xs font-medium text-center transition hover:scale-105"
                  >
                    <FaUser className="mb-1.5 text-mist" size={16} />
                    <span>Profile</span>
                  </Link>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-5 bg-gradient-to-br from-charcoal to-graphite border border-charcoal text-fog shadow-subtle overflow-hidden relative min-h-[110px]">
                <div className="absolute top-0 right-0 p-3 opacity-10 text-pilot-gold">
                  <FaLightbulb size={48} />
                </div>
                
                <div className="flex justify-between items-center mb-2 relative z-10 font-circularxx">
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-pilot-gold flex items-center gap-1.5 font-circularxxmono">
                    <FaLightbulb /> Support Tip
                  </span>
                  
                  <div className="flex gap-1.5 text-[10px] text-mist font-circularxxmono">
                    <button onClick={handlePrevTip} className="hover:text-fog transition cursor-pointer bg-transparent border-0 p-0">
                      <FaChevronLeft />
                    </button>
                    <span>{tipIndex + 1}/{tips.length}</span>
                    <button onClick={handleNextTip} className="hover:text-fog transition cursor-pointer bg-transparent border-0 p-0">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-mist select-none relative z-10 font-medium font-circularxx">
                  {tips[tipIndex]}
                </p>
              </Card>
            </div>

            {/* Complaint Progress Tracker Card */}
            <Card className="p-6 hover:shadow-subtle transition lg:col-span-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-semibold tracking-[0.08em] text-fog uppercase font-circularxx mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-pebble" /> Complaint Progress
                </h2>
                
                {complaints.length === 0 ? (
                  <div className="h-44 flex flex-col justify-center items-center text-center">
                    <p className="text-pebble text-sm italic font-medium">No active complaints yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Selector */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.08em] text-pebble mb-1 font-circularxxmono">
                        Select Complaint
                      </label>
                      <select 
                        value={selectedComplaintId} 
                        onChange={handleComplaintChange}
                        className="w-full text-xs font-semibold rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal p-1.5 focus:outline-none focus:border-slate text-fog truncate font-circularxx"
                      >
                        {complaints.map((c) => (
                          <option key={c._id} value={c._id} className="bg-graphite text-fog font-circularxx">
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {selectedComplaint && (
                      <div className="pt-2 space-y-4 font-circularxx">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-mist">Completion Estimate</span>
                          <span className="font-semibold text-pilot-gold font-circularxxmono">
                            {selectedProgress.percent}% Done
                          </span>
                        </div>

                        {/* Progress Bar Line */}
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-obsidian border border-charcoal/40">
                            <div 
                              style={{ width: `${selectedProgress.percent}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pilot-gold transition-all duration-500 ease-out"
                            />
                          </div>
                        </div>

                        {/* Steps timeline */}
                        <div className="flex justify-between text-[10px] font-bold text-pebble font-circularxxmono">
                          <span className={`${selectedProgress.step >= 1 ? "text-pilot-gold" : ""}`}>
                            Pending
                          </span>
                          <span className={`${selectedProgress.step >= 2 ? "text-pilot-gold font-medium" : ""}`}>
                            In Progress
                          </span>
                          <span className={`${selectedProgress.step >= 3 ? "text-pilot-gold" : ""}`}>
                            Resolved
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {selectedComplaint && (
                <div className="mt-4 pt-3 border-t border-charcoal/40 flex items-center justify-between font-circularxx">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-pebble uppercase font-bold font-circularxxmono">Status:</span>
                    <StatusBadge status={selectedComplaint.status} />
                  </div>
                  <Link 
                    to={`/student/complaint/${selectedComplaint._id}`}
                    className="text-[10px] font-bold text-pilot-gold hover:underline font-circularxxmono"
                  >
                    View Thread &rarr;
                  </Link>
                </div>
              )}
            </Card>

          </div>

        </div>
      )}
    </PageShell>
  );
}

export default StudentDashboard;