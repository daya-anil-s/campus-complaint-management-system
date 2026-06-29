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

      <Card className="p-6 sm:p-8 hover:shadow-subtle transition duration-200">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-8 pb-8 border-b border-charcoal/40">
          <div className="h-20 w-20 rounded-full bg-pilot-gold flex items-center justify-center text-obsidian text-2xl font-semibold shadow-[0_0_15px_rgba(202,177,106,0.3)] hover:scale-105 transition duration-200">
            {getInitials(user?.name)}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-medium text-fog font-circularxx">{user?.name || "User"}</h2>
            <p className="text-sm text-pebble font-medium font-circularxxmono">{user?.email || "No email"}</p>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-badges)] text-xs font-semibold bg-charcoal border border-charcoal/40 text-pilot-gold mt-2 font-circularxxmono">
              <FaUserShield size={12} /> {user?.role || "Member"}
            </span>
          </div>
        </div>

        <dl className="grid gap-6 sm:grid-cols-2">
          <div className="p-4 bg-charcoal/20 rounded-[var(--radius-inputs)] border border-charcoal/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-charcoal border border-charcoal text-pilot-gold mt-0.5">
              <FaUser size={14} />
            </div>
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-[0.08em] text-pebble font-circularxxmono">
                Full Name
              </dt>
              <dd className="mt-1 text-base font-semibold text-fog">
                {user?.name || "-"}
              </dd>
            </div>
          </div>

          <div className="p-4 bg-charcoal/20 rounded-[var(--radius-inputs)] border border-charcoal/30 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-charcoal border border-charcoal text-pilot-gold mt-0.5">
              <FaEnvelope size={14} />
            </div>
            <div className="min-w-0">
              <dt className="text-[9px] font-bold uppercase tracking-[0.08em] text-pebble font-circularxxmono">
                Email Address
              </dt>
              <dd className="mt-1 text-base font-semibold text-fog truncate font-circularxxmono">
                {user?.email || "-"}
              </dd>
            </div>
          </div>

          <div className="p-4 bg-charcoal/20 rounded-[var(--radius-inputs)] border border-charcoal/30 flex items-start gap-3 sm:col-span-2">
            <div className="p-2 rounded-lg bg-charcoal border border-charcoal text-pilot-gold mt-0.5">
              <FaUserShield size={14} />
            </div>
            <div>
              <dt className="text-[9px] font-bold uppercase tracking-[0.08em] text-pebble font-circularxxmono">
                Permissions & Role
              </dt>
              <dd className="mt-1 text-base font-semibold text-fog leading-relaxed">
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
