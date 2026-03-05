import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Signup() {
  const [error, setError] = useState('')

  const { signup } = useAuth()

  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const userData = {
      fullName: data.firstName + " " + data.lastName,
      email: data.email,
      role: data.role,
      password: data.password
    }

    const result = await signup(userData)
    if (result.success) {
      navigate('/explore')
    } else {
      setError(result.message)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError('')
    }, 2500)

    return () => clearTimeout(timeout)
  }, [error])

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white dark:bg-black px-4 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-sm font-medium text-gray-700 dark:text-gray-300 hover:opacity-80 flex items-center gap-0.5"
      >
        <IoIosArrowRoundBack size={25} /> Back
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-neutral-800">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white text-center mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Sign up to get started
          </p>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white dark:selection:bg-white dark:selection:text-black"
                name="firstName"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white dark:selection:bg-white dark:selection:text-black"
                name="lastName"
              />
            </div>

            {/* Role (Default: user) */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    defaultChecked
                    className="accent-black dark:accent-white"
                  />
                  User
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="radio"
                    name="role"
                    value="creator"
                    className="accent-black dark:accent-white"
                  />
                  Creator
                </label>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white dark:selection:bg-white dark:selection:text-black"
                name="email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white dark:selection:bg-white dark:selection:text-black"
                name="password"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
              >
                Already have an account? <Link to={'/login'} className="underline">login</Link>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-black dark:bg-white text-white dark:text-black py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
