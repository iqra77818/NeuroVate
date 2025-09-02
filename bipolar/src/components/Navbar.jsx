import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentIcon,
  UserGroupIcon,
  ChartBarIcon,
  MusicalNoteIcon,
  MoonIcon,
  ChartPieIcon, // ✅ NEW: For Progress Report
} from "@heroicons/react/24/outline";
import InlineAuth from "./InlineAuth";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-violet-300 dark:bg-violet-900 shadow-md border-b border-purple-300 dark:border-violet-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left side: Navigation */}
        <div className="flex space-x-6">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Medication */}
          <Link
            to="/medication"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/medication")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <ClipboardDocumentIcon className="h-6 w-6" />
            <span className="text-xs">Medication</span>
          </Link>

          {/* Mood Tracker */}
          <Link
            to="/mood-tracker"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/mood-tracker")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="text-xs">Mood Tracker</span>
          </Link>

          {/* Sleep Tracker */}
          <Link
            to="/sleep-tracker"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/sleep-tracker")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <MoonIcon className="h-6 w-6" />
            <span className="text-xs">Sleep Tracker</span>
          </Link>

          {/* Music Therapy */}
          <Link
            to="/music-therapy"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/music-therapy")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <MusicalNoteIcon className="h-6 w-6" />
            <span className="text-xs">Music Therapy</span>
          </Link>

          {/* ✅ Progress Report */}
          <Link
            to="/progress-report"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/progress-report")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <ChartPieIcon className="h-6 w-6" />
            <span className="text-xs">Progress</span>
          </Link>

          {/* Caregiver */}
          <Link
            to="/caregiver"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/caregiver")
                ? "bg-violet-100 text-purple-800 dark:bg-violet-700 dark:text-white"
                : "text-gray-700 dark:text-gray-200 hover:text-purple-800 dark:hover:text-white"
            }`}
          >
            <UserGroupIcon className="h-6 w-6" />
            <span className="text-xs">Caregiver</span>
          </Link>
        </div>

        {/* Right side: Auth */}
        <InlineAuth />
      </div>
    </nav>
  );
}







