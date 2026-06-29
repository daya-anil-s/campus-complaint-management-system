import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { clearCurrentUser, getCurrentUser, getRoleLabel } from "../utils/auth";
import { useToast } from "./toastContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { showSuccess } = useToast();
  const user = getCurrentUser();
  console.log(user);
  const displayName = user?.name || getRoleLabel(user?.role);

  const links =
    user?.role === "Admin"
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
    showSuccess("Logged out successfully.");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal bg-obsidian/90 backdrop-blur-md shadow-subtle">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6 lg:px-8 font-circularxx">
        <NavLink
          to={user?.role === "Admin" ? "/admin/dashboard" : "/student/dashboard"}
          className="mr-auto flex items-center gap-2.5 text-base font-medium tracking-tight text-fog no-underline hover:opacity-90 transition"
        >
          <div className="h-8 w-8 rounded-lg bg-pilot-gold flex items-center justify-center text-obsidian font-bold font-whyte shadow-[0_0_10px_rgba(202,177,106,0.2)]">
            C
          </div>
          <span className="font-whyte font-light tracking-tight">CCMS</span>
        </NavLink>

        <nav className="order-3 flex w-full gap-2 overflow-x-auto sm:order-none sm:w-auto" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to.endsWith("dashboard")}
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-2 text-sm font-normal no-underline transition-colors duration-200 ${
                  isActive
                    ? "text-pilot-gold font-medium border-b-2 border-pilot-gold"
                    : "text-mist hover:text-pilot-gold"
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
            className="flex items-center gap-2 rounded-[var(--radius-buttons)] px-2.5 py-1.5 text-mist transition border border-transparent hover:border-charcoal hover:bg-charcoal/30 hover:text-fog"
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <span className="hidden max-w-36 truncate text-sm font-medium sm:block">
              {displayName}
            </span>
            <FaUserCircle size={28} className="shrink-0 text-pilot-gold" />
            <FaChevronDown size={10} className="text-ash" />
          </button>

          {isOpen && (
            <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-[var(--radius-cards)] border border-charcoal bg-graphite p-1 shadow-2xl animate-fadeIn" role="menu">
              <div className="border-b border-charcoal/40 px-4 py-3">
                <p className="truncate text-sm font-medium text-fog font-circularxx">{displayName}</p>
                <p className="mt-1 truncate text-xs text-pebble font-circularxxmono">{user?.email || ""}</p>
              </div>
              <div className="p-1 space-y-0.5">
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-[var(--radius-buttons)] px-3 py-2 text-sm font-medium text-mist no-underline hover:bg-charcoal/50 hover:text-fog"
                  role="menuitem"
                >
                  My Profile
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-[var(--radius-buttons)] px-3 py-2 text-left text-sm font-medium text-mist hover:bg-charcoal/50 hover:text-fog cursor-pointer"
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
