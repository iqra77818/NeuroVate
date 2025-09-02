import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const moodEmojis = {
  anxious: "😰",
  excited: "🤩",
  irritable: "😠",
  sad: "😢",
  happy: "😄",
  calm: "😌",
  manic: "🤪",
  depressed: "😞",
};

const moodDescriptors = Object.keys(moodEmojis);

function formatDate(date) {
  return date.toLocaleDateString("en-GB");
}

export default function MoodTracker() {
  const [user] = useAuthState(auth);
  const [mood, setMood] = useState(moodDescriptors[0]);
  const [scale, setScale] = useState(0);
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy public moods — reset on reload (non-persistent)
  const dummyMoods = [
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      scale: 0,
      mood: "calm",
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      scale: 2,
      mood: "happy",
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      scale: -1,
      mood: "anxious",
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      scale: -3,
      mood: "sad",
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      scale: 1,
      mood: "excited",
    },
  ];

  // Load user moods from Firestore when logged in
  useEffect(() => {
    if (!user) {
      setMoodLogs(dummyMoods);
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "moods"),
      where("uid", "==", user.uid),
      orderBy("date", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));
      setMoodLogs(logs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Add mood entry (only adds to Firestore if logged in, otherwise just session state)
  const addMood = async () => {
    if (scale < -5 || scale > 5) {
      alert("Scale must be between -5 and +5");
      return;
    }
    const newMood = { date: new Date(), scale, mood, uid: user ? user.uid : null };

    if (user) {
      try {
        await addDoc(collection(db, "moods"), newMood);
      } catch (e) {
        alert("Error saving mood");
        console.error(e);
      }
    } else {
      // Just add to local state for public users (will vanish on reload)
      setMoodLogs((prev) => [...prev, newMood]);
    }
    setScale(0);
    setMood(moodDescriptors[0]);
  };

  // Prepare data for recharts
  const chartData = moodLogs.map(({ date, scale }) => ({
    date: formatDate(date),
    scale,
  }));

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 space-y-6">
      <h1 className="text-5xl text-violet-500 font-notoserif font-extrabold text-center"> Bipolar Mood Tracker</h1>

      {/* Add mood entry */}
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-white dark:bg-gray-900 p-6 rounded shadow text-black dark:text-white">
        <label className="flex flex-col items-center">
          <span className="mb-2 font-semibold">Mood</span>
          <select
            className="p-2 rounded border border-gray-300 dark:border-gray-600 text-lg bg-white dark:bg-gray-800 text-black dark:text-white"
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
            className="w-20 p-2 rounded border border-gray-300 dark:border-gray-600 text-center text-lg bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        </label>

        <button
          onClick={addMood}
          className="ml-4 mt-6 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded font-semibold transition"
        >
          Add Mood {moodEmojis[mood]}
        </button>
      </div>

      {/* Mood Chart */}
      <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
        {loading ? (
          <p className="text-center text-gray-500">Loading moods...</p>
        ) : moodLogs.length === 0 ? (
          <p className="text-center text-gray-500">No moods logged yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={user ? "#ddd" : "#bbb"} />
              <XAxis dataKey="date" />
              <YAxis domain={[-5, 5]} />
              <Tooltip
                formatter={(value) => `Scale: ${value}`}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="scale"
                stroke="#7c3aed" // violet-600 hex
                strokeWidth={3}
                dot={{ r: 5, fill: "#7c3aed" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}



