import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaInbox } from "react-icons/fa";

export function PageShell({ children, compact = false }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      <Navbar />
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className={`mx-auto w-full ${compact ? "max-w-xl" : "max-w-7xl"}`}>
          {children}
        </div>
      </main>
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
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
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
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
      "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 shadow-sm shadow-blue-100",
    secondary:
      "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  };

  return (
    <button
      className={`inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ to, children, variant = "primary", className = "" }) {
  const variants = {
    primary:
      "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 shadow-sm shadow-blue-100",
    secondary:
      "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
  };

  return (
    <Link
      to={to}
      className={`inline-flex h-11 items-center justify-center rounded-2xl border px-4 text-sm font-semibold no-underline transition focus:outline-none focus:ring-4 focus:ring-blue-100 hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${className}`}
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
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-50">
            <Icon size={20} />
          </div>
        )}
      </div>
    </Card>
  );
}

export function StatusBadge({ status }) {
  const tone =
    status === "Resolved"
      ? "bg-emerald-50 border border-emerald-100 text-emerald-600"
      : status === "In Progress"
      ? "bg-blue-50 border border-blue-100 text-blue-600"
      : "bg-amber-50 border border-amber-100 text-amber-600";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${tone}`}
    >
      {status}
    </span>
  );
}

export function TableCard({ title, children }) {
  return (
    <Card className="overflow-hidden">
      {title && (
        <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/30">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
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
      <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-inner animate-pulse">
        <FaInbox size={20} />
      </div>
      <p className="text-base font-bold text-slate-800">{message}</p>
      {description && <p className="mt-1.5 text-xs text-slate-500 leading-normal">{description}</p>}
    </div>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </thead>
  );
}

export function TableRow({ children }) {
  return (
    <tr className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50">
      {children}
    </tr>
  );
}

export function Th({ children }) {
  return <th className="px-6 py-4">{children}</th>;
}

export function Td({ children, className = "" }) {
  return <td className={`px-6 py-4 align-middle ${className}`}>{children}</td>;
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      {children}
    </label>
  );
}
