import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { clearCurrentUser, getCurrentUser } from "../utils/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const user = getCurrentUser();
  const displayName = user?.name || "Student";

  const links =
    user?.role === "admin"
      ? [
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Complaints", to: "/admin/complaints" },
        ]
      : [
          { label: "Dashboard", to: "/student/dashboard" },
          { label: "My Complaints", to: "/student/complaints" },
          { label: "Submit Complaint", to: "/student/complaint" },
        ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    setIsOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to={user?.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
          className="mr-auto text-lg font-bold tracking-tight text-slate-950 no-underline"
        >
          CCMS
        </NavLink>

        <nav className="order-3 flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to.endsWith("dashboard")}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold no-underline transition ${
                  isActive
                    ? "bg-blue-50 text-[#2563EB]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-slate-600 transition hover:bg-slate-50"
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <span className="hidden max-w-36 truncate text-sm font-medium sm:block">
              {displayName}
            </span>
            <FaUserCircle size={32} className="shrink-0 text-[#2563EB]" />
            <FaChevronDown size={11} />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg" role="menu">
              <div className="border-b border-slate-200 px-4 py-3">
                <p className="truncate text-sm font-semibold text-slate-950">{displayName}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{user?.email || ""}</p>
              </div>
              <div className="p-1.5">
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50"
                  role="menuitem"
                >
                  My Profile
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
