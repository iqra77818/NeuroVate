import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen flex bg-pink-200">
      {/* Left side */}
      <div className="w-1/2 flex items-start justify-center p-12">
        <div>
          <motion.h1
            className="text-6xl font-notoserif font-extrabold text-pink-600 mt-20 mb-9"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.02 }}
          >
            Come as you are. Here, every ADHD journey matters.
          </motion.h1>

          <motion.p
            className="text-xl font-notoserif text-gray-700 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
          >
            Your brain isn’t broken — it’s brilliant. Let’s help it thrive.
          </motion.p>

          {/* Quote Box */}
          <motion.div
            className="bg-white/30 backdrop-blur-md border border-white/50 rounded-lg p-10 max-w-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 30px rgba(0,0,0,0.1)" }}
          >
            <p className="text-gray-800 italic text-lg leading-relaxed">
              “ADHD means you have a race car brain with bicycle brakes. Learn to
              work with it, not against it.”
              <br />
              <span className="font-semibold block mt-4">— Dr. Ned Hallowell</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side: GIF */}
      <div className="w-1/2 flex items-center mb-12 justify-center">
        <motion.img
          src="https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUybG5pdzQ5enZubjg3bjl0NmVleWxjanppMW5jZTR5Z3R2bWlhN2VsOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/QxSRmUeq7RUIHLxADc/source.gif"
          alt="ADHD Animation"
          className="max-w-[500px] max-h-[500px] object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
      </div>
    </div>
  );
};

export default Home;


