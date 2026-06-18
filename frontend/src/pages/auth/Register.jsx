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
      <div className="w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 flex items-center justify-center shadow-lg">
            <FaUserGraduate className="text-white text-2xl" />
          </div>

          <p className="text-orange-500 uppercase tracking-[5px] text-xs font-bold">
            Secure Portal
          </p>

          <h1 className="mt-3 text-5xl font-extrabold text-gray-900">
            Create Account
          </h1>

          <p className="mt-3 text-gray-500">
            Create your student or administrator account.
          </p>

        </div>

        {/* Role Toggle */}
        <div className="flex rounded-3xl bg-gray-100 p-1.5 mb-8">

          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition-all duration-300 ${
              role === "student"
                ? "bg-teal-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <FaUserGraduate />
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition-all duration-300 ${
              role === "admin"
                ? "bg-teal-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-white"
            }`}
          >
            <FaUserShield />
            Admin
          </button>

        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </label>

          <div className="flex items-center h-14 bg-white border-2 border-gray-200 rounded-xl px-4 shadow-sm focus-within:border-teal-600 focus-within:shadow-md transition-all">
            <FaUser className="text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full pl-3 bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>

          <div className="flex items-center h-14 bg-white border-2 border-gray-200 rounded-xl px-4 shadow-sm focus-within:border-teal-600 focus-within:shadow-md transition-all">
            <MdEmail className="text-gray-400 text-lg" />

            <input
              type="email"
              placeholder={
                role === "student"
                  ? "student@campus.edu"
                  : "admin@campus.edu"
              }
              className="w-full pl-3 bg-transparent outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>

          <div className="flex items-center h-14 bg-white border-2 border-gray-200 rounded-xl px-4 shadow-sm focus-within:border-teal-600 focus-within:shadow-md transition-all">
            <RiLockPasswordLine className="text-gray-400 text-lg" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full pl-3 bg-transparent outline-none text-gray-700"
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

          <div className="flex items-center h-14 bg-white border-2 border-gray-200 rounded-xl px-4 shadow-sm focus-within:border-teal-600 focus-within:shadow-md transition-all">
            <RiLockPasswordLine className="text-gray-400 text-lg" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full pl-3 bg-transparent outline-none text-gray-700"
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
          className="w-full h-14 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          Create Account →
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/"
            className="ml-2 font-semibold text-teal-600 hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;