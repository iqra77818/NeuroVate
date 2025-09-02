import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  FaceSmileIcon,
  UsersIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto flex items-center">
        {/* Left side: Brand */}
        <div className="text-xl font-bold text-sky-600 px-6 py-3">
          AutismCare
        </div>

        {/* Right side: Navigation */}
        <div className="flex flex-1 justify-end space-x-6 mr-6">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              isActive("/") ? "bg-sky-200 text-sky-600" : "text-gray-500"
            }`}
          >
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Emotion */}
          <Link
            to="/emotion"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              isActive("/emotion") ? "bg-sky-200 text-sky-600" : "text-gray-500"
            }`}
          >
            <FaceSmileIcon className="h-6 w-6" />
            <span className="text-xs">Emotion</span>
          </Link>

          {/* Family */}
          <Link
            to="/family"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              isActive("/family") ? "bg-sky-200 text-sky-600" : "text-gray-500"
            }`}
          >
            <UsersIcon className="h-6 w-6" />
            <span className="text-xs">Family</span>
          </Link>

          {/* SOS */}
          <Link
            to="/sos"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              isActive("/sos") ? "bg-sky-200 text-sky-600" : "text-gray-500"
            }`}
          >
            <BellAlertIcon className="h-6 w-6" />
            <span className="text-xs">SOS</span>
          </Link>

          {/* Reminders */}
          <Link
            to="/reminders"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              isActive("/reminders")
                ? "bg-sky-200 text-sky-600"
                : "text-gray-500"
            }`}
          >
            <CalendarDaysIcon className="h-6 w-6" />
            <span className="text-xs">Reminders</span>
          </Link>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`flex flex-col items-center px-4 py-2 rounded-lg ${
              isActive("/dashboard")
                ? "bg-sky-200 text-sky-600"
                : "text-gray-500"
            }`}
          >
            <Squares2X2Icon className="h-6 w-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}


