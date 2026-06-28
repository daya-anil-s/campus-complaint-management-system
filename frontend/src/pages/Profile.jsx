import { Card, PageHeader, PageShell } from "../components/ui";
import { FaUserShield, FaEnvelope, FaUser } from "react-icons/fa";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Get initials for profile picture
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <PageShell compact>
      <PageHeader
        eyebrow="Account"
        title="My Profile"
        description="Your current CCMS account information."
      />

      <Card className="p-6 sm:p-8 hover:shadow-md transition duration-200">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-extrabold shadow-md hover:scale-105 transition duration-200">
            {getInitials(user?.name)}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">{user?.name || "User"}</h2>
            <p className="text-sm text-slate-500 font-medium">{user?.email || "No email"}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 mt-1">
              <FaUserShield size={12} /> {user?.role || "Member"}
            </span>
          </div>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mt-0.5">
              <FaUser size={14} />
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Full Name
              </dt>
              <dd className="mt-1 text-base font-semibold text-slate-950">
                {user?.name || "-"}
              </dd>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 mt-0.5">
              <FaEnvelope size={14} />
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </dt>
              <dd className="mt-1 text-base font-semibold text-slate-950 truncate">
                {user?.email || "-"}
              </dd>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3 sm:col-span-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 mt-0.5">
              <FaUserShield size={14} />
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Permissions & Role
              </dt>
              <dd className="mt-1 text-base font-semibold text-slate-950">
                {user?.role || "-"} (Authorized to access dashboard features matching your role)
              </dd>
            </div>
          </div>
        </dl>
      </Card>
    </PageShell>
  );
}

export default Profile;
