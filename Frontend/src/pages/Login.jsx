import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Login() {
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const { login } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    const result = await login(data)

    if (result.success) {
      // navigate('/explore')
    } else {
      setError(result.message)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('')
    }, 3000)

    return () => clearTimeout(timeoutId)
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
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Login to your account
          </p>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
              >
                Don't have an account? <Link to={'/register'} className="underline">register</Link>
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 rounded-xl bg-black dark:bg-white text-white dark:text-black py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
