import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Button } from "../../components/ui";
import axios from "axios";
import { useToast } from "../../components/toastContext";

function Login() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const handleLogin = async (event) => {
  event.preventDefault();

  let valid = true;

  setEmailError("");
  setPasswordError("");

  if (!email.trim()) {
    setEmailError("Email is required");
    valid = false;
  }

  if (!password.trim()) {
    setPasswordError("Password is required");
    valid = false;
  }

  if (!valid) return;

  setIsLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:3001/api/users/login",
      {
        email,
        password,
      }
    );

    // Save JWT Token
    localStorage.setItem("token", response.data.token);

    // Save User Details
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    showSuccess(response.data.message);

    // Redirect based on role
    if (response.data.user.role === "Student") {
      navigate("/student/dashboard");
    } else {
      navigate("/admin/dashboard");
    }

  } catch (error) {
  if (error.response) {
    setPasswordError(error.response.data.message);
  } else {
    setPasswordError("Server not responding");
  }
} finally {
    setIsLoading(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <section className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Secure Portal
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {role === "student"
              ? "Sign in with your student account to continue."
              : "Sign in with your administrator account to continue."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              role === "student"
                ? "bg-white text-[#2563EB] shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
            onClick={() => setRole("student")}
          >
            <FaUserGraduate />
            Student
          </button>
          <button
            type="button"
            className={`flex h-11 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
              role === "admin"
                ? "bg-white text-[#2563EB] shadow-sm"
                : "text-slate-600 hover:text-slate-950"
            }`}
            onClick={() => setRole("admin")}
          >
            <FaUserShield />
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email address
            </label>
            <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-blue-100">
              <MdEmail className="text-slate-400" size={20} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === "student" ? "student@campus.edu" : "admin@campus.edu"
                }
                className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            {emailError && (
              <p className="mt-2 text-sm font-medium text-[#2563EB]">{emailError}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-blue-100">
              <RiLockPasswordLine className="text-slate-400" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="text-slate-400 transition hover:text-[#2563EB]"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="mt-2 text-sm font-medium text-[#2563EB]">
                {passwordError}
              </p>
            )}
          </div>
          </div>

          <div className="my-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 accent-[#2563EB]"
              />
              Remember me
            </label>
            <a href="#" className="font-semibold text-[#2563EB] no-underline hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? "Signing In..."
              : role === "student"
                ? "Student Sign In"
                : "Admin Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {role === "student" ? (
            <>
              New Student?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#2563EB] no-underline hover:underline"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              Need Admin Access?{" "}
              <span className="font-semibold text-slate-900">Contact System Admin</span>
            </>
          )}
        </p>
      </section>
    </main>
  );
}

export default Login;
