import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import {
  FaArrowRight,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaShieldAlt,
  FaUserGraduate,
  FaUserShield,
  FaCommentAlt,
  FaUpload,
  FaBuilding,
  FaChevronDown,
  FaGithub,
  FaLock,
  FaSignInAlt,
  FaInfoCircle
} from "react-icons/fa";

// Animated Counter Component using IntersectionObserver
function StatCounter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Trigger animation only once
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = parseInt(target, 10);
    if (isNaN(end)) return;
    
    const totalSteps = 40;
    const increment = Math.ceil(end / totalSteps);
    const stepTime = duration / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return (
    <span ref={elementRef} className="font-extrabold text-slate-900 tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

// State-driven FAQ Accordion Item Component
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 hover:text-blue-600 transition"
      >
        <span>{question}</span>
        <FaChevronDown
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180 text-blue-600" : ""
          }`}
          size={14}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 border-t border-slate-50" : "max-h-0"
        } overflow-hidden`}
      >
        <p className="p-5 text-sm text-slate-500 leading-relaxed bg-slate-50/50">
          {answer}
        </p>
      </div>
    </div>
  );
}

function LandingPage() {
  const user = getCurrentUser();

  // Scroll to section helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 font-sans antialiased">
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-200">
              C
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 hidden md:inline">
              Campus Complaint Management System
            </span>
            <span className="text-base font-bold tracking-tight text-slate-900 md:hidden">
              CCMS
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-blue-600 transition cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToSection("features")} className="hover:text-blue-600 transition cursor-pointer">
              Features
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-blue-600 transition cursor-pointer">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600 transition cursor-pointer">
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to={user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 px-5 text-sm font-bold text-white shadow-md shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 hover:text-blue-600 transition px-3 py-2 flex items-center gap-1.5"
                >
                  <FaSignInAlt size={14} /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-5 text-sm font-bold text-white shadow-md shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-24 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.03),transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Unified Campus Helpdesk
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl leading-[1.1] leading-none">
              Campus Complaint <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Management System</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-lg">
              A smart platform for students and administrators to report, track, and resolve campus complaints efficiently.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to={user ? (user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard") : "/register"}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 px-6 text-sm font-bold text-white shadow-lg shadow-blue-100 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Get Started <FaArrowRight className="ml-2" size={12} />
              </Link>
              <Link
                to={user ? (user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard") : "/login"}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-6 text-sm font-bold text-slate-700 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Hero mockup illustration */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg animate-float">
              {/* Main dashboard mockup frame */}
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 rounded-full bg-red-400" />
                    <span className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
                    <span className="h-3.5 w-3.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                    Mock Dashboard
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-50">
                    <span className="text-[10px] text-blue-600 font-bold uppercase">Total</span>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">42</p>
                  </div>
                  <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-50">
                    <span className="text-[10px] text-amber-600 font-bold uppercase">Active</span>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">12</p>
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-50">
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">Solved</span>
                    <p className="text-xl font-extrabold text-slate-900 mt-1">30</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-semibold text-slate-800">Water Leakage in Hostel A</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 font-bold">In Progress</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-semibold text-slate-800">Library WiFi Unstable</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-bold">Pending</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <span className="font-semibold text-slate-800">Classroom 302 Projector Fix</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold">Resolved</span>
                  </div>
                </div>
              </div>

              {/* Decorative floating cards */}
              <div className="absolute -top-6 -right-6 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 hidden md:block max-w-40">
                <p className="text-[10px] font-bold text-indigo-400">RESOLUTION SPEED</p>
                <p className="text-lg font-extrabold mt-1">94% &uarr;</p>
                <p className="text-[9px] text-slate-400 mt-1 leading-normal">Resolving tickets in under 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES SECTION */}
      <section id="features" className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Why Choose CCMS?</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for seamless campus communication
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ditch the paper forms and unanswered emails. CCMS delivers a robust digital suite ensuring transparency and rapid accountability.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <FaClipboardList size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Complaint Submission</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                Easily lodge complaints with descriptive details, exact campus locations, and designated utility categories.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <FaClock size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Real-Time Tracking</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                Monitor ticket states dynamically using animated progress bars and timestamped operations updates.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <FaUserShield size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Admin Dashboard</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                Advanced dispatch interface for operators to route tickets, pick priorities, and assign technician teams.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <FaUpload size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Image Upload</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                Attach photo evidence to assist facilities technicians and ensure quicker resolution accuracy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <FaCommentAlt size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Discussion & Comments</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                Communicate directly with resolution desks. Write updates or ask follow-up questions in-app.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
              <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                <FaLock size={16} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Secure Authentication</h3>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                Restricted user boundaries using secure JSON Web Token verification, protecting privacy data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The Roadmap</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              How CCMS operates
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              A transparent, simple protocol bridging reports straight to technical teams.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-5 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3 relative group">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold z-10 group-hover:scale-105 transition">
                <FaUserGraduate size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">1. Student Login</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Log into the student portal using secure credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3 relative group">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold z-10 group-hover:scale-105 transition">
                <FaClipboardList size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">2. Submit Complaint</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Fill details, pick location, add category, and upload photos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3 relative group">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold z-10 group-hover:scale-105 transition">
                <FaUserShield size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">3. Admin Reviews</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Operators evaluate issues and assign maintenance departments.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3 relative group">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold z-10 group-hover:scale-105 transition">
                <FaClock size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">4. Status Updated</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Ticket moves to In Progress with estimates and remarks.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center space-y-3 relative group">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold z-10 group-hover:scale-105 transition">
                <FaCheckCircle size={16} />
              </div>
              <h4 className="text-sm font-bold text-slate-900">5. Complaint Resolved</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Repairs finished. Student is informed, and tickets are locked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DASHBOARD PREVIEW */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The Interfaces</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Powering both sides of the system
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Explore mock interfaces of our tailored layouts built for students and operators.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Student Preview Card */}
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  Student Portal
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4">Student Dashboard</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">
                  Submit new reports, track status percentages, read rotating support advice, and view feedback threads in one place.
                </p>

                {/* Mockup component */}
                <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 font-sans text-xs">
                  <div className="flex justify-between items-center font-bold text-slate-400 text-[10px]">
                    <span>MY TICKET PROGRESS</span>
                    <span>66%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full w-2/3 bg-blue-500 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400">
                    <span>Pending</span>
                    <span className="text-blue-600 font-bold">In Progress</span>
                    <span>Resolved</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Supports: Submission, Comments, Tracking</span>
                <Link to="/register" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                  Create Student Account &rarr;
                </Link>
              </div>
            </div>

            {/* Admin Preview Card */}
            <div className="rounded-3xl bg-white border border-slate-100 p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Operations Console
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4">Admin Dashboard</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">
                  Assign complaints directly to target departments, pick priority urgency, set estimation target dates, and leave resolution remarks.
                </p>

                {/* Mockup component */}
                <div className="mt-8 p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">DEPT</span>
                      <div className="mt-1 bg-white p-1.5 border rounded-lg text-[11px] font-semibold text-slate-700">IT Support</div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">PRIORITY</span>
                      <div className="mt-1 bg-white p-1.5 border rounded-lg text-[11px] font-semibold text-red-600">🔴 High</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Supports: Assignments, Estimation Dates, Remarks</span>
                <Link to="/login" className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
                  Access Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATISTICS SECTION */}
      <section className="py-16 bg-slate-900 text-white relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            
            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-blue-500">
                <StatCounter target="500" suffix="+" />
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Complaints Submitted
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-emerald-500">
                <StatCounter target="350" suffix="+" />
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Resolved Issues
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-indigo-500">
                <StatCounter target="200" suffix="+" />
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Students Enrolled
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-amber-500">
                <StatCounter target="10" suffix="+" />
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Departments Assigned
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 7. BENEFITS SECTION */}
      <section id="about" className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The Value</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Bringing value to every tier
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Transparency, speed, and planning organization across the entire institution.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* For Students */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                  S
                </div>
                <h3 className="text-xl font-bold text-slate-950">For Students</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Easy complaint submission
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Track progress in real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    Receive comments and notifications
                  </li>
                </ul>
              </div>
            </div>

            {/* For Administrators */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                  A
                </div>
                <h3 className="text-xl font-bold text-slate-950">For Administrators</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    Manage complaints dynamically
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    Assign priorities instantly
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                    Communicate directly with students
                  </li>
                </ul>
              </div>
            </div>

            {/* For Institution */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition duration-200">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                  I
                </div>
                <h3 className="text-xl font-bold text-slate-950">For Institution</h3>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Transparency in campus processes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Better Response and SLA times
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    Organized complaint handling logs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-20 sm:py-28 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">FAQ</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm">
              Quick answers about lodging, tracking, and completing tickets.
            </p>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="How do I submit a complaint?"
              answer="Log in with your Student account credentials, select 'New Complaint' from your quick actions or the navigation panel, fill out the category details and exact campus location description, and click submit."
            />
            <FaqItem
              question="Can I upload images?"
              answer="Yes. When submitting a complaint, students can attach photo logs of maintenance and technical problems. The images are stored securely and displayed for facilities supervisors to reference."
            />
            <FaqItem
              question="Can I track complaint status?"
              answer="Yes! Students can select any complaint they own from their Dashboard to check live percentage updates moving from Pending &rarr; In Progress &rarr; Resolved."
            />
            <FaqItem
              question="How does the admin respond?"
              answer="Administrators access their dispatch panel, route the report to appropriate departments, set targets, record internal remarks, and leave comments inside the complaint thread for student queries."
            />
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-700 to-indigo-900 text-white relative">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl leading-tight">
            Ready to Improve Campus Communication?
          </h2>
          <p className="text-slate-200 text-sm max-w-xl mx-auto leading-relaxed">
            Create an account or login to start tracking, managing, and resolving campus complaints on a unified portal.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-white text-blue-600 hover:bg-slate-50 px-6 text-sm font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 px-6 text-sm font-bold shadow-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="h-7 w-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
                C
              </div>
              <span className="text-sm font-bold tracking-tight">CCMS</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed with ❤️ for Campus Complaint Management. Efficiently routing issues straight to resolutions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("features")} className="hover:text-white transition cursor-pointer">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-white transition cursor-pointer">
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Features</h4>
            <ul className="space-y-2 text-xs">
              <li>Real-time Progress</li>
              <li>Secure Verification</li>
              <li>Remarks & Timeline Logs</li>
              <li>Comments System</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact & Support</h4>
            <ul className="space-y-2 text-xs">
              <li>ccms-support@campus.edu</li>
              <li>Office of Maintenance & Infrastructure</li>
              <li className="pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition"
                >
                  <FaGithub size={14} /> GitHub Project
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} CCMS. All rights reserved.</span>
          <span>Designed with ❤️ for Campus Complaint Management</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
