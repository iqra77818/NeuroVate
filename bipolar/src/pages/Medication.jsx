import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const dummyReminders = [
  { _id: "d1", medication: "White tablet", time: new Date(), taken: true },
  {
    _id: "d2",
    medication: "Capsules",
    time: new Date(Date.now() + 3600000),
    taken: false,
  },
  {
    _id: "d3",
    medication: "Paraxem Pills",
    time: new Date(Date.now() + 7200000),
    taken: false,
  },
];

const medImages = [
  "https://static.vecteezy.com/system/resources/previews/028/293/903/non_2x/medical-pills-capsule-drug-flying-3d-icon-illustration-png.png",
  "https://static.vecteezy.com/system/resources/previews/055/498/019/non_2x/stacked-purple-capsules-on-white-bg-png.png",
  "https://png.pngtree.com/png-clipart/20250119/original/pngtree-a-plain-round-white-pill-with-slight-indentation-png-image_19951279.png",
];

function formatDateTime(datetime) {
  const date = new Date(datetime);
  return (
    date.toLocaleDateString("en-GB") +
    ", " +
    date.toLocaleTimeString("en-GB")
  );
}

export default function Medication() {
  const [med, setMed] = useState("");
  const [time, setTime] = useState("");
  const [localList, setLocalList] = useState([]); // added locally, lost on reload
  const [userList, setUserList] = useState([]); // reminders from firebase
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  // Track user auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserReminders(currentUser.uid);
      } else {
        setUserList([]);
      }
    });
    return unsubscribe;
  }, []);

  // Fetch user reminders from Firestore
  async function fetchUserReminders(uid) {
    try {
      const q = query(collection(db, "reminders"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const reminders = [];
      querySnapshot.forEach((doc) => {
        reminders.push({ _id: doc.id, ...doc.data() });
      });
      setUserList(reminders);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  }

  // Add local reminder (only local, not saved in Firebase)
  const addLocalReminder = () => {
    if (!med || !time) return alert("Please enter medication and time");
    const newReminder = {
      _id: Date.now().toString(),
      medication: med,
      time: new Date(time),
      taken: false,
    };
    setLocalList((prev) => [...prev, newReminder]);
    setMed("");
    setTime("");
    setShowForm(false);
  };

  // Mark reminder as taken (local or firebase)
  const markAsTaken = async (r) => {
    if (r._id.startsWith("d")) return; // dummy, do nothing

    if (localList.some((rem) => rem._id === r._id)) {
      // update local reminder
      setLocalList((prev) =>
        prev.map((rem) => (rem._id === r._id ? { ...rem, taken: true } : rem))
      );
    } else if (userList.some((rem) => rem._id === r._id)) {
      // update firebase reminder
      try {
        const ref = doc(db, "reminders", r._id);
        await updateDoc(ref, { taken: true });
        setUserList((prev) =>
          prev.map((rem) => (rem._id === r._id ? { ...rem, taken: true } : rem))
        );
      } catch (error) {
        console.error("Failed to mark as taken", error);
      }
    }
  };

  // Combine all reminders: dummy + user + local
  const allReminders = [...dummyReminders, ...userList, ...localList];

  const upcoming = allReminders.filter((r) => !r.taken);
  const done = allReminders.filter((r) => r.taken);

  return (
    <div className="  mt-10 min-h-screen p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-7"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-noto italic font-notoserif  font-bold text-sky-900 dark:text-violet-200">
            Medication Schedule
          </h2>
          <button
            className="flex items-center gap-2 bg-violet-500 dark:bg-violet-700 text-white text-xl font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-violet-800 transition-all"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="text-2xl">+</span> Add Reminder
          </button>
        </motion.div>

        {/* Add Reminder Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="space-y-3 mb-6 rounded shadow
                bg-white text-black
                dark:bg-black dark:text-white
                p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                value={med}
                onChange={(e) => setMed(e.target.value)}
                placeholder="Medicine name"
                className="w-full p-2 border rounded bg-white text-black dark:bg-black dark:text-white border-gray-300 dark:border-gray-700"
              />
              <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black dark:bg-black dark:text-white border-gray-300 dark:border-gray-700"
              />
              <button
                onClick={addLocalReminder}
                className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-800 w-full transition"
              >
                Save Reminder (local)
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                * Added reminders are local only and will disappear on reload.
              </p>
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
                className="flex items-center justify-between font-noto
                  bg-violet-400 dark:bg-violet-800
                  text-white p-6 rounded-xl shadow-md"
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
                  className="bg-white text-violet-700 px-4 py-2 rounded font-semibold hover:bg-violet-100 transition"
                  onClick={() => markAsTaken(r)}
                  disabled={r._id.startsWith("d") && r.taken}
                >
                  Taken
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Already Taken */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-violet-900 dark:text-violet-300 mb-4">
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
                  className="flex items-center justify-between font-noto
                    bg-violet-300 dark:bg-violet-700
                    text-white p-6 rounded-xl shadow-md opacity-60"
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


