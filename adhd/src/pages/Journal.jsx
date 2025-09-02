import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Journal() {
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [journals, setJournals] = useState([
    {
      _id: "j1",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      content: "Had a relaxing day reading my favorite book.",
    },
    {
      _id: "j2",
      date: new Date(Date.now() - 86400000), // 1 day ago
      content: "Went for a walk in the park and felt refreshed.",
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const addJournal = () => {
    if (!date || !content.trim()) {
      return alert("Please enter both date and content");
    }
    const newJournal = {
      _id: Date.now().toString(),
      date: new Date(date),
      content: content.trim(),
    };
    setJournals((prev) => [newJournal, ...prev]);
    setDate("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="bg-pink-200 font-notoserif min-h-screen p-6 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col mb-7"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between mt-6 items-center">
            <h2 className="text-5xl mb-3  font-notoserif font-noto italic font-bold text-pink-900">
              Journal
            </h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-pink-600 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-700 transition-all"
            >
              <span className="text-3xl">+</span> Add Journal
            </button>
          </div>
          <p className="text-gray-600 text-xl italic mt-4">
            Thoughts are the whispers of the soul; record them before they fade.
          </p>
        </motion.div>

        {/* Add Journal Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="space-y-4 mb-6 bg-white p-6 rounded shadow"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <label className="block font-semibold text-pink-800 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <label className="block font-semibold text-pink-800 mb-1 mt-3">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Write your journal here..."
                className="w-full p-2 border rounded resize-none"
              />
              <button
                onClick={addJournal}
                className="w-full px-4 py-3 bg-pink-600 text-white rounded hover:bg-pink-700 font-semibold transition"
              >
                Save Journal
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Journal Entries */}
        <div className="space-y-6">
          {journals.length === 0 && (
            <p className="text-pink-700 italic">No journal entries yet.</p>
          )}
          {journals.map((entry) => (
            <motion.div
              key={entry._id}
              className="bg-pink-400 p-6 rounded-xl shadow-md text-white font-noto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="text-xl font-semibold">{formatDate(entry.date)}</div>
              </div>
              <p className="whitespace-pre-wrap">{entry.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

