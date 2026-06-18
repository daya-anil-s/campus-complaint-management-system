import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

function Register() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 p-10">

        {/* Logo */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 flex items-center justify-center shadow-lg">
          <FaUserGraduate className="text-white text-2xl" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-orange-500 uppercase tracking-[5px] text-xs font-bold">
            Secure Portal
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
            Create Account
          </h1>

          <p className="mt-3 text-gray-500">
            Create your student or administrator account.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex rounded-2xl bg-gray-100 p-2 mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all duration-300 ${
              role === "student"
                ? "bg-teal-600 text-white shadow-md"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <FaUserGraduate />
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all duration-300 ${
              role === "admin"
                ? "bg-teal-600 text-white shadow-md"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <FaUserShield />
            Admin
          </button>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </label>

          <div className="flex items-center h-12 bg-gray-50 border border-gray-200 rounded-2xl px-4 shadow-sm focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-100 transition-all">
            <FaUser className="text-gray-400" />

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-transparent outline-none pl-3 text-gray-700"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="flex items-center h-12 bg-gray-50 border border-gray-200 rounded-2xl px-4 shadow-sm focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-100 transition-all">
            <MdEmail className="text-gray-400" />

            <input
              type="email"
              placeholder={
                role === "student"
                  ? "student@campus.edu"
                  : "admin@campus.edu"
              }
              className="w-full bg-transparent outline-none pl-3 text-gray-700"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>

          <div className="flex items-center h-12 bg-gray-50 border border-gray-200 rounded-2xl px-4 shadow-sm focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-100 transition-all">
            <RiLockPasswordLine className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full bg-transparent outline-none pl-3 text-gray-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-teal-700"
            >
              {showPassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Confirm Password
          </label>

          <div className="flex items-center h-12 bg-gray-50 border border-gray-200 rounded-2xl px-4 shadow-sm focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-100 transition-all">
            <RiLockPasswordLine className="text-gray-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full bg-transparent outline-none pl-3 text-gray-700"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="text-gray-400 hover:text-teal-700"
            >
              {showConfirmPassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          Create Account →
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-3 text-sm text-gray-400">
            Already registered?
          </span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          <Link
            to="/"
            className="font-semibold text-teal-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;