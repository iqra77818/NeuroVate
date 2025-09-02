import './index.css';
import { motion } from 'framer-motion';

function App() {
  const cardData = [
    {
      title: 'Bipolar Disorder',
      image:
        'https://www.verywellmind.com/thmb/2_n8x36nLVe9Gwg1hLWB4BcaoGQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Benjavisa-146ed31676584ae48d70d495855f4f9e.jpg',
      description:
        'Bipolar Disorder is a complex mental health condition characterized by extreme mood swings, including intense emotional highs (mania) and debilitating lows (depression), which can significantly impact daily life and relationships if not managed properly.',
    },
    {
      title: 'Autism',
      image:
        'https://s.abcnews.com/images/GMA/puzzle-child-illo-rf-gty-ps-230323_1679581047759_hpMain.jpg',
      description:
        'Autism Spectrum Disorder (ASD) is a developmental condition that affects communication, social interaction, and behavior. It varies widely in how it presents, with individuals experiencing unique strengths and challenges.',
    },
    {
      title: 'ADHD',
      image:
        'https://cdn.prod.website-files.com/64271cf7f88ba128857fe9b7/646ce0d74f546f2752eb7a26_purp.research.full.PNG',
      description:
        'Attention Deficit Hyperactivity Disorder (ADHD) is a neurodevelopmental disorder marked by difficulties with attention, impulsivity, and hyperactivity. It often affects focus, organization, and behavior across different settings.',
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-black text-white px-6 py-14 flex flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 bg-clip-text text-transparent animate-text-shine">
          NeuroVate
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-gray-300">
          NeuroVate – One platform, three minds. Uniting support for Autism, Bipolar Disorder, and ADHD. NeuroVate
          simplifies care, empowers understanding, and bridges the neurodiverse spectrum with smart, unified tools.
        </p>
      </motion.div>

      {/* Card Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 w-full md:w-1/4 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">{card.title}</h3>
            <img src={card.image} alt={card.title} className="w-80 h-40 object-cover rounded-md mb-4 mx-auto" />
            <p className="text-sm text-gray-300">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Gradient Box with Ticker */}
      <motion.div
        className="mt-24 w-screen rounded-t-3xl bg-gradient-to-r from-blue-900 via-violet-800 to-indigo-900 p-8 shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-ticker text-4xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-green-400 to-cyan-400">
            Bipolar &nbsp;&bull;&nbsp; Autism &nbsp;&bull;&nbsp; ADHD &nbsp;&bull;&nbsp;
            Bipolar &nbsp;&bull;&nbsp; Autism &nbsp;&bull;&nbsp; ADHD &nbsp;&bull;&nbsp;
            Bipolar &nbsp;&bull;&nbsp; Autism &nbsp;&bull;&nbsp; ADHD &nbsp;&bull;&nbsp;
            Bipolar &nbsp;&bull;&nbsp; Autism &nbsp;&bull;&nbsp; ADHD &nbsp;&bull;&nbsp;
            Bipolar &nbsp;&bull;&nbsp; Autism &nbsp;&bull;&nbsp; ADHD &nbsp;&bull;&nbsp;
          </div>
        </div>
      </motion.div>

      {/* CTA Heading */}
      <motion.h2
        className="text-gray-400 text-5xl font-bold text-center mt-20 mb-40"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Start Your Journey Here
      </motion.h2>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-10 mb-16">
        {[
          { label: 'Bipolar Solutions', color: 'violet' },
          { label: 'Autism Solutions', color: 'blue' },
          { label: 'ADHD Solutions', color: 'pink' },
        ].map((btn, index) => (
          <motion.a
            key={btn.label}
            href="#"
            className={`border-4 border-${btn.color}-500 text-${btn.color}-500 px-12 py-10 rounded-xl text-3xl font-semibold hover:bg-${btn.color}-500 hover:text-white transition-colors duration-300 min-w-[280px] text-center`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            viewport={{ once: true }}
          >
            {btn.label}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default App;





