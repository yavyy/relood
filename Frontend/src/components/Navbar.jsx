import React from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth()
  return (
    <nav className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-gray-200 dark:border-neutral-800">
      <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
        Reelood
      </h1>

      <div className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium">
        <Link
          to="/create"
          className="hover:opacity-80 transition"
        >
          Create
        </Link>
        <Link
          to="/explore"
          className="hover:opacity-80 transition"
        >
          Explore
        </Link>
        {
          !user ?
            <Link
              to="/login"
              className="hover:opacity-80 transition"
            >
              Login
            </Link> :
            <button
              className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
              onClick={logout}
            >
              Logout
            </button>
        }
        {
          !user &&
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        }
      </div>
    </nav>
  )
}

export default Navbar