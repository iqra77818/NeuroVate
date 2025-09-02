import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { motion } from "framer-motion";

const sleepQualities = ["Poor", "Fair", "Good", "Excellent"];
const morningFeelings = ["Tired", "Okay", "Refreshed"];

export default function SleepTracker() {
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [quality, setQuality] = useState(sleepQualities[2]);
  const [nightWake, setNightWake] = useState("No");
  const [morningFeeling, setMorningFeeling] = useState(morningFeelings[1]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  function calcSleepDuration(bed, wake) {
    if (!bed || !wake) return 0;
    const bedDate = new Date(`1970-01-01T${bed}:00`);
    let wakeDate = new Date(`1970-01-01T${wake}:00`);
    if (wakeDate <= bedDate) wakeDate.setDate(wakeDate.getDate() + 1);
    const diffMs = wakeDate - bedDate;
    return diffMs / (1000 * 60 * 60);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const duration = calcSleepDuration(bedTime, wakeTime);

    try {
      await addDoc(collection(db, "sleepRecords"), {
        bedTime,
        wakeTime,
        quality,
        nightWake,
        morningFeeling,
        duration,
        timestamp: new Date(),
      });
      alert("Sleep record saved!");
      setBedTime("");
      setWakeTime("");
      setQuality(sleepQualities[2]);
      setNightWake("No");
      setMorningFeeling(morningFeelings[1]);
      fetchRecords();
    } catch (e) {
      alert("Error saving record");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecords() {
    const q = query(
      collection(db, "sleepRecords"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setRecords(data);
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  const avgDuration = (
    records.reduce((acc, r) => acc + r.duration, 0) / (records.length || 1)
  ).toFixed(2);

  const qualityCounts = sleepQualities.reduce((acc, q) => {
    acc[q] = records.filter((r) => r.quality === q).length;
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-5xl mt-8 text-violet-500 font-notoserif font-extrabold mb-8 px-8"
      >
        Sleep Tracker
      </motion.h1>

      {/* Form and Summary Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-1 bg-white p-6 dark:bg-black rounded-lg shadow-md space-y-6"
        >
          {/* Form Fields */}
          {/* Same content as before */}
          {/* [unchanged] */}
          {/* Just reuse the form fields here */}
          {/* ... */}
          {/* [See note below for collapsing] */}

          <div>
            <label className="block mb-2 font-semibold">
              What time did you go to bed?
            </label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              required
              className="border border-gray-300 dark:bg-black rounded px-3 py-2 w-full focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              What time did you wake up?
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              required
              className="border border-gray-300 dark:bg-black rounded px-3 py-2 w-full focus:outline-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              How would you rate your sleep quality?
            </label>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="border border-gray-300 dark:bg-black rounded px-3 py-2 w-full focus:outline-blue-500"
            >
              {sleepQualities.map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Did you wake up during the night?
            </label>
            <select
              value={nightWake}
              onChange={(e) => setNightWake(e.target.value)}
              className="border border-gray-300 dark:bg-black rounded px-3 py-2 w-full focus:outline-blue-500"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              How do you feel this morning?
            </label>
            <select
              value={morningFeeling}
              onChange={(e) => setMorningFeeling(e.target.value)}
              className="border border-gray-300 dark:bg-black  rounded px-3 py-2 w-full focus:outline-blue-500"
            >
              {morningFeelings.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-violet-500 dark:bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Save Sleep Data"}
          </button>
        </motion.form>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex-1 bg-violet-400 dark:bg-violet-600 text-white p-6 rounded-lg shadow-md min-w-[300px] h-80 overflow-hidden relative"
        >
          <h2 className="text-2xl font-semibold mb-4 border-b font-notoserif border-gray-700 pb-2">
            Sleep Summary
          </h2>
          <p className="mb-2">
            <strong>Records:</strong> {records.length}
          </p>
          <p className="mb-4">
            <strong>Average Sleep Duration:</strong> {avgDuration} hours
          </p>
          <div>
            <strong>Sleep Quality Counts:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {sleepQualities.map((q) => (
                <li key={q}>
                  {q}: {qualityCounts[q]}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


