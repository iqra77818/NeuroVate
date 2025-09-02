import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const playlist = [
  {
    title: "Calm Relaxing Piano",
    artist: "Alexander Blu",
    url: "https://www.orangefreesounds.com/wp-content/uploads/2021/02/Calm-relaxing-piano-music.mp3",
  },
  {
    title: "Deep Ambient Music",
    artist: "Alexander Blu",
    url: "https://www.orangefreesounds.com/wp-content/uploads/2020/11/Deep-ambient-music.mp3",
  },
  {
    title: "River Flows in You (Cover)",
    artist: "Yiruma-style",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Lo-Fi Calm",
    artist: "Unknown",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export default function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mt-10 mx-auto p-6"
    >
      {/* Top Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-6xl font-extrabold font-notoserif text-violet-500 dark:text-violet-600 mb-6"
      >
        Music Therapy
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Now Playing Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="md:w-1/2 bg-violet-400 dark:bg-violet-700 text-white rounded-lg p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">
            {playlist[currentIndex].title}
          </h2>
          <h3 className="text-lg mb-4">{playlist[currentIndex].artist}</h3>
          <audio
            ref={audioRef}
            controls
            className="w-full"
            key={playlist[currentIndex].url}
          >
            <source src={playlist[currentIndex].url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </motion.div>

        {/* Playlist Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="md:w-1/2"
        >
          <h2 className="text-2xl font-semibold mb-4 dark:text-gray-300 text-gray-800">
            The Healing Playlist
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {playlist.map((song, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setCurrentIndex(idx)}
                className={`p-4 rounded-lg shadow-md text-left transition cursor-pointer
                  ${
                    idx === currentIndex
                      ? "bg-violet-300 dark:bg-violet-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }
                `}
              >
                <h4 className="font-semibold">{song.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {song.artist}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
