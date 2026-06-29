import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaUserGraduate, FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Button } from "../../components/ui";
import { useToast } from "../../components/toastContext";

function Register() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { showSuccess } = useToast();

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Name, email, and password are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role === "student" ? "Student" : "Admin",
        }
      );

      showSuccess(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Server not responding.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputWrap =
    "flex h-12 items-center gap-3 rounded-[var(--radius-inputs)] border border-charcoal bg-charcoal px-4 transition focus-within:border-slate focus-within:ring-1 focus-within:ring-slate/20";
  const input =
    "w-full border-0 bg-transparent text-sm text-fog outline-none placeholder:text-stone/70";

  return (
    <main className="flex min-h-screen items-center justify-center bg-obsidian px-4 py-10 relative overflow-hidden font-circularxx">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-pilot-gold/5 opacity-20 blur-[100px] pointer-events-none rounded-full" />

      <section className="w-full max-w-md rounded-[var(--radius-cards)] border border-charcoal bg-graphite p-6 shadow-xl sm:p-8 relative z-10 scale-in">
        <div className="mb-8 text-center">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-pilot-gold font-circularxxmono">
            Secure Portal
          </p>
          <h1 className="text-3xl font-light tracking-[-0.04em] text-fog sm:text-4xl font-whyte">
            Create Account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-pebble">
            Create your student or administrator account.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 rounded-[var(--radius-inputs)] bg-charcoal border border-charcoal p-1">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex h-10 items-center justify-center gap-2 rounded-[var(--radius-buttons)] text-xs font-medium tracking-wide transition cursor-pointer border-transparent ${
              role === "student"
                ? "bg-pilot-gold text-obsidian font-medium shadow-sm"
                : "text-mist hover:text-fog"
            }`}
          >
            <FaUserGraduate size={13} />
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex h-10 items-center justify-center gap-2 rounded-[var(--radius-buttons)] text-xs font-medium tracking-wide transition cursor-pointer border-transparent ${
              role === "admin"
                ? "bg-pilot-gold text-obsidian font-medium shadow-sm"
                : "text-mist hover:text-fog"
            }`}
          >
            <FaUserShield size={13} />
            Admin
          </button>
        </div>

        <form onSubmit={handleRegister}>
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
                Full Name
              </label>
              <div className={inputWrap}>
                <FaUser className="text-stone" size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={input}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
                Email Address
              </label>
              <div className={inputWrap}>
                <MdEmail className="text-stone" size={16} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={
                    role === "student" ? "student@campus.edu" : "admin@campus.edu"
                  }
                  className={input}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
                Password
              </label>
              <div className={inputWrap}>
                <RiLockPasswordLine className="text-stone" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone transition hover:text-pilot-gold cursor-pointer bg-transparent border-0"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-pebble">
                Confirm Password
              </label>
              <div className={inputWrap}>
                <RiLockPasswordLine className="text-stone" size={16} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-stone transition hover:text-pilot-gold cursor-pointer bg-transparent border-0"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <IoEyeOutline size={18} />
                  ) : (
                    <IoEyeOffOutline size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-5 text-xs font-medium text-signal-red font-circularxxmono">{error}</p>
          )}

          <Button type="submit" className="mt-6 w-full cursor-pointer" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-charcoal/40" />
          <span className="px-3 text-xs text-pebble font-medium">Already registered?</span>
          <div className="flex-1 border-t border-charcoal/40" />
        </div>

        <p className="text-center text-sm text-pebble">
          <Link
            to="/login"
            className="font-semibold text-pilot-gold no-underline hover:underline transition"
          >
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
