import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Define moods and emojis
const moodEmojis = {
  overwhelmed: "😵",
  focused: "🎯",
  distracted: "🙃",
  hyper: "⚡",
  bored: "😐",
  calm: "😌",
};

const moodDescriptors = Object.keys(moodEmojis);

// Format date as dd/mm/yyyy
function formatDate(date) {
  return date.toLocaleDateString("en-GB");
}

export default function MoodTracker() {
  const [mood, setMood] = useState(moodDescriptors[0]);
  const [scale, setScale] = useState(0);
  const [moodLogs, setMoodLogs] = useState([
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      scale: 0,
      mood: "calm",
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      scale: 2,
      mood: "focused",
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      scale: -1,
      mood: "distracted",
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      scale: -3,
      mood: "overwhelmed",
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      scale: 1,
      mood: "hyper",
    },
  ]);

  const addMood = () => {
    if (scale < -5 || scale > 5) {
      alert("Scale must be between -5 and +5");
      return;
    }
    const newMood = {
      date: new Date(),
      scale,
      mood,
    };
    setMoodLogs((prev) => [...prev, newMood]);
    setScale(0);
    setMood(moodDescriptors[0]);
  };

  const chartData = moodLogs.map(({ date, scale }) => ({
    date: formatDate(date),
    scale,
  }));

  return (
    <div className="max-w-3xl mx-auto bg-pink-100 p-6 mt-10 space-y-6">
      <h1 className="text-5xl text-pink-600 font-notoserif font-extrabold text-center">
        ADHD Mood Tracker
      </h1>

      {/* Mood Input Section */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-pink-200 dark:bg-pink-600 p-6 rounded shadow text-black dark:text-white">
        <label className="flex flex-col items-center">
          <span className="mb-2 font-semibold">Mood</span>
          <select
            className="p-2 rounded border border-gray-300 dark:border-gray-100 text-lg bg-white dark:bg-pink-700 text-black dark:text-white"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            {moodDescriptors.map((m) => (
              <option key={m} value={m}>
                {moodEmojis[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col items-center">
          <span className="mb-2 font-semibold">Mood Scale (-5 to +5)</span>
          <input
            type="number"
            min={-5}
            max={5}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="w-20 p-2 rounded border border-gray-300 dark:border-gray-100 text-center text-lg bg-white dark:bg-pink-700 text-black dark:text-white"
          />
        </label>

        <button
          onClick={addMood}
          className="ml-4 mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded font-semibold transition"
        >
          Add Mood {moodEmojis[mood]}
        </button>
      </div>

      {/* Mood Chart */}
      <div className="bg-pink-200 dark:bg-pink-600 rounded p-4 shadow">
        {moodLogs.length === 0 ? (
          <p className="text-center text-gray-700">No moods logged yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f9a8d4" />
              <XAxis dataKey="date" />
              <YAxis domain={[-5, 5]} />
              <Tooltip
                formatter={(value) => `Scale: ${value}`}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="scale"
                stroke="#ec4899" // pink-500
                strokeWidth={3}
                dot={{ r: 5, fill: "#ec4899" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

