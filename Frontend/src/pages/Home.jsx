import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 leading-tight">
          Welcome to <span className="block">Reelood</span>
        </h2>

        <p className="max-w-md text-sm sm:text-lg text-gray-600 dark:text-gray-400 mb-8">
          Discover and explore immersive fullscreen reels. Scroll, watch,
          and experience content like never before.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Link
            to="/explore"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-medium text-sm sm:text-base hover:opacity-90 transition"
          >
            Start Exploring
          </Link>

          <Link
            to="/register"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-gray-300 dark:border-neutral-700 text-sm sm:text-base font-medium hover:bg-gray-100 dark:hover:bg-neutral-900 transition"
          >
            Create Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
