import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import Medication from "./pages/Medication";
import CaregiverDashboard from "./pages/CaregiverDashboard";
import MoodTracker from "./pages/MoodTracker"; 
import MusicTherapy from "./pages/MusicTherapy"; 
import SleepTracker from "./pages/SleepTracker"; 
import ProgressReport from "./pages/ProgressReport";  // <- import MoodTracker

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="relative min-h-screen overflow-hidden text-black dark:text-white transition-colors duration-300">
          {/* Background based on dark mode */}
          {dark ? (
            <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
          ) : (
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
          )}

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/caregiver" element={<CaregiverDashboard />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
             <Route path="/music-therapy" element={<MusicTherapy/>} /> 
             <Route path="/sleep-tracker" element={<SleepTracker/>} /> 
             <Route path="/progress-report" element={<ProgressReport/>} /> {/* Added route */}
          </Routes>

          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}





