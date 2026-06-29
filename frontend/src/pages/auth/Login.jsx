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
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-4 py-10 relative overflow-hidden font-circularxx">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pilot-gold/5 opacity-20 blur-[100px] pointer-events-none rounded-full" />
      
      <section className="w-full max-w-md rounded-[var(--radius-cards)] border border-charcoal bg-graphite p-6 shadow-xl sm:p-8 relative z-10 scale-in">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxxmono">
            Secure Portal
          </p>
          <h1 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-4xl font-whyte">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-pebble">
            {role === "student"
              ? "Sign in with your student account to continue."
              : "Sign in with your administrator account to continue."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal p-1">
          <button
            type="button"
            className={`flex h-10 items-center justify-center gap-2 rounded-[var(--radius-buttons)] text-xs font-medium tracking-wide transition cursor-pointer border-transparent ${
              role === "student"
                ? "bg-pilot-gold text-obsidian font-medium shadow-sm"
                : "text-mist hover:text-fog"
            }`}
            onClick={() => setRole("student")}
          >
            <FaUserGraduate size={13} />
            Student
          </button>
          <button
            type="button"
            className={`flex h-10 items-center justify-center gap-2 rounded-[var(--radius-buttons)] text-xs font-medium tracking-wide transition cursor-pointer border-transparent ${
              role === "admin"
                ? "bg-pilot-gold text-obsidian font-medium shadow-sm"
                : "text-mist hover:text-fog"
            }`}
            onClick={() => setRole("admin")}
          >
            <FaUserShield size={13} />
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
                Email address
              </label>
              <div className="flex h-12 items-center gap-3 rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 transition focus-within:border-slate focus-within:ring-1 focus-within:ring-slate/20">
                <MdEmail className="text-stone" size={18} />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    role === "student" ? "student@campus.edu" : "admin@campus.edu"
                  }
                  className="w-full border-0 bg-transparent text-sm text-fog outline-none placeholder:text-stone/70"
                />
              </div>
              {emailError && (
                <p className="mt-2 text-xs font-medium text-signal-red font-circularxxmono">{emailError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
                Password
              </label>
              <div className="flex h-12 items-center gap-3 rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 transition focus-within:border-slate focus-within:ring-1 focus-within:ring-slate/20">
                <RiLockPasswordLine className="text-stone" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full border-0 bg-transparent text-sm text-fog outline-none placeholder:text-stone/70"
                />
                <button
                  type="button"
                  className="text-stone transition hover:text-pilot-gold cursor-pointer bg-transparent border-0"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-2 text-xs font-medium text-signal-red font-circularxxmono">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          <div className="my-6 flex flex-col gap-3 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4.5 w-4.5 rounded-[var(--radius-inputs)] border-charcoal bg-charcoal text-pilot-gold focus:ring-pilot-gold cursor-pointer"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="font-semibold text-pilot-gold no-underline hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
            {isLoading
              ? "Signing In..."
              : role === "student"
                ? "Student Sign In"
                : "Admin Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-pebble">
          {role === "student" ? (
            <>
              New Student?{" "}
              <Link
                to="/register"
                className="font-semibold text-pilot-gold no-underline hover:underline transition"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              Need Admin Access?{" "}
              <span className="font-semibold text-fog">Contact System Admin</span>
            </>
          )}
        </p>
      </section>
    </main>
  );
}

export default Login;
