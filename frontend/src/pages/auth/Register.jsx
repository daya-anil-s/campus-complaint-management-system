import { useState } from "react";
import { Link } from "react-router-dom";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl bg-white shadow-xl p-8">

        {/* Heading */}
        <div className="text-center">
          <p className="text-orange-600 uppercase tracking-[4px] text-sm font-semibold">
            Secure Portal
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500 text-lg">
            Create your student or administrator account.
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mt-7 flex rounded-2xl bg-gray-100 p-2">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
              role === "student"
                ? "bg-teal-700 text-white"
                : "text-gray-700"
            }`}
          >
            <FaUserGraduate />
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 font-semibold transition ${
              role === "admin"
                ? "bg-teal-700 text-white"
                : "text-gray-700"
            }`}
          >
            <FaUserShield />
            Admin
          </button>
        </div>

        {/* Form */}
        <div className="mt-7">

          {/* Full Name */}
          <div className="mb-5">
            <label className="block mb-2 text-base font-semibold text-gray-900">
              Full Name
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-300 px-4">
              <FaUser className="mr-3 text-lg text-gray-500" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 text-base font-semibold text-gray-900">
              Email Address
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-300 px-4">
              <MdEmail className="mr-3 text-lg text-gray-500" />

              <input
                type="email"
                placeholder={
                  role === "student"
                    ? "student@campus.edu"
                    : "admin@campus.edu"
                }
                className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block mb-2 text-base font-semibold text-gray-900">
              Password
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-300 px-4">
              <RiLockPasswordLine className="mr-3 text-lg text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? (
                  <IoEyeOutline size={22} />
                ) : (
                  <IoEyeOffOutline size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block mb-2 text-base font-semibold text-gray-900">
              Confirm Password
            </label>

            <div className="flex h-14 items-center rounded-xl border border-gray-300 px-4">
              <RiLockPasswordLine className="mr-3 text-lg text-gray-500" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full bg-transparent text-base outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="text-gray-500"
              >
                {showConfirmPassword ? (
                  <IoEyeOutline size={22} />
                ) : (
                  <IoEyeOffOutline size={22} />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button className="w-full h-14 rounded-xl bg-teal-700 text-lg font-semibold text-white hover:bg-teal-800 transition">
            Create Account →
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?
            <Link
              to="/"
              className="ml-2 font-semibold text-teal-700 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;