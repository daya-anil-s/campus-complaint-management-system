import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaInbox } from "react-icons/fa";

export function PageShell({ children, compact = false }) {
  return (
    <div className="min-h-screen bg-obsidian text-fog font-circularxx antialiased pb-12">
      <Navbar />
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className={`mx-auto w-full ${compact ? "max-w-xl" : "max-w-7xl"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}

export function Card({ children, className = "", variant = "dark" }) {
  const bg = variant === "light"
    ? "bg-bone text-obsidian border border-slate"
    : "bg-graphite border border-charcoal";
  return (
    <section
      className={`rounded-[var(--radius-cards)] border transition-all duration-300 ${bg} ${className}`}
    >
      {children}
    </section>
  );
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-pilot-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-4xl font-whyte">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-pebble sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

export function Button({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary:
      "border-transparent bg-pilot-gold text-obsidian hover:bg-pilot-gold/90 font-medium",
    secondary:
      "border-slate bg-transparent text-fog hover:border-ash hover:bg-slate/10",
  };

  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-[var(--radius-buttons)] border px-5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-pilot-gold disabled:cursor-not-allowed disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ to, children, variant = "primary", className = "" }) {
  const variants = {
    primary:
      "border-transparent bg-pilot-gold text-obsidian hover:bg-pilot-gold/90 font-medium",
    secondary:
      "border-slate bg-transparent text-fog hover:border-ash hover:bg-slate/10",
  };

  return (
    <Link
      to={to}
      className={`inline-flex h-11 items-center justify-center rounded-[var(--radius-buttons)] border px-5 text-sm font-semibold no-underline transition focus:outline-none focus:ring-2 focus:ring-pilot-gold hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function StatCard({ icon: Icon, label, value }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-pebble uppercase tracking-[0.08em]">{label}</p>
          <p className="mt-3 text-4xl font-light tracking-tight text-fog font-whyte">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal text-pilot-gold">
            <Icon size={16} />
          </div>
        )}
      </div>
    </Card>
  );
}

export function StatusBadge({ status }) {
  let badgeStyles = "border-charcoal bg-obsidian text-stone";
  if (status === "Resolved") {
    badgeStyles = "border-charcoal bg-graphite text-mist";
  } else if (status === "In Progress") {
    badgeStyles = "border-charcoal bg-charcoal text-pilot-gold";
  }

  return (
    <span
      className={`inline-flex rounded-[var(--radius-badges)] border px-3 py-1 text-[10px] font-circularxxmono tracking-[0.05em] font-normal ${badgeStyles}`}
    >
      {status}
    </span>
  );
}

export function TableCard({ title, children }) {
  return (
    <Card className="overflow-hidden">
      {title && (
        <div className="border-b border-charcoal px-6 py-4 bg-charcoal/30">
          <h2 className="text-sm font-semibold tracking-[0.08em] text-fog uppercase font-circularxx">{title}</h2>
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
    </Card>
  );
}

export function DataTable({ children }) {
  return (
    <table className="w-full min-w-[680px] border-collapse text-left text-sm">
      {children}
    </table>
  );
}

export function EmptyState({ message = "No complaints found.", description }) {
  return (
    <div className="px-6 py-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto">
      <div className="h-12 w-12 rounded-[var(--radius-badges)] bg-charcoal border border-charcoal flex items-center justify-center text-pilot-gold mb-4">
        <FaInbox size={20} />
      </div>
      <p className="text-base font-bold text-fog">{message}</p>
      {description && <p className="mt-1.5 text-xs text-pebble leading-normal">{description}</p>}
    </div>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="border-b border-charcoal bg-charcoal/30 text-[11px] font-circularxxmono uppercase tracking-[0.05em] text-pebble">
      {children}
    </thead>
  );
}

export function TableRow({ children }) {
  return (
    <tr className="border-b border-charcoal/40 transition last:border-0 hover:bg-charcoal/50">
      {children}
    </tr>
  );
}

export function Th({ children }) {
  return <th className="px-6 py-4 font-semibold text-pebble">{children}</th>;
}

export function Td({ children, className = "" }) {
  return <td className={`px-6 py-4 align-middle text-mist ${className}`}>{children}</td>;
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
        {label}
      </span>
      {children}
    </label>
  );
}
