import React, { useEffect, useRef, useState } from 'react';
import { loadModels, detectEmotion } from '../ai/emotion';
import useSocket from '../hooks/useSocket';
import { CameraIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

export default function Emotion({ token }) {
  const videoRef = useRef();
  const [status, setStatus] = useState('Loading models...');
  const socketRef = useSocket(token);

  useEffect(() => {
    (async () => {
      await loadModels();
      setStatus('Models loaded. Opening camera...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStatus('Detecting...');
      } catch (e) {
        setStatus('Camera access denied');
      }
    })();
  }, []);

  useEffect(() => {
    let t;
    const loop = async () => {
      const r = await detectEmotion(videoRef.current);
      if (r) {
        setStatus(`Detected: ${r.emotion} (${(r.confidence * 100).toFixed(0)}%)`);
        socketRef.current?.emit('emotionAlert', {
          patientId: 'demo-patient',
          expression: r.emotion,
          confidence: r.confidence,
        });
      }
      t = setTimeout(loop, 1500);
    };
    loop();
    return () => clearTimeout(t);
  }, [socketRef.current]);

  const dummyReports = [
    {
      date: '2025-08-30',
      emotions: {
        '😊 Happy': 70,
        '😢 Sad': 20,
        '😠 Angry': 10,
        '😰 Stressed': 40,
        '😲 Surprised': 50,
      },
    },
    {
      date: '2025-08-29',
      emotions: {
        '😊 Happy': 40,
        '😢 Sad': 35,
        '😠 Angry': 20,
        '😰 Stressed': 30,
        '😲 Surprised': 60,
      },
    },
  ];

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-blue-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <motion.h1
        className="text-2xl md:text-3xl font-notoserif font-extrabold text-center text-sky-600 mb-6"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        The Language of Faces: Emotion Recognition for Autism
      </motion.h1>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Left: Camera Feed */}
        <motion.div
          className="bg-white rounded-xl h-[430px] shadow p-4 flex flex-col items-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <video
            ref={videoRef}
            width={320}
            height={240}
            className="rounded shadow border border-sky-300"
          />

          <div className="mt-4 p-2 bg-sky-200 text-sky-800 rounded w-full text-center text-sm font-medium">
            {status}
          </div>

          <button className="mt-6 bg-sky-700 hover:bg-blue-700 text-white p-4 rounded-full shadow-md flex items-center justify-center">
            <CameraIcon className="h-8 w-8" />
          </button>
        </motion.div>

        {/* Right: Reports */}
        <div className="flex flex-col gap-6">
          {dummyReports.map((report, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-4 rounded-xl shadow w-full"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 + idx * 0.2 }}
            >
              <h3 className="text-xl font-notoserif font-semibold text-sky-700 mb-3 text-center">
                Report – {report.date}
              </h3>
              <div className="space-y-3">
                {Object.entries(report.emotions).map(([emotion, value]) => (
                  <div key={emotion}>
                    <div className="text-sm text-gray-700 mb-1">{emotion}</div>
                    <div className="w-full bg-sky-200 rounded-full h-4">
                      <motion.div
                        className="bg-sky-300 h-4 rounded-full"
                        style={{ width: `${value}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 0.8 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}




