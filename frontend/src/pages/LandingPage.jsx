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
  FaChevronDown,
  FaGithub,
  FaLock,
  FaSignInAlt
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
    <span ref={elementRef} className="font-bold text-laser-violet tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

// State-driven FAQ Accordion Item Component
function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#e1e4e8] rounded-[var(--radius-cards)] bg-paper-white overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-mulberry-deep hover:text-laser-violet transition font-uncut-sans"
      >
        <span>{question}</span>
        <FaChevronDown
          className={`text-ash-wisp transition-transform duration-200 ${
            isOpen ? "transform rotate-180 text-laser-violet" : ""
          }`}
          size={12}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 border-t border-[#f0f0f0]" : "max-h-0"
        } overflow-hidden`}
      >
        <p className="p-5 text-sm text-[#737373] leading-relaxed bg-[#f7f6f5]/55 font-inter">
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
    <div className="min-h-screen bg-obsidian text-fog font-circularxx antialiased relative overflow-hidden">
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-charcoal bg-obsidian/90 backdrop-blur-md shadow-subtle">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="h-8 w-8 rounded-lg bg-pilot-gold flex items-center justify-center text-obsidian font-bold font-whyte shadow-[0_0_10px_rgba(202,177,106,0.2)]">
              C
            </div>
            <span className="text-base font-light tracking-tight text-fog hidden md:inline font-whyte">
              Campus Complaint Management System
            </span>
            <span className="text-base font-light tracking-tight text-fog md:hidden font-whyte">
              CCMS
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-normal text-mist">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection("features")} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 font-medium">
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                to={user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="inline-flex h-9 items-center justify-center rounded-[var(--radius-buttons)] bg-pilot-gold px-5 text-xs font-medium text-obsidian shadow-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-medium text-mist hover:text-pilot-gold transition px-3 py-2 flex items-center gap-1.5"
                >
                  <FaSignInAlt size={12} /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-9 items-center justify-center rounded-[var(--radius-buttons)] bg-pilot-gold px-5 text-xs font-medium text-obsidian shadow-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION & GRADIENT MESH SHOWCASE */}
      <section className="relative overflow-hidden bg-obsidian py-20 sm:py-28">
        {/* Background Spotlight and Primitives */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-pilot-gold/5 to-transparent opacity-40 blur-[100px] pointer-events-none rounded-full" />
        
        {/* Scattered background geometric shapes (15% opacity, clipped edges) */}
        <svg className="absolute top-12 left-[10%] w-16 h-16 text-pilot-gold/15 rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="0,100 100,100 0,0" />
        </svg>
        <div className="absolute top-48 right-[8%] w-16 h-16 bg-circuit-green/15 rounded-tl-full pointer-events-none" />
        <svg className="absolute bottom-12 left-[15%] w-12 h-12 text-signal-red/15 -rotate-45 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="0,100 100,100 0,0" />
        </svg>
        <div className="absolute bottom-28 right-[12%] w-20 h-20 bg-pilot-gold/15 rounded-br-full pointer-events-none" />
        <div className="absolute top-[35%] left-[22%] w-4 h-4 bg-circuit-green/15 rotate-45 pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[var(--radius-badges)] text-[10px] font-medium font-circularxxmono tracking-[0.05em] bg-charcoal border border-charcoal text-pilot-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold animate-pulse" />
            UNIFIED CAMPUS HELPDESK
          </span>
          
          <h1 className="text-4xl font-light tracking-[-0.056em] text-fog sm:text-7xl max-w-3xl leading-[1.0] font-whyte">
            Campus Complaint <br />
            <span className="text-pilot-gold font-light">Management System</span>
          </h1>
          
          <p className="text-sm sm:text-base text-pebble leading-relaxed max-w-xl font-normal">
            A secure command center for student dispatch reports and operator resolution workflows. Built for high-efficiency operations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to={user ? (user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard") : "/register"}
              className="inline-flex h-11 items-center justify-center rounded-[var(--radius-buttons)] bg-pilot-gold px-6 text-sm font-medium text-obsidian shadow-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              Get Started <FaArrowRight className="ml-2" size={12} />
            </Link>
            <Link
              to={user ? (user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard") : "/login"}
              className="inline-flex h-11 items-center justify-center rounded-[var(--radius-buttons)] border border-slate bg-transparent text-fog px-6 text-sm font-normal hover:border-ash hover:bg-slate/10 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              Login
            </Link>
          </div>

          {/* Product showcase mockup frame */}
          <div className="w-full max-w-4xl pt-16 flex justify-center relative">
            <div className="relative w-full rounded-[var(--radius-cards)] border border-charcoal bg-graphite p-5 shadow-xl space-y-4 max-w-3xl scale-in animate-float">
              
              <div className="flex justify-between items-center pb-4 border-b border-charcoal/40">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-pilot-gold/40 border border-pilot-gold" />
                  <span className="h-3 w-3 rounded-full bg-ash/30 border border-ash" />
                  <span className="h-3 w-3 rounded-full bg-slate/30 border border-slate" />
                </div>
                {/* Monospaced Annotations tag */}
                <span className="text-[10px] font-medium font-circularxxmono tracking-[0.05em] text-mist bg-charcoal px-3 py-1 rounded-[var(--radius-badges)] border border-charcoal/40">
                  CONSOLE::LIVE_TICKETS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-charcoal p-3 rounded-[var(--radius-inputs)] border border-charcoal/30">
                  <span className="text-[9px] text-pebble font-semibold font-circularxxmono tracking-[0.05em] uppercase">Total</span>
                  <p className="text-xl font-light text-fog mt-1 font-whyte">42</p>
                </div>
                <div className="bg-charcoal p-3 rounded-[var(--radius-inputs)] border border-charcoal/30">
                  <span className="text-[9px] text-pilot-gold font-semibold font-circularxxmono tracking-[0.05em] uppercase">Active</span>
                  <p className="text-xl font-light text-fog mt-1 font-whyte">12</p>
                </div>
                <div className="bg-charcoal p-3 rounded-[var(--radius-inputs)] border border-charcoal/30">
                  <span className="text-[9px] text-mist font-semibold font-circularxxmono tracking-[0.05em] uppercase">Solved</span>
                  <p className="text-xl font-light text-fog mt-1 font-whyte">30</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center p-3 rounded-[var(--radius-inputs)] bg-charcoal/40 border border-charcoal/20 text-xs">
                  <span className="font-medium text-mist">Water Leakage in Hostel A</span>
                  <span className="inline-flex rounded-[var(--radius-badges)] border border-charcoal bg-charcoal px-2.5 py-0.5 text-[9px] font-circularxxmono tracking-[0.05em] text-pilot-gold">In Progress</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-[var(--radius-inputs)] bg-charcoal/40 border border-charcoal/20 text-xs">
                  <span className="font-medium text-mist">Library WiFi Unstable</span>
                  <span className="inline-flex rounded-[var(--radius-badges)] border border-charcoal bg-obsidian px-2.5 py-0.5 text-[9px] font-circularxxmono tracking-[0.05em] text-stone">Pending</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-[var(--radius-inputs)] bg-charcoal/40 border border-charcoal/20 text-xs">
                  <span className="font-medium text-mist">Classroom 302 Projector Fix</span>
                  <span className="inline-flex rounded-[var(--radius-badges)] border border-charcoal bg-graphite px-2.5 py-0.5 text-[9px] font-circularxxmono tracking-[0.05em] text-mist">Resolved</span>
                </div>
              </div>
            </div>

            {/* Floating Resolution Speed Badge */}
            <div className="absolute top-10 right-4 lg:right-20 bg-graphite text-fog rounded-[var(--radius-cards)] p-4 shadow-xl border border-charcoal hidden md:block max-w-44 text-left animate-fadeIn">
              <p className="text-[9px] font-medium text-pilot-gold font-circularxxmono tracking-[0.05em]">SLA STATS</p>
              <p className="text-lg font-light mt-1 text-fog font-whyte">94% Speed &uarr;</p>
              <p className="text-[10px] text-pebble mt-1 leading-normal">Resolving tickets in under 24 hours average.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARTNER LOGO STRIP */}
      <section className="py-12 border-t border-b border-charcoal/40 bg-obsidian">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-pebble font-circularxx">
            PROUDLY SUPPORTED BY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 text-xs font-circularxxmono tracking-[0.05em] text-mist">
            <span className="opacity-60 hover:opacity-100 hover:text-pilot-gold transition">HOSTEL_COUNCIL</span>
            <span className="opacity-60 hover:opacity-100 hover:text-pilot-gold transition">FACILITIES_MGMT</span>
            <span className="opacity-60 hover:opacity-100 hover:text-pilot-gold transition">IT_SERVICES_UNIT</span>
            <span className="opacity-60 hover:opacity-100 hover:text-pilot-gold transition">LIBRARY_ADMIN</span>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION (REDESIGNED TO OBSIDIAN SYSTEM) */}
      <section id="features" className="py-20 sm:py-28 bg-obsidian text-fog relative">
        <div className="absolute top-1/3 right-[5%] w-16 h-16 bg-signal-red/15 rounded-tl-full pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxx">WHY CHOOSE CCMS?</span>
            <h2 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-5xl font-whyte">
              Engineered for seamless campus communication
            </h2>
            <p className="text-pebble text-sm leading-relaxed max-w-2xl mx-auto">
              Ditch the paper forms and unanswered emails. CCMS delivers a robust digital suite ensuring transparency and rapid accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-graphite border border-charcoal rounded-xl space-y-4 hover:-translate-y-0.5 transition duration-300">
              <div className="h-10 w-10 text-pilot-gold flex items-center justify-start">
                <FaClipboardList size={24} />
              </div>
              <h3 className="text-lg font-medium text-fog font-circularxx">Complaint Submission</h3>
              <p className="text-pebble text-sm leading-relaxed">
                Easily lodge complaints with descriptive details, exact campus locations, and designated utility categories.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-graphite border border-charcoal rounded-xl space-y-4 hover:-translate-y-0.5 transition duration-300">
              <div className="h-10 w-10 text-pilot-gold flex items-center justify-start">
                <FaClock size={24} />
              </div>
              <h3 className="text-lg font-medium text-fog font-circularxx">Real-Time Tracking</h3>
              <p className="text-pebble text-sm leading-relaxed">
                Monitor ticket states dynamically using progress indicators and timestamped operational logs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-graphite border border-charcoal rounded-xl space-y-4 hover:-translate-y-0.5 transition duration-300">
              <div className="h-10 w-10 text-pilot-gold flex items-center justify-start">
                <FaUserShield size={24} />
              </div>
              <h3 className="text-lg font-medium text-fog font-circularxx">Admin Dashboard</h3>
              <p className="text-pebble text-sm leading-relaxed">
                Advanced dispatch interface for operators to route tickets, pick priorities, and assign maintenance teams.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-graphite border border-charcoal rounded-xl space-y-4 hover:-translate-y-0.5 transition duration-300">
              <div className="h-10 w-10 text-pilot-gold flex items-center justify-start">
                <FaUpload size={24} />
              </div>
              <h3 className="text-lg font-medium text-fog font-circularxx">Image Upload</h3>
              <p className="text-pebble text-sm leading-relaxed">
                Attach photo evidence to assist facilities technicians and ensure quicker resolution accuracy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-graphite border border-charcoal rounded-xl space-y-4 hover:-translate-y-0.5 transition duration-300">
              <div className="h-10 w-10 text-pilot-gold flex items-center justify-start">
                <FaCommentAlt size={24} />
              </div>
              <h3 className="text-lg font-medium text-fog font-circularxx">Discussion & Comments</h3>
              <p className="text-pebble text-sm leading-relaxed">
                Communicate directly with resolution desks. Write updates or ask follow-up questions in-app.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-graphite border border-charcoal rounded-xl space-y-4 hover:-translate-y-0.5 transition duration-300">
              <div className="h-10 w-10 text-pilot-gold flex items-center justify-start">
                <FaLock size={24} />
              </div>
              <h3 className="text-lg font-medium text-fog font-circularxx">Secure Authentication</h3>
              <p className="text-pebble text-sm leading-relaxed">
                Restricted user boundaries using secure JSON Web Token verification, protecting privacy data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (REDESIGNED) */}
      <section className="py-20 sm:py-24 bg-obsidian text-fog border-y border-charcoal/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxx">THE ROADMAP</span>
            <h2 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-5xl font-whyte">
              How CCMS operates
            </h2>
            <p className="text-pebble text-sm max-w-md mx-auto">
              A transparent, simple protocol bridging reports straight to technical teams.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-graphite border border-charcoal text-pilot-gold flex items-center justify-center font-bold">
                <FaUserGraduate size={14} />
              </div>
              <h4 className="text-sm font-medium text-fog">1. Student Login</h4>
              <p className="text-xs text-pebble max-w-xs leading-relaxed">
                Log into the student portal using secure credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-graphite border border-charcoal text-pilot-gold flex items-center justify-center font-bold">
                <FaClipboardList size={14} />
              </div>
              <h4 className="text-sm font-medium text-fog">2. Submit Complaint</h4>
              <p className="text-xs text-pebble max-w-xs leading-relaxed">
                Fill details, pick location, add category, and upload photos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-graphite border border-charcoal text-pilot-gold flex items-center justify-center font-bold">
                <FaUserShield size={14} />
              </div>
              <h4 className="text-sm font-medium text-fog">3. Admin Reviews</h4>
              <p className="text-xs text-pebble max-w-xs leading-relaxed">
                Operators evaluate issues and assign maintenance departments.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-graphite border border-charcoal text-pilot-gold flex items-center justify-center font-bold">
                <FaClock size={14} />
              </div>
              <h4 className="text-sm font-medium text-fog">4. Status Updated</h4>
              <p className="text-xs text-pebble max-w-xs leading-relaxed">
                Ticket moves to In Progress with estimates and remarks.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-graphite border border-charcoal text-pilot-gold flex items-center justify-center font-bold">
                <FaCheckCircle size={14} />
              </div>
              <h4 className="text-sm font-medium text-fog">5. Complaint Resolved</h4>
              <p className="text-xs text-pebble max-w-xs leading-relaxed">
                Repairs finished. Student is informed, and tickets are locked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DASHBOARD PREVIEW (OBSIDIAN REDESIGNED) */}
      <section className="py-20 sm:py-28 bg-obsidian text-fog">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxx">THE INTERFACES</span>
            <h2 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-5xl font-whyte">
              Powering both sides of the system
            </h2>
            <p className="text-pebble text-sm leading-relaxed">
              Explore mock interfaces of our tailored layouts built for students and operators.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Student Preview Card */}
            <div className="rounded-[var(--radius-cards)] bg-graphite border border-charcoal p-8 flex flex-col justify-between hover:-translate-y-0.5 transition duration-300">
              <div>
                <span className="text-[10px] font-semibold font-circularxxmono tracking-[0.05em] uppercase text-pilot-gold bg-charcoal px-2.5 py-1 rounded-full">
                  Student Portal
                </span>
                <h3 className="text-2xl font-medium text-fog mt-4 font-circularxx">Student Dashboard</h3>
                <p className="text-pebble text-sm leading-relaxed mt-2">
                  Submit new reports, track status percentages, read rotating support advice, and view feedback threads in one place.
                </p>

                {/* Mockup component */}
                <div className="mt-8 p-5 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal/40 space-y-3 text-xs">
                  <div className="flex justify-between items-center font-semibold text-pebble text-[9px] font-circularxxmono">
                    <span>MY TICKET PROGRESS</span>
                    <span>66%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-obsidian overflow-hidden">
                    <div className="h-full w-2/3 bg-pilot-gold rounded-full" />
                  </div>
                  <div className="flex justify-between text-[9px] text-pebble font-medium font-circularxxmono">
                    <span>Pending</span>
                    <span className="text-pilot-gold font-bold">In Progress</span>
                    <span>Resolved</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-charcoal/40 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-medium text-pebble">Supports: Submission, Comments, Tracking</span>
                <Link to="/register" className="text-xs font-bold text-pilot-gold hover:underline flex items-center gap-1">
                  Create Student Account &rarr;
                </Link>
              </div>
            </div>

            {/* Admin Preview Card */}
            <div className="rounded-[var(--radius-cards)] bg-graphite border border-charcoal p-8 flex flex-col justify-between hover:-translate-y-0.5 transition duration-300">
              <div>
                <span className="text-[10px] font-semibold font-circularxxmono tracking-[0.05em] uppercase text-mist bg-charcoal px-2.5 py-1 rounded-full">
                  Operations Console
                </span>
                <h3 className="text-2xl font-medium text-fog mt-4 font-circularxx">Admin Dashboard</h3>
                <p className="text-pebble text-sm leading-relaxed mt-2">
                  Assign complaints directly to target departments, pick priority urgency, set estimation target dates, and leave resolution remarks.
                </p>

                {/* Mockup component */}
                <div className="mt-8 p-5 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal/40 space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3 font-circularxx">
                    <div>
                      <span className="text-[9px] font-semibold text-pebble uppercase font-circularxxmono">DEPT</span>
                      <div className="mt-1 bg-graphite p-1.5 border border-charcoal rounded-md text-[11px] font-medium text-fog">IT Support</div>
                    </div>
                    <div>
                      <span className="text-[9px] font-semibold text-pebble uppercase font-circularxxmono">PRIORITY</span>
                      <div className="mt-1 bg-graphite p-1.5 border border-charcoal rounded-md text-[11px] font-medium text-pilot-gold">🔴 High</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-charcoal/40 flex items-center justify-between flex-wrap gap-2">
                <span className="text-[11px] font-medium text-pebble">Supports: Assignments, Estimations, Remarks</span>
                <Link to="/login" className="text-xs font-bold text-pilot-gold hover:underline flex items-center gap-1">
                  Access Portal &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STATISTICS SECTION */}
      <section className="py-20 bg-obsidian text-fog relative border-y border-charcoal/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-light font-whyte">
                <StatCounter target="500" suffix="+" />
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-pebble font-circularxx">
                Complaints Submitted
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-light font-whyte">
                <StatCounter target="350" suffix="+" />
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-pebble font-circularxx">
                Resolved Issues
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-light font-whyte">
                <StatCounter target="200" suffix="+" />
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-pebble font-circularxx">
                Students Enrolled
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-light font-whyte">
                <StatCounter target="10" suffix="+" />
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-pebble font-circularxx">
                Departments Assigned
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 8. BENEFITS SECTION */}
      <section id="about" className="py-20 sm:py-28 bg-obsidian text-fog">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxx">THE VALUE</span>
            <h2 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-5xl font-whyte">
              Bringing value to every tier
            </h2>
            <p className="text-pebble text-sm leading-relaxed">
              Transparency, speed, and organizational structure across the entire institution.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* For Students */}
            <div className="rounded-[var(--radius-cards)] bg-graphite border border-charcoal p-8 flex flex-col justify-between hover:shadow-subtle transition">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-charcoal border border-charcoal/40 text-pilot-gold rounded-[var(--radius-inputs)] flex items-center justify-center font-bold">
                  S
                </div>
                <h3 className="text-xl font-medium text-fog font-circularxx">For Students</h3>
                <ul className="space-y-3 text-sm text-pebble">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Easy complaint submission
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Track progress in real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Receive comments and updates
                  </li>
                </ul>
              </div>
            </div>

            {/* For Administrators */}
            <div className="rounded-[var(--radius-cards)] bg-graphite border border-charcoal p-8 flex flex-col justify-between hover:shadow-subtle transition">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-charcoal border border-charcoal/40 text-pilot-gold rounded-[var(--radius-inputs)] flex items-center justify-center font-bold">
                  A
                </div>
                <h3 className="text-xl font-medium text-fog font-circularxx">For Administrators</h3>
                <ul className="space-y-3 text-sm text-pebble">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Manage complaints dynamically
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Assign priorities instantly
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Communicate directly with students
                  </li>
                </ul>
              </div>
            </div>

            {/* For Institution */}
            <div className="rounded-[var(--radius-cards)] bg-graphite border border-charcoal p-8 flex flex-col justify-between hover:shadow-subtle transition">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-charcoal border border-charcoal/40 text-pilot-gold rounded-[var(--radius-inputs)] flex items-center justify-center font-bold">
                  I
                </div>
                <h3 className="text-xl font-medium text-fog font-circularxx">For Institution</h3>
                <ul className="space-y-3 text-sm text-pebble">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Transparency in campus processes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Better SLA response times
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-pilot-gold" />
                    Organized complaint handling logs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-20 sm:py-28 bg-obsidian text-fog border-t border-charcoal/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12 font-circularxx">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxx">FAQ</span>
            <h2 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-5xl font-whyte">
              Frequently Asked Questions
            </h2>
            <p className="text-pebble text-sm">
              Quick answers about lodging, tracking, and completing tickets.
            </p>
          </div>

          <div className="space-y-4">
            <div className="border border-charcoal rounded-[var(--radius-cards)] bg-graphite overflow-hidden transition-all duration-200">
              <FaqItem
                question="How do I submit a complaint?"
                answer="Log in with your Student account credentials, select 'New Complaint' from your navigation panel, fill out the category details and exact campus location description, and click submit."
              />
            </div>
            <div className="border border-charcoal rounded-[var(--radius-cards)] bg-graphite overflow-hidden transition-all duration-200">
              <FaqItem
                question="Can I upload images?"
                answer="Yes. When submitting a complaint, students can attach photo logs of maintenance and technical problems. The images are stored securely and displayed for facilities supervisors to reference."
              />
            </div>
            <div className="border border-charcoal rounded-[var(--radius-cards)] bg-graphite overflow-hidden transition-all duration-200">
              <FaqItem
                question="Can I track complaint status?"
                answer="Yes! Students can select any complaint they own from their Dashboard to check live progress percentages moving from Pending -> In Progress -> Resolved."
              />
            </div>
            <div className="border border-charcoal rounded-[var(--radius-cards)] bg-graphite overflow-hidden transition-all duration-200">
              <FaqItem
                question="How does the admin respond?"
                answer="Administrators access their dispatch panel, route the report to appropriate departments, set targets, record internal remarks, and leave comments inside the complaint thread for student queries."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION */}
      <section className="py-20 bg-obsidian text-fog relative border-t border-charcoal/40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-pilot-gold/5 opacity-20 blur-[80px] pointer-events-none rounded-full" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-light tracking-[-0.04em] sm:text-5xl leading-tight font-whyte">
            Improve Campus Operations Today
          </h2>
          <p className="text-pebble text-sm max-w-xl mx-auto leading-relaxed">
            Create an account or login to start tracking, managing, and resolving campus complaints on a unified portal.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="inline-flex h-11 items-center justify-center rounded-[var(--radius-buttons)] bg-pilot-gold text-obsidian px-6 text-sm font-medium shadow-sm hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer border-transparent"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="inline-flex h-11 items-center justify-center rounded-[var(--radius-buttons)] border border-slate bg-transparent text-fog px-6 text-sm font-normal hover:border-ash hover:bg-slate/10 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer id="contact" className="bg-obsidian border-t border-charcoal/40 text-ash py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-fog">
              <div className="h-7 w-7 rounded-lg bg-pilot-gold flex items-center justify-center font-bold text-obsidian shadow-[0_0_8px_rgba(202,177,106,0.15)]">
                C
              </div>
              <span className="text-sm font-medium tracking-tight font-whyte">CCMS</span>
            </div>
            <p className="text-xs text-pebble leading-relaxed">
              Designed for Campus Complaint Management. Efficiently routing issues straight to resolutions.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-fog mb-4 font-circularxxmono">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 p-0 text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("features")} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 p-0 text-left">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-pilot-gold transition cursor-pointer bg-transparent border-0 p-0 text-left">
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-fog mb-4 font-circularxxmono">Features</h4>
            <ul className="space-y-2 text-xs text-pebble">
              <li>Real-time Progress</li>
              <li>Secure Verification</li>
              <li>Remarks & Timeline Logs</li>
              <li>Comments System</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.08em] text-fog mb-4 font-circularxxmono">Contact & Support</h4>
            <ul className="space-y-2 text-xs text-pebble">
              <li>ccms-support@campus.edu</li>
              <li>Office of Maintenance & Infrastructure</li>
              <li className="pt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-pilot-gold transition text-mist"
                >
                  <FaGithub size={12} /> GitHub Project
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-charcoal/20 flex justify-between items-center text-[10px] text-stone">
          <span>&copy; {new Date().getFullYear()} CCMS. All rights reserved.</span>
          <span>Designed for Campus Complaint Management</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
