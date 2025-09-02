// src/pages/Meditation.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, SkipBack, SkipForward, Volume2 } from "lucide-react";

const sessions = [
  {
    id: 1,
    tag: "Mindfulness",
    title: "Morning Calm",
    desc: "Start your day with peaceful mindfulness",
    duration: "10 min",
  },
  {
    id: 2,
    tag: "Relaxation",
    title: "Stress Relief",
    desc: "Release tension and find inner peace",
    duration: "15 min",
  },
  {
    id: 3,
    tag: "Sleep",
    title: "Sleep Preparation",
    desc: "Prepare your mind for restful sleep",
    duration: "20 min",
  },
  {
    id: 4,
    tag: "Anxiety",
    title: "Anxiety Relief",
    desc: "Calm your mind during anxious moments",
    duration: "12 min",
  },
  {
    id: 5,
    tag: "Mindfulness",
    title: "Body Scan",
    desc: "Connect with your body and release tension",
    duration: "18 min",
  },
  {
    id: 6,
    tag: "Breathing",
    title: "Breathing Focus",
    desc: "Simple breathing exercises for clarity",
    duration: "8 min",
  },
];

export default function Meditation() {
  const [current, setCurrent] = useState(sessions[0]);

  return (
    <div className="min-h-screen bg-pink-200 flex flex-col p-6">
      {/* Top Left Heading */}
      <h1 className="text-4xl font-bold font-notoserif px-5 text-pink-600 mb-6">
        Inhale Peace, Exhale Stress
      </h1>

      {/* Top Section: Left player + Right image */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
        {/* Player Box */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg w-full lg:w-2/3 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {current.title}
          </h2>
          <p className="text-gray-500">{current.tag} · {current.duration}</p>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mt-6 text-sm">
            <span>2:30</span>
            <span>10:00</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div className="bg-pink-600 h-2 rounded-full w-1/4"></div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <button className="p-3 rounded-full bg-pink-100 text-pink-600">
              <SkipBack size={22} />
            </button>
            <button className="p-4 rounded-full bg-pink-600 text-white shadow-lg">
              <Play size={28} />
            </button>
            <button className="p-3 rounded-full bg-pink-100 text-pink-600">
              <SkipForward size={22} />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center justify-end mt-4 text-pink-600">
            <Volume2 size={20} />
            <div className="ml-2 w-24 bg-gray-200 h-2 rounded-full">
              <div className="bg-pink-600 h-2 w-12 rounded-full"></div>
            </div>
          </div>
        </motion.div>

        {/* Right Large Circular Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:w-1/3"
        >
          <img
            src="https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1024,h_576/https://effectiveeffortconsulting.com/wp-content/uploads/2023/10/ADHD-Brain-1024x576.jpg"
            alt="Mind"
            className="w-70 h-70 border-8  shadow-xl object-contain "

          />
        </motion.div>
      </div>

      {/* Meditation Sessions (full width) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        {sessions.map((s) => (
          <div
            key={s.id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer"
            onClick={() => setCurrent(s)}
          >
            <span className="text-sm font-medium text-pink-600">{s.tag}</span>
            <h3 className="text-lg font-semibold mt-2">{s.title}</h3>
            <p className="text-gray-500 text-sm">{s.desc}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600 text-sm">{s.duration}</span>
              <button className="bg-pink-600 text-white px-3 py-1 rounded-lg text-sm shadow">
                Play
              </button>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

