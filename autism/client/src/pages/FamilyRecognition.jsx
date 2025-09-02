import React, { useEffect, useRef, useState } from 'react';
import { loadFamilyModels, addLabeledImage, recognizeImage } from '../ai/family';
import useSocket from '../hooks/useSocket';
import { UserPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function FamilyRecognition({ token }) {
  const fileRef = useRef();
  const [status, setStatus] = useState('📂 Load or add family images');
  const socketRef = useSocket(token);

  useEffect(() => {
    loadFamilyModels().then(() => setStatus('✅ Family models loaded'));
  }, []);

  const handleAdd = async () => {
    const file = fileRef.current.files[0];
    const label = prompt('Enter label for this person (e.g., Mom)');
    if (!file || !label) return;
    const ok = await addLabeledImage(label, file);
    setStatus(ok ? `✅ Added ${label}` : '❌ Failed to add');
  };

  const handleCheck = async () => {
    const file = fileRef.current.files[0];
    if (!file) return setStatus('⚠️ Upload an image to check');
    const res = await recognizeImage(file);
    if (!res.recognized) {
      setStatus('❗ Unknown face — notifying caregiver');
      socketRef.current?.emit('familyAlert', { patientId: 'demo-patient', info: 'unknown face' });
    } else {
      setStatus(`👤 Recognized ${res.label} (distance ${res.distance.toFixed(2)})`);
    }
  };

  const dummyFamily = [
    {
      label: 'Mom',
      name: 'Sarah Johnson',
      relation: 'Mother',
      role: 'Primary caregiver, comforting presence',
      image: 'https://images.generated.photos/Ue6VJO_Vpht_z8CYWPXzs8tf-Ym2SkBWk32dF9DONdg/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Nzc2MTc2LmpwZw.jpg',
    },
    {
      label: 'Dad',
      name: 'Alex Carter',
      relation: 'Father',
      role: 'Supportive and playful',
      image: 'https://static01.nyt.com/newsgraphics/2020/11/12/fake-people/4b806cf591a8a76adfc88d19e90c8c634345bf3d/fallbacks/mobile-02.jpg',
    },
    {
      label: 'Sister',
      name: 'Emma',
      relation: 'Sister',
      role: 'Sibling and emotional companion',
      image: 'https://www.zmo.ai/wp-content/uploads/2024/03/Activity-options-for-AI-face-generator.webp',
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <motion.div
      className="min-h-screen bg-sky-200 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h1
        className="text-2xl md:text-3xl font-notoserif font-bold text-center text-sky-800 mb-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        Family Recognition for Emotional Safety
      </motion.h1>

      {/* Upload Area */}
      <motion.div
        className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center max-w-2xl mx-auto mb-8"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={0.2}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          id="upload-input"
        />

        {/* Drop Zone */}
        <label
          htmlFor="upload-input"
          className="w-full border border-gray-300 bg-sky-100 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-pink-500 transition"
        >
          <p className="text-gray-600 mb-4">Drop file to upload</p>
          <div className="w-24 h-24 border border-dashed border-gray-400 flex bg-sky-200 items-center justify-center rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="gray"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 12l-4-4m4 4l4-4m6 8H6a2 2 0 01-2-2v0a2 2 0 012-2h12a2 2 0 012 2v0a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </label>

        {/* Upload Button */}
        <label
          htmlFor="upload-input"
          className="mt-4 bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded shadow cursor-pointer"
        >
          Upload file
        </label>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-sky-400 hover:bg-sky-600 text-white px-4 py-2 rounded shadow"
          >
            <UserPlusIcon className="h-5 w-5" />
            Add as Family
          </button>
          <button
            onClick={handleCheck}
            className="flex items-center gap-2 bg-sky-400 hover:bg-sky-600 text-white px-4 py-2 rounded shadow"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            Check Image
          </button>
        </div>

        {/* Status */}
        <div className="mt-4 text-sm text-blue-700 font-medium text-center">{status}</div>
      </motion.div>

      {/* Dummy Family Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-72 gap-10 max-w-5xl mx-auto">
        {dummyFamily.map((person, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl bg-sky-50 shadow p-4 flex flex-col items-center text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={index + 1}
          >
            <img
              src={person.image}
              alt={person.name}
              className="w-32 h-32 object-cover mb-3 border-4 border-sky-300"
            />
            <h3 className="text-lg font-bold text-sky-800">{person.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{person.relation}</p>
            <p className="text-xs text-gray-500 italic">{person.role}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
