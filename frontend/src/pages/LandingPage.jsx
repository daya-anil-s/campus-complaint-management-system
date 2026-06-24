import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { FaArrowRight, FaClipboardList, FaClock, FaCheckCircle, FaShieldAlt, FaBolt, FaUserGraduate, FaUserShield } from "react-icons/fa";

function LandingPage() {
  const user = getCurrentUser();

  const features = [
    {
      title: "Real-Time Tracking",
      description: "Monitor complaint status updates instantly as administrative departments review and transition operations.",
      icon: FaClock,
    },
    {
      title: "Role-Based Operations",
      description: "Dedicated interfaces for student submissions and administrative operations, securing access credentials.",
      icon: FaShieldAlt,
    },
    {
      title: "Actionable Metrics",
      description: "Clean dashboards tracking pending, in-progress, and resolved items with full historical timeline logs.",
      icon: FaClipboardList,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Report Issues",
      description: "Students submit detailed forms indicating the category, location, and severity of the campus issue.",
    },
    {
      number: "02",
      title: "Department Route",
      description: "Administrators view and process submissions, update status states, and append technical remarks.",
    },
    {
      number: "03",
      title: "Resolution Log",
      description: "The system logs final resolution timelines, closing the ticket and notifying the student of completion.",
    },
  ];

  const statistics = [
    { value: "99.2%", label: "Resolution Rate" },
    { value: "12 Hours", label: "Average Response Time" },
    { value: "4,200+", label: "Active Portal Users" },
  ];

  return (
    <div className="min-h-screen bg-marble-white text-graphite font-geist antialiased selection:bg-graphite selection:text-pearl">
      {/* Landing Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-hairline bg-marble-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 fill-graphite" viewBox="0 0 100 100">
              <polygon points="50,15 90,85 10,85" />
            </svg>
            <span className="text-sm font-semibold tracking-tight text-graphite -tracking-[0.03em]">
              CCMS
            </span>
          </div>

          <nav className="flex items-center gap-4">
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="inline-flex h-9 items-center justify-center rounded-md border border-hairline bg-pearl px-4 text-xs font-medium text-graphite shadow-sm transition-all hover:bg-marble-white hover:border-ash active:scale-98"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-medium text-felt-gray hover:text-graphite transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-graphite px-4 text-xs font-medium text-pearl transition-all hover:bg-carbon active:scale-98"
                >
                  Access Portal
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-hairline bg-marble-white py-20 sm:py-28 bg-grid">
        {/* Conic Gradient behind the Triangle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-[400px] w-[400px] rounded-full bg-prism-gradient" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
          {/* Accent Badge */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-pearl px-3 py-1 text-xs font-medium text-smoke shadow-sm">
            <span className="flex h-1.5 w-1.5 rounded-full bg-[#45dec5]" />
            Unified Campus Operations Portal
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-graphite -tracking-[0.06em] sm:text-6xl">
            Campus operations,<br />resolved in real-time.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-xl text-base text-felt-gray -tracking-[0.02em] leading-relaxed">
            A premium, unified workspace for students and administrators. Submit issues, track operational workflows, and coordinate resolutions with complete clarity.
          </p>

          {/* CTA Row */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="inline-flex h-10 items-center justify-center rounded-md bg-graphite px-6 text-sm font-medium text-pearl transition-all hover:bg-carbon active:scale-98"
              >
                Go to Dashboard
                <FaArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-graphite px-6 text-sm font-medium text-pearl transition-all hover:bg-carbon active:scale-98"
                >
                  Access Portal
                  <FaArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-hairline bg-pearl px-6 text-sm font-medium text-felt-gray transition-all hover:bg-marble-white hover:text-graphite active:scale-98"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Monolith Prism Logo Accent */}
          <div className="mt-20 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-hairline bg-pearl shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <svg className="h-10 w-10 fill-graphite" viewBox="0 0 100 100">
                <polygon points="50,15 90,85 10,85" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Callout Strip */}
      <section className="border-b border-hairline bg-pearl py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
            {statistics.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl font-semibold tracking-tight text-graphite -tracking-[0.04em]">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.05em] text-smoke">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-hairline bg-marble-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-felt-gray">
              Engineered for Speed
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-graphite -tracking-[0.04em]">
              Modern features for modern campus portals.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-md border border-hairline bg-pearl p-8 transition-all hover:border-ash"
                style={{ boxShadow: "var(--shadow-subtle)" }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-hairline bg-marble-white text-graphite">
                  <feature.icon size={16} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-graphite -tracking-[0.03em]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-felt-gray leading-relaxed -tracking-[0.01em]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="border-b border-hairline bg-pearl py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-felt-gray">
              Simple Protocol
            </h2>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-graphite -tracking-[0.04em]">
              Operational flow from report to resolution.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-start p-2">
                <span className="text-5xl font-semibold text-hairline -tracking-[0.05em] font-mono leading-none">
                  {step.number}
                </span>
                <h3 className="mt-4 text-base font-semibold text-graphite -tracking-[0.02em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-felt-gray leading-relaxed -tracking-[0.015em]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CCMS Section */}
      <section className="border-b border-hairline bg-marble-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-felt-gray">
                Trust & Accountability
              </h2>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-graphite -tracking-[0.05em] sm:text-4xl">
                A system built for trust between campuses and students.
              </h3>
              <p className="mt-6 text-sm text-felt-gray leading-relaxed -tracking-[0.01em]">
                Unlike legacy feedback systems that swallow reports without feedback, CCMS forces transparency. Students see exactly what queue their ticket is in and administrative operators are held accountable by state timelines and logged timestamps.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Achieve 100% auditable complaint resolution trails.",
                  "Reduce phone calls and redundant office complaints.",
                  "Improve campus facilities planning using structured log analytics.",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-graphite text-pearl text-[9px] font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-medium text-graphite -tracking-[0.01em]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual wireframe representation */}
            <div className="relative flex justify-center lg:justify-end">
              <div
                className="w-full max-w-md rounded-md border border-hairline bg-pearl p-6"
                style={{ boxShadow: "var(--shadow-subtle-3)" }}
              >
                <div className="flex items-center justify-between border-b border-hairline pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#52aeff]" />
                    <span className="text-xs font-mono text-smoke">SERVICE_NODE_CCMS</span>
                  </div>
                  <span className="rounded-full bg-graphite px-2 py-0.5 text-[10px] font-medium text-pearl">
                    Active
                  </span>
                </div>

                <div className="mt-6 space-y-4 font-mono text-[11px] text-felt-gray">
                  <div className="flex justify-between border-b border-hairline/50 pb-2">
                    <span>student_identity</span>
                    <span className="text-graphite">verified_ssl</span>
                  </div>
                  <div className="flex justify-between border-b border-hairline/50 pb-2">
                    <span>complaint_hash</span>
                    <span className="text-graphite">8c7f...91aa</span>
                  </div>
                  <div className="flex justify-between border-b border-hairline/50 pb-2">
                    <span>resolution_node</span>
                    <span className="text-graphite">resolved_ok</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span>latency_seconds</span>
                    <span className="text-vercel-blue">0.024s</span>
                  </div>
                </div>

                {/* Micro linework graphic */}
                <div className="mt-6 h-20 rounded border border-hairline bg-marble-white/50 p-2 flex items-center justify-center">
                  <div className="w-full flex items-end justify-between gap-1 h-full px-4">
                    {[35, 60, 45, 90, 75, 40, 85, 95, 50, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-graphite/10 hover:bg-graphite transition-all rounded-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-hairline bg-pearl py-12">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 fill-graphite" viewBox="0 0 100 100">
                <polygon points="50,15 90,85 10,85" />
              </svg>
              <span className="text-xs font-semibold text-graphite -tracking-[0.02em]">
                CCMS © {new Date().getFullYear()}
              </span>
            </div>

            <div className="flex gap-6 text-xs text-smoke">
              <a href="#" className="hover:text-graphite transition-colors">
                System Status
              </a>
              <a href="#" className="hover:text-graphite transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-graphite transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-graphite transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
