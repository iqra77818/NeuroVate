import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-6 min-h-[60vh] flex flex-col items-center justify-center text-black dark:text-white transition-colors duration-300"
    >
      {/* Main Heading with hover animation */}
      <motion.h1
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-5xl md:text-6xl mt-40 font-notoserif font-extrabold dark:text-violet-600 text-violet-400 text-center mb-4 cursor-pointer"
      >
        Empowering Minds Living with Bipolar
      </motion.h1>

      {/* Subheading Line */}
      <p className="text-lg md:text-xl text-center font-notoserif mt-6 italic text-gray-600 dark:text-gray-300 mb-10">
        Helping you thrive through every high and low.
      </p>

      {/* Quote Box */}
      <div className="bg-white/10 mt-20 text-gray-600 dark:bg-white/10 dark:text-gray-400 backdrop-blur-sm rounded-lg p-6 max-w-2xl text-center text-lg md:text-xl font-medium shadow-lg border border-white/20">
        “My dark days made me stronger. Or maybe I already was strong, and they made me prove it.” 
        <br />
        <span className="italic">– Emery Lord</span>
      </div>
    </motion.div>
  );
}







