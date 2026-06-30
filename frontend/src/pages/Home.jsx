import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import {
  FaArrowRight,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUserGraduate,
  FaUserShield,
  FaCommentAlt,
  FaUpload,
  FaChevronDown,
  FaLock,
  FaSignInAlt
} from "react-icons/fa";
import { Card } from "../components/ui";

function StatCounter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
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
    <span ref={elementRef} className="font-semibold text-bone font-index tracking-[0.0050em]">
      {count}
      {suffix}
    </span>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-iris-border rounded-[12px] bg-slate-indigo overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-bone hover:text-[#ff8a76] transition font-index"
      >
        <span>{question}</span>
        <FaChevronDown
          className={`text-smoke transition-transform duration-200 ${
            isOpen ? "transform rotate-180 text-ember-coral" : ""
          }`}
          size={12}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 border-t border-iris-border" : "max-h-0"
        } overflow-hidden`}
      >
        <p className="p-5 text-[15px] text-smoke leading-relaxed bg-carbon-iris/60 font-inter">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const user = getCurrentUser();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <div className="min-h-screen bg-midnight-indigo text-bone font-inter antialiased relative overflow-hidden pb-20">
      
      {/* 1. FLOATING FROSTED NAVIGATION BAR */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sticky top-0 z-50">
        <header className="rounded-[30px] border border-iris-border bg-slate-indigo/60 backdrop-blur-md h-12 flex items-center justify-between px-4 sm:px-6 shadow-sm-2">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] flex items-center justify-center text-bone font-bold font-index text-sm">
              C
            </div>
            <span className="text-sm font-semibold tracking-[0.0050em] text-bone font-index">
              CCMS
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-ash">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-bone transition cursor-pointer bg-transparent border-0 font-medium">
              Home
            </button>
            <button onClick={() => scrollToSection("features")} className="hover:text-bone transition cursor-pointer bg-transparent border-0 font-medium">
              Features
            </button>
            <button onClick={() => scrollToSection("about")} className="hover:text-bone transition cursor-pointer bg-transparent border-0 font-medium">
              About
            </button>
            <button onClick={() => scrollToSection("faq")} className="hover:text-bone transition cursor-pointer bg-transparent border-0 font-medium">
              FAQs
            </button>
          </nav>

          <div className="flex items-center gap-2">
            {user ? (
              <Link
                to={user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard"}
                className="inline-flex h-8 items-center justify-center rounded-[30px] bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] px-4 text-xs font-medium text-bone hover:brightness-110 active:scale-[0.98] transition cursor-pointer font-index"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-medium text-ash hover:text-bone transition px-2.5 py-1.5 flex items-center gap-1.5 font-inter"
                >
                  <FaSignInAlt size={12} /> Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-8 items-center justify-center rounded-[30px] bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] px-4 text-xs font-medium text-bone hover:brightness-110 active:scale-[0.98] transition cursor-pointer font-index"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </header>
      </div>

      {/* 2. HERO SECTION WITH TWILIGHT HORIZON LANDSCAPE */}
      <section className="relative pt-12 pb-24 sm:pb-32 overflow-hidden flex flex-col items-center">
        {/* Mountain horizon gradient landscape */}
        <div className="absolute inset-x-0 bottom-0 h-[380px] pointer-events-none z-0 opacity-40">
          <svg className="w-full h-full text-[#4859eb]" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#02e5ef" stopOpacity="0.4" />
                <stop offset="71.5%" stopColor="#4859eb" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8a38f4" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Mountain peak horizon silhouette */}
            <path
              d="M0,240 L180,180 L360,260 L540,150 L720,280 L900,120 L1080,220 L1260,160 L1440,260 L1440,320 L0,320 Z"
              fill="url(#skyGrad)"
            />
            <path
              d="M0,260 L240,210 L480,290 L720,200 L960,310 L1200,220 L1440,280 L1440,320 L0,320 Z"
              fill="#04061c"
              opacity="0.9"
            />
          </svg>
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[#665eff]/10 to-transparent opacity-30 blur-[80px] pointer-events-none rounded-full" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-8 z-10 pt-12">
          {/* Announcement Eyebrow Badge */}
          <div className="rounded-[30px] border border-iris-border bg-slate-indigo/50 text-[13px] text-ash font-medium px-4 py-1 font-inter">
            UNIFIED CAMPUS HELPDESK
          </div>
          
          <h1 className="text-4xl font-semibold tracking-[0.0030em] text-bone sm:text-7xl max-w-3xl leading-[1.2] font-index">
            Campus Complaint <br />
            <span className="bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] bg-clip-text text-transparent font-semibold">Management System</span>
          </h1>
          
          <p className="text-[15px] leading-[1.6] text-smoke max-w-xl font-normal">
            A Twilight Command Center engineered for campus dispatch ticketing, status tracking, and operator resolution logs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to={user ? (user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard") : "/register"}
              className="inline-flex h-10 items-center justify-center rounded-[30px] bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] px-6 text-[15px] font-medium text-bone hover:brightness-110 active:scale-[0.98] transition cursor-pointer font-index border-transparent"
            >
              Get Started <FaArrowRight className="ml-2" size={12} />
            </Link>
            <Link
              to={user ? (user.role === "Admin" ? "/admin/dashboard" : "/student/dashboard") : "/login"}
              className="inline-flex h-10 items-center justify-center rounded-[30px] border border-steel bg-transparent text-bone px-6 text-[15px] font-medium hover:bg-twilight-plum/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer font-index"
            >
              Login
            </Link>
          </div>

          {/* Product Window Frame Showcase */}
          <div className="w-full max-w-4xl pt-16 flex justify-center relative">
            <div className="relative w-full rounded-[12px] border border-iris-border bg-slate-indigo p-5 shadow-xl space-y-4 max-w-3xl scale-in animate-float">
              
              {/* macOS Traffic Lights chrome */}
              <div className="flex justify-between items-center pb-4 border-b border-iris-border/40">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff3a63]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffcd48]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffff00]" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.165px] text-smoke bg-carbon-iris px-3 py-1 rounded-[30px] border border-graphite">
                  CONSOLE::LIVE_TICKETS
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-carbon-iris p-3 rounded-[6px] border border-graphite">
                  <span className="text-[11px] text-smoke font-medium font-index tracking-[0.165px] uppercase">Total</span>
                  <p className="text-xl font-semibold text-bone mt-1 font-index tracking-[0.0150em]">42</p>
                </div>
                <div className="bg-carbon-iris p-3 rounded-[6px] border border-graphite">
                  <span className="text-[11px] text-[#0067ff] font-medium font-index tracking-[0.165px] uppercase">Active</span>
                  <p className="text-xl font-semibold text-bone mt-1 font-index tracking-[0.0150em]">12</p>
                </div>
                <div className="bg-carbon-iris p-3 rounded-[6px] border border-graphite">
                  <span className="text-[11px] text-[#ffff00] font-medium font-index tracking-[0.165px] uppercase">Solved</span>
                  <p className="text-xl font-semibold text-bone mt-1 font-index tracking-[0.0150em]">30</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center p-3 rounded-[6px] bg-carbon-iris border border-graphite text-xs">
                  <span className="font-normal text-bone">Water Leakage in Hostel A</span>
                  <span className="inline-flex items-center gap-1 rounded-[30px] border border-electric-blue bg-electric-blue/5 text-electric-blue px-2.5 py-0.5 text-[11px] font-medium">
                    <span className="h-1 w-1 rounded-full bg-electric-blue" />
                    In Progress
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-[6px] bg-carbon-iris border border-graphite text-xs">
                  <span className="font-normal text-bone">Library WiFi Unstable</span>
                  <span className="inline-flex items-center gap-1 rounded-[30px] border border-ember-coral bg-ember-coral/5 text-ember-coral px-2.5 py-0.5 text-[11px] font-medium">
                    <span className="h-1 w-1 rounded-full bg-ember-coral" />
                    Pending
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-[6px] bg-carbon-iris border border-graphite text-xs">
                  <span className="font-normal text-bone">Classroom 302 Projector Fix</span>
                  <span className="inline-flex items-center gap-1 rounded-[30px] border border-chartreuse bg-chartreuse/5 text-chartreuse px-2.5 py-0.5 text-[11px] font-medium">
                    <span className="h-1 w-1 rounded-full bg-chartreuse" />
                    Resolved
                  </span>
                </div>
              </div>
            </div>

            {/* Floating SLA Badge */}
            <div className="absolute top-10 right-4 lg:right-20 bg-slate-indigo text-bone rounded-[12px] p-4 shadow-xl border border-iris-border hidden md:block max-w-44 text-left animate-fadeIn">
              <p className="text-[11px] font-semibold text-arc-violet font-index tracking-[0.165px] uppercase">SLA STATS</p>
              <p className="text-lg font-semibold mt-1 text-bone font-index">94% Speed &uarr;</p>
              <p className="text-xs text-smoke mt-1 leading-normal font-inter">Resolving tickets in under 24 hours average.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SUPPORTED TILES STRIP */}
      <section className="py-10 border-t border-b border-iris-border bg-midnight-indigo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.165px] text-smoke font-index">
            PROUDLY SUPPORTED BY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 text-[13px] font-medium tracking-[0.05em] text-ash">
            <span className="opacity-60 hover:opacity-100 hover:text-bone transition duration-150">HOSTEL_COUNCIL</span>
            <span className="opacity-60 hover:opacity-100 hover:text-bone transition duration-150">FACILITIES_MGMT</span>
            <span className="opacity-60 hover:opacity-100 hover:text-bone transition duration-150">IT_SERVICES_UNIT</span>
            <span className="opacity-60 hover:opacity-100 hover:text-bone transition duration-150">LIBRARY_ADMIN</span>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION (3-COLUMN GRID IN SLATE INDIGO CARDS) */}
      <section id="features" className="py-20 sm:py-24 bg-midnight-indigo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.165px] text-arc-violet font-index">WHY CHOOSE CCMS?</span>
            <h2 className="text-3xl font-semibold tracking-[0.0050em] text-bone sm:text-5xl font-index leading-tight">
              Engineered for seamless campus communication
            </h2>
            <p className="text-smoke text-[15px] leading-[1.6] max-w-2xl mx-auto font-inter">
              CCMS delivers a modern digital suite that connects students with administrative resolution desks rapidly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-8 bg-slate-indigo border border-iris-border rounded-[20px] space-y-4 hover:-translate-y-0.5 transition duration-300 shadow-sm">
              <div className="h-10 w-10 text-[#ff8a76] flex items-center justify-center bg-carbon-iris p-2.5 rounded-[6px] border border-graphite">
                <FaClipboardList size={16} />
              </div>
              <h3 className="text-lg font-semibold text-bone font-index">Complaint Submission</h3>
              <p className="text-smoke text-[15px] leading-[1.6]">
                Easily lodge complaints with descriptive details, exact campus locations, and designated utility categories.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-slate-indigo border border-iris-border rounded-[20px] space-y-4 hover:-translate-y-0.5 transition duration-300 shadow-sm">
              <div className="h-10 w-10 text-electric-blue flex items-center justify-center bg-carbon-iris p-2.5 rounded-[6px] border border-graphite">
                <FaClock size={16} />
              </div>
              <h3 className="text-lg font-semibold text-bone font-index">Real-Time Tracking</h3>
              <p className="text-smoke text-[15px] leading-[1.6]">
                Monitor ticket states dynamically using progress indicators and timestamped operational logs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-slate-indigo border border-iris-border rounded-[20px] space-y-4 hover:-translate-y-0.5 transition duration-300 shadow-sm">
              <div className="h-10 w-10 text-arc-violet flex items-center justify-center bg-carbon-iris p-2.5 rounded-[6px] border border-graphite">
                <FaUserShield size={16} />
              </div>
              <h3 className="text-lg font-semibold text-bone font-index">Admin Dashboard</h3>
              <p className="text-smoke text-[15px] leading-[1.6]">
                Advanced dispatch interface for operators to route tickets, pick priorities, and assign maintenance teams.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-slate-indigo border border-iris-border rounded-[20px] space-y-4 hover:-translate-y-0.5 transition duration-300 shadow-sm">
              <div className="h-10 w-10 text-[#ff8a76] flex items-center justify-center bg-carbon-iris p-2.5 rounded-[6px] border border-graphite">
                <FaUpload size={16} />
              </div>
              <h3 className="text-lg font-semibold text-bone font-index">Image Evidence</h3>
              <p className="text-smoke text-[15px] leading-[1.6]">
                Attach photo evidence to assist facilities technicians and ensure quicker resolution accuracy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-slate-indigo border border-iris-border rounded-[20px] space-y-4 hover:-translate-y-0.5 transition duration-300 shadow-sm">
              <div className="h-10 w-10 text-electric-blue flex items-center justify-center bg-carbon-iris p-2.5 rounded-[6px] border border-graphite">
                <FaCommentAlt size={16} />
              </div>
              <h3 className="text-lg font-semibold text-bone font-index">Discussion Log</h3>
              <p className="text-smoke text-[15px] leading-[1.6]">
                Communicate directly with resolution desks. Write updates or ask follow-up questions in-app.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-slate-indigo border border-iris-border rounded-[20px] space-y-4 hover:-translate-y-0.5 transition duration-300 shadow-sm">
              <div className="h-10 w-10 text-arc-violet flex items-center justify-center bg-carbon-iris p-2.5 rounded-[6px] border border-graphite">
                <FaLock size={16} />
              </div>
              <h3 className="text-lg font-semibold text-bone font-index">Role Security</h3>
              <p className="text-smoke text-[15px] leading-[1.6]">
                Restricted user boundaries using secure JSON Web Token verification, protecting privacy data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROCESS WORKFLOW ROADMAP */}
      <section id="about" className="py-20 sm:py-24 bg-midnight-indigo border-y border-iris-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.165px] text-arc-violet font-index">THE ROADMAP</span>
            <h2 className="text-3xl font-semibold tracking-[0.0050em] text-bone sm:text-5xl font-index">
              How CCMS operates
            </h2>
            <p className="text-smoke text-[15px] max-w-md mx-auto font-inter">
              A transparent, simple protocol bridging reports straight to technical teams.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-slate-indigo border border-iris-border text-[#ff8a76] flex items-center justify-center font-bold">
                <FaUserGraduate size={14} />
              </div>
              <h4 className="text-[15px] font-semibold text-bone font-index">1. Student Login</h4>
              <p className="text-xs text-smoke max-w-xs leading-relaxed">
                Log into the student portal using secure credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-slate-indigo border border-iris-border text-electric-blue flex items-center justify-center font-bold">
                <FaClipboardList size={14} />
              </div>
              <h4 className="text-[15px] font-semibold text-bone font-index">2. Submit Complaint</h4>
              <p className="text-xs text-smoke max-w-xs leading-relaxed">
                Fill details, pick location, add category, and upload photos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-slate-indigo border border-iris-border text-arc-violet flex items-center justify-center font-bold">
                <FaUserShield size={14} />
              </div>
              <h4 className="text-[15px] font-semibold text-bone font-index">3. Admin Reviews</h4>
              <p className="text-xs text-smoke max-w-xs leading-relaxed">
                Operators evaluate issues and assign maintenance departments.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-slate-indigo border border-iris-border text-electric-blue flex items-center justify-center font-bold">
                <FaClock size={14} />
              </div>
              <h4 className="text-[15px] font-semibold text-bone font-index">4. Status Updated</h4>
              <p className="text-xs text-smoke max-w-xs leading-relaxed">
                Ticket moves to In Progress with estimates and remarks.
              </p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-11 w-11 rounded-full bg-slate-indigo border border-iris-border text-[#ffff00] flex items-center justify-center font-bold">
                <FaCheckCircle size={14} />
              </div>
              <h4 className="text-[15px] font-semibold text-bone font-index">5. Resolved</h4>
              <p className="text-xs text-smoke max-w-xs leading-relaxed">
                Repairs finished. Student is informed, and tickets are locked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATISTICS ROW */}
      <section className="py-20 bg-midnight-indigo text-bone relative border-b border-iris-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-semibold font-index">
                <StatCounter target="500" suffix="+" />
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.165px] text-smoke font-index">
                Complaints Submitted
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-semibold font-index">
                <StatCounter target="350" suffix="+" />
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.165px] text-smoke font-index">
                Resolved Issues
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-semibold font-index">
                <StatCounter target="200" suffix="+" />
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.165px] text-smoke font-index">
                Students Enrolled
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-semibold font-index">
                <StatCounter target="10" suffix="+" />
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.165px] text-smoke font-index">
                Departments Assigned
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDIONS */}
      <section id="faq" className="py-20 sm:py-24 bg-midnight-indigo">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.165px] text-arc-violet font-index">FAQ</span>
            <h2 className="text-3xl font-semibold tracking-[0.0050em] text-bone sm:text-5xl font-index">
              Frequently Asked Questions
            </h2>
            <p className="text-smoke text-[15px] font-inter">
              Quick answers about lodging, tracking, and completing tickets.
            </p>
          </div>

          <div className="space-y-4">
            <FaqItem
              question="How do I submit a complaint?"
              answer="Log in with your Student account credentials, select 'Submit Complaint' from your navigation panel, fill out the category details and exact campus location description, and click submit."
            />
            <FaqItem
              question="Can I upload images?"
              answer="Yes. When submitting a complaint, students can attach photo logs of maintenance and technical problems. The images are stored securely and displayed for facilities supervisors to reference."
            />
            <FaqItem
              question="Can I track complaint status?"
              answer="Yes! Students can select any complaint they own from their Dashboard to check live progress tags moving from Pending -> In Progress -> Resolved."
            />
            <FaqItem
              question="How does the admin respond?"
              answer="Administrators access their dispatch panel, route the report to appropriate departments, set targets, record internal remarks, and leave comments inside the complaint thread for student queries."
            />
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="py-20 bg-midnight-indigo relative border-t border-iris-border overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ember-coral/5 opacity-20 blur-[80px] pointer-events-none rounded-full" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-semibold tracking-[0.0050em] sm:text-5xl leading-tight font-index">
            Improve Campus Operations Today
          </h2>
          <p className="text-smoke text-[15px] max-w-xl mx-auto leading-relaxed">
            Create an account or login to start tracking, managing, and resolving campus complaints on a unified portal.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/register"
              className="inline-flex h-10 items-center justify-center rounded-[30px] bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] text-bone px-6 text-[15px] font-medium hover:brightness-110 active:scale-[0.98] transition cursor-pointer border-transparent font-index"
            >
              Register Now
            </Link>
            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-[30px] border border-steel bg-transparent text-bone px-6 text-[15px] font-medium hover:bg-twilight-plum/40 hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer font-index"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-midnight-indigo border-t border-iris-border text-smoke py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-bone">
              <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#ff8a76] to-[#ff3a63] flex items-center justify-center font-bold text-bone font-index text-sm">
                C
              </div>
              <span className="text-sm font-semibold tracking-[0.0050em] font-index">CCMS</span>
            </div>
            <p className="text-xs text-smoke leading-relaxed">
              Campus Complaint Management System. Routing issues straight to resolutions.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.165px] text-bone mb-4 font-index">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-bone transition cursor-pointer bg-transparent border-0 p-0 text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("features")} className="hover:text-bone transition cursor-pointer bg-transparent border-0 p-0 text-left">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("about")} className="hover:text-bone transition cursor-pointer bg-transparent border-0 p-0 text-left">
                  About
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.165px] text-bone mb-4 font-index">Features</h4>
            <ul className="space-y-2 text-xs text-smoke font-inter">
              <li>Real-time Progress</li>
              <li>Secure Verification</li>
              <li>Remarks & Timeline Logs</li>
              <li>Comments System</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.165px] text-bone mb-4 font-index">Support</h4>
            <ul className="space-y-2 text-xs text-smoke font-inter">
              <li>ccms-support@campus.edu</li>
              <li>Office of Maintenance</li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}
