// src/components/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  BellIcon,          // Reminder
  PuzzlePieceIcon,    // Gamification
  MusicalNoteIcon,    // Meditation
  FaceSmileIcon,      // Mood Tracker
  BookOpenIcon,       // Journal
  ChartBarIcon,       // Progress Report
  UserGroupIcon,      // Caregiver Dashboard
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-pink-200 dark:bg-pink-600 shadow-md border-b border-pink-300 dark:border-pink-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left: Navigation Links */}
        <div className="flex space-x-6">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Reminder */}
          <Link
            to="/reminder"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/reminder")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <BellIcon className="h-6 w-6" />
            <span className="text-xs">Reminder</span>
          </Link>

          {/* Gamification */}
          <Link
            to="/gamification"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/gamification")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <PuzzlePieceIcon className="h-6 w-6" />
            <span className="text-xs">Game</span>
          </Link>

          {/* Meditation */}
          <Link
            to="/meditation"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/meditation")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <MusicalNoteIcon className="h-6 w-6" />
            <span className="text-xs">Meditation</span>
          </Link>

          {/* Mood Tracker */}
          <Link
            to="/mood-tracker"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/mood-tracker")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <FaceSmileIcon className="h-6 w-6" />
            <span className="text-xs">Mood</span>
          </Link>

          {/* Journal */}
          <Link
            to="/journal"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/journal")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <BookOpenIcon className="h-6 w-6" />
            <span className="text-xs">Journal</span>
          </Link>

          {/* Progress Report */}
          <Link
            to="/progress-report"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/progress-report")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <ChartBarIcon className="h-6 w-6" />
            <span className="text-xs">Progress</span>
          </Link>

          {/* Caregiver Dashboard */}
          <Link
            to="/caregiver-dashboard"
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition ${
              isActive("/caregiver-dashboard")
                ? "bg-white text-pink-600 dark:bg-pink-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:text-pink-600 dark:hover:text-white"
            }`}
          >
            <UserGroupIcon className="h-6 w-6" />
            <span className="text-xs">Caregiver</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

