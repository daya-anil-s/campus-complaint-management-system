import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { FaUserGraduate, FaUserShield } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Login() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      valid = false;
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    }

    if (valid) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        <p className="portal-text">SECURE PORTAL</p>

        <h1>Welcome back</h1>

        <p className="subtitle">
          {role === "student"
            ? "Sign in with your student account to continue."
            : "Sign in with your administrator account to continue."}
        </p>

        {/* Role Toggle */}
        <div className="role-switch">

          <button
            type="button"
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            <FaUserGraduate />
            Student
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            <FaUserShield />
            Admin
          </button>

        </div>

        {/* Email */}
        <label>Email address</label>

        <div className="input-box">
          <MdEmail size={22} />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={
              role === "student"
                ? "student@campus.edu"
                : "admin@campus.edu"
            }
          />
        </div>

        {emailError && (
          <p className="error-text">{emailError}</p>
        )}

        {/* Password */}
        <label>Password</label>

        <div className="input-box">
          <RiLockPasswordLine size={22} />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoEyeOffOutline size={22} />
            ) : (
              <IoEyeOutline size={22} />
            )}
          </span>
        </div>

        {passwordError && (
          <p className="error-text">{passwordError}</p>
        )}

        {/* Remember Me */}
        <div className="options">
          <div>
            <input type="checkbox" />
            <span> Remember me</span>
          </div>

          <a href="#">Forgot password?</a>
        </div>

        {/* Login Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
        >
          {role === "student"
            ? "Student Sign In →"
            : "Admin Sign In →"}
        </button>

        {/* Footer */}
        <p className="footer-text">
          {role === "student"
            ? "New Student?"
            : "Need Admin Access?"}

          <a href="#">
            {role === "student"
              ? " Create Account"
              : " Contact System Admin"}
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;
// test change





