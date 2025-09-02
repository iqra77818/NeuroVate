import { BrowserRouter, Routes, Route } from "react-router-dom";
 // Keep or remove if you don't have it
 import Navbar from "./components/Navbar";

import HomePage from "./pages/Home";
import Reminder from "./pages/Reminder"
import Journal from "./pages/Journal"
import Gamification from "./pages/Gamification"
import Meditation from "./pages/Meditation"
import MoodTracker from "./pages/MoodTracker"
import ProgressReport from "./pages/ProgressReport"
import CaregiverDashboard from "./pages/CaregiverDashboard"

export default function App() {
  return (
    <BrowserRouter>
      <div className="">
        {/* Navbar if you want */}
      
    <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/reminder" element={<Reminder />} />
            <Route path="/journal" element={<Journal />} />
             <Route path="/gamification" element={<Gamification/>} />
             <Route path="/meditation" element={<Meditation/>} />
             <Route path="/mood-tracker" element={<MoodTracker/>} />
             <Route path="/progress-report" element={<ProgressReport/>} />
             <Route path="/caregiver-dashboard" element={<CaregiverDashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

