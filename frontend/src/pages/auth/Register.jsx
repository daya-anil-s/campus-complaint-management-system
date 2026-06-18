import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaUserGraduate, FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Button } from "../../components/ui";

function Register() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  const inputWrap =
    "flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-blue-100";
  const input =
    "w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#2563EB]">
          <FaUserGraduate className="text-xl" />
        </div>

        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Secure Portal
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Create Account
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Create your student or administrator account.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              role === "student"
                ? "bg-white text-[#2563EB] shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <FaUserGraduate />
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              role === "admin"
                ? "bg-white text-[#2563EB] shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
          >
            <FaUserShield />
            Admin
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <div className={inputWrap}>
              <FaUser className="text-slate-400" />
              <input type="text" placeholder="Enter your full name" className={input} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <div className={inputWrap}>
              <MdEmail className="text-slate-400" />
              <input
                type="email"
                placeholder={
                  role === "student" ? "student@campus.edu" : "admin@campus.edu"
                }
                className={input}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className={inputWrap}>
              <RiLockPasswordLine className="text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 transition hover:text-[#2563EB]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm Password
            </label>
            <div className={inputWrap}>
              <RiLockPasswordLine className="text-slate-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={input}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-slate-400 transition hover:text-[#2563EB]"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <IoEyeOutline size={20} />
                ) : (
                  <IoEyeOffOutline size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button onClick={handleRegister} className="mt-6 w-full">
          Create Account
        </Button>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-slate-200" />
          <span className="px-3 text-sm text-slate-500">Already registered?</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        <p className="text-center text-sm text-slate-600">
          <Link
            to="/"
            className="font-semibold text-[#2563EB] no-underline hover:underline"
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
