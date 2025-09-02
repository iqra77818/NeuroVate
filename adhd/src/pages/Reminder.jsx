import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Reminders() {
  const [med, setMed] = useState("");
  const [time, setTime] = useState("");
  const [list, setList] = useState([]); // user-added reminders
  const [showForm, setShowForm] = useState(false);

  const medImages = [
    "https://cdn-icons-png.flaticon.com/512/6444/6444527.png",
    "https://cdn-icons-png.flaticon.com/256/4503/4503927.png",
    "https://cdn-icons-png.flaticon.com/512/4798/4798542.png",
  ];

  const dummyReminders = [
    { _id: "d1", medication: "White tablet", time: new Date(), taken: true },
    {
      _id: "d2",
      medication: "Pink capsule",
      time: new Date(Date.now() + 3600000),
      taken: false,
    },
    {
      _id: "d3",
      medication: "Eye Lotion",
      time: new Date(Date.now() + 7200000),
      taken: false,
    },
  ];

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return (
      date.toLocaleDateString("en-GB") +
      ", " +
      date.toLocaleTimeString("en-GB")
    );
  };

  const add = () => {
    if (!med || !time) return alert("Please enter medication and time");
    const newReminder = {
      _id: Date.now().toString(), // fake ID
      medication: med,
      time: new Date(time),
      taken: false,
    };
    setList((prev) => [...prev, newReminder]);
    setMed("");
    setTime("");
    setShowForm(false);
  };

  const markAsTaken = (id) => {
    // only update user-added reminders
    setList((prev) =>
      prev.map((r) => (r._id === id ? { ...r, taken: true } : r))
    );
  };

  // Combine dummy + session-only reminders and order them by taken status
  const allReminders = [...dummyReminders, ...list];
  const upcoming = allReminders.filter((r) => !r.taken);
  const done = allReminders.filter((r) => r.taken);

  return (
    <div className="bg-pink-200 font-notoserif  min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-7"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-noto italic font-bold text-pink-900">
            Medication Schedule
          </h2>
          <button
            className="flex items-center gap-2 bg-pink-600 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition-all"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="text-2xl">+</span> Add Reminder
          </button>
        </motion.div>

        {/* Add Reminder Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="space-y-3 mb-6 bg-white p-4 rounded shadow"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                value={med}
                onChange={(e) => setMed(e.target.value)}
                placeholder="Medicine name"
                className="w-full p-2 border rounded"
              />
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={add}
                className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 w-full"
              >
                Save Reminder
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Reminders */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {upcoming.map((r, index) => {
            const image = medImages[index % medImages.length];
            return (
              <motion.div
                key={r._id}
                className="flex items-center justify-between font-noto bg-pink-500 text-white p-6 rounded-xl shadow-md"
                style={{ minHeight: "120px" }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center space-x-4">
                  <img src={image} alt="med" className="w-14 h-14 " />
                  <div>
                    <div className="text-2xl font-semibold">{r.medication}</div>
                    <div className="text-lg opacity-90">
                      {formatDateTime(r.time)}
                    </div>
                  </div>
                </div>

                <button
                  className="bg-white text-pink-600  px-4 py-2 rounded font-semibold hover:bg-pink-100 transition"
                  onClick={() => {
                    if (!r._id.startsWith("d")) markAsTaken(r._id); // skip dummy
                  }}
                  disabled={r._id.startsWith("d")}
                >
                  Taken
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Already Taken */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-pink-800 mb-4">
            Already Taken
          </h3>
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {done.map((r, index) => {
              const image = medImages[index % medImages.length];
              return (
                <motion.div
                  key={r._id}
                  className="flex items-center justify-between font-noto bg-pink-400 text-white p-6 rounded-xl shadow-md opacity-60"
                  style={{ minHeight: "120px" }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center space-x-4">
                    <img src={image} alt="med" className="w-14 h-14 " />
                    <div>
                      <div className="text-2xl font-semibold line-through">
                        {r.medication}
                      </div>
                      <div className="text-lg opacity-90">
                        {formatDateTime(r.time)}
                      </div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-xl">✓</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
