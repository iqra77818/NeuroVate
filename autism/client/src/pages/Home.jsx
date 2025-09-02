import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  {
    img: "https://img.freepik.com/premium-photo/doctor-holding-patient-s-hand-reassuring-his-male-patient-helping-hand-concepti_1715-1412.jpg",
    text: "Compassion is the heart of care.",
  },
  {
    img: "https://content.health.harvard.edu/wp-content/uploads/2024/01/05d88a27-79aa-41a2-84f5-91e5b5eb36ff.jpg",
    text: "Together, we make every moment count.",
  },
  {
    img: "https://www.usnews.com/object/image/00000184-5d22-d253-a784-dda799cf0000/gettyimages-1390026192.jpg?update-time=1668009859280&size=responsive640",
    text: "Hope and care light the way forward.",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Slideshow */}
      <div className="relative w-full h-[70vh]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
              ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute left-0 top-0 h-full w-full sm:w-1/2 bg-gradient-to-r from-black/60 to-transparent flex items-start justify-start p-10">
              <div className="mt-[10vh]">
                <p className="text-white text-5xl font-semibold max-w-md leading-snug mb-4">
                  {slide.text}
                </p>
                <p className="text-white font-noto text-base md:text-lg max-w-md">
                  Every mind is unique, and every journey is powerful. This app is here to support and empower individuals with autism — because differences aren't limitations, they're strengths.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome message */}
      <div className="text-center mt-11 py-12 px-6">
        <h2 className="text-3xl font-bold font-noto italic text-gray-800 max-w-6xl mx-auto">
          Welcome to Autism Care — where every moment is met with
          understanding, dignity, and compassion.
        </h2>
      </div>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 pb-16 mt-16 max-w-6xl mx-auto">
        {/* Tip 1 */}
        <motion.div
          className="bg-sky-300 shadow-lg rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2597/2597143.png"
            alt="Support Tip"
            className="w-full h-40 object-contain rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold font-noto italic mb-2">
            Tip: It's okay to need support.
          </h3>
          <p className="text-gray-700 font-noto">
            ✅ Talk to family, friends, or your care team when something feels
            hard.
          </p>
        </motion.div>

        {/* Tip 2 */}
        <motion.div
          className="bg-sky-300 shadow-lg rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706195.png"
            alt="Diet Tip"
            className="w-full h-40 object-contain rounded-md mb-4"
          />
          <h3 className="text-xl font-noto italic font-semibold mb-2">
            Tip: A healthy diet keeps your brain working better.
          </h3>
          <p className="text-gray-700 font-noto">
            ✅ Drink water regularly and eat balanced meals.
          </p>
        </motion.div>

        {/* Tip 3 */}
        <motion.div
          className="bg-sky-300 shadow-lg rounded-lg p-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4396/4396859.png"
            alt="Outdoors Tip"
            className="w-full h-40 object-contain rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold font-noto italic mb-2">
            Tip: Going outside can boost your mood and energy.
          </h3>
          <p className="text-gray-700 font-noto">
            ✅ A short walk or sitting in the garden helps.
          </p>
        </motion.div>
      </div>
    </div>
  );
}











