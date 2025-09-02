import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const games = [
  {
    id: "memory",
    name: "Memory Match",
    description:
      "Test your memory by matching pairs of cards. Find all pairs to win!",
  },
  {
    id: "color",
    name: "Color Sorting",
    description:
      "Drag and sort the colors in the correct order: Red, Green, Blue.",
  },
  {
    id: "puzzle",
    name: "Simple Puzzle",
    description:
      "Arrange the numbers in ascending order by swapping adjacent tiles.",
  },
];

// Memory Match game
const MemoryMatch = ({ onClose }) => {
  const cardsArray = ["🍎", "🍌", "🍎", "🍌"];
  const [cards, setCards] = React.useState(
    cardsArray
      .map((c) => ({ content: c, matched: false }))
      .sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);

  const flipCard = (index) => {
    if (disabled || flipped.includes(index) || cards[index].matched) return;

    if (flipped.length === 0) {
      setFlipped([index]);
    } else if (flipped.length === 1) {
      const firstIndex = flipped[0];
      if (firstIndex === index) return;
      setFlipped([firstIndex, index]);
      setDisabled(true);
      setTimeout(() => {
        if (cards[firstIndex].content === cards[index].content) {
          setCards((prev) => {
            const newCards = [...prev];
            newCards[firstIndex].matched = true;
            newCards[index].matched = true;
            return newCards;
          });
        }
        setFlipped([]);
        setDisabled(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center  justify-center h-full p-6 bg-pink-200">
      <h2 className="text-4xl font-bold mb-6 text-pink-800">Memory Match</h2>
      <div className="grid grid-cols-2 gap-6 mb-8 max-w-xs w-full">
        {cards.map((card, i) => (
          <button
            key={i}
            className={`h-28 rounded-xl text-5xl flex items-center justify-center
              border transition
              ${
                card.matched || flipped.includes(i)
                  ? "bg-pink-100 border-pink-500"
                  : "bg-pink-300 border-pink-400"
              }`}
            onClick={() => flipCard(i)}
            disabled={card.matched}
          >
            {card.matched || flipped.includes(i) ? card.content : "❓"}
          </button>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Close
      </button>
    </div>
  );
};

// Color Sorting
const ColorSorting = ({ onClose }) => {
  const correctOrder = ["Red", "Green", "Blue"];
  const [colors, setColors] = React.useState(
    ["Red", "Green", "Blue"].sort(() => Math.random() - 0.5)
  );
  const [draggedIndex, setDraggedIndex] = React.useState(null);
  const [message, setMessage] = React.useState("");

  const dragStart = (index) => setDraggedIndex(index);
  const dragOver = (index, e) => {
    e.preventDefault();
    if (index === draggedIndex) return;

    let newColors = [...colors];
    const draggedItem = newColors[draggedIndex];
    newColors.splice(draggedIndex, 1);
    newColors.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setColors(newColors);
  };

  const checkOrder = () => {
    if (colors.join() === correctOrder.join()) {
      setMessage("🎉 Correct Order!");
    } else {
      setMessage("Try Again!");
    }
  };

  const colorBg = (color) =>
    color === "Red"
      ? "bg-pink-600"
      : color === "Green"
      ? "bg-pink-500"
      : "bg-pink-300";

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-pink-200">
      <h2 className="text-4xl font-bold mb-6 text-pink-800">Color Sorting</h2>
      <div className="flex space-x-6 mb-8">
        {colors.map((color, i) => (
          <div
            key={color}
            draggable
            onDragStart={() => dragStart(i)}
            onDragOver={(e) => dragOver(i, e)}
            className={`${colorBg(
              color
            )} w-28 h-28 rounded-xl cursor-move flex items-center justify-center text-white font-bold text-xl select-none`}
          >
            {color}
          </div>
        ))}
      </div>
      <button
        onClick={checkOrder}
        className="mb-3 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Check Order
      </button>
      {message && <p className="mb-8 font-semibold text-pink-700">{message}</p>}
      <button
        onClick={onClose}
        className="mt-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Close
      </button>
    </div>
  );
};

// Simple Puzzle
const SimplePuzzle = ({ onClose }) => {
  const [numbers, setNumbers] = React.useState([3, 1, 2]);
  const [message, setMessage] = React.useState("");

  const swap = (index) => {
    if (index === numbers.length - 1) return;
    const newNumbers = [...numbers];
    [newNumbers[index], newNumbers[index + 1]] = [
      newNumbers[index + 1],
      newNumbers[index],
    ];
    setNumbers(newNumbers);
  };

  const checkSorted = () => {
    if (
      numbers.every((n, i, arr) => (i === 0 ? true : arr[i - 1] <= n))
    ) {
      setMessage("✅ Sorted!");
    } else {
      setMessage("Keep Trying!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-pink-200">
      <h2 className="text-4xl font-bold mb-6 text-pink-800">Simple Puzzle</h2>
      <div className="flex space-x-6 mb-8">
        {numbers.map((num, i) => (
          <button
            key={i}
            onClick={() => swap(i)}
            className="w-20 h-20 bg-pink-400 rounded-xl flex items-center justify-center font-bold text-3xl hover:bg-pink-500 transition"
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={checkSorted}
        className="mb-3 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Check Order
      </button>
      {message && <p className="mb-8 font-semibold text-pink-700">{message}</p>}
      <button
        onClick={onClose}
        className="mt-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
      >
        Close
      </button>
    </div>
  );
};

export default function Gamification() {
  const [playingGame, setPlayingGame] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-pink-200 font-notoserif p-12 flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!playingGame && (
          <motion.div
            key="main"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full max-w-6xl flex flex-col items-center"
          >
            <h1 className="text-5xl font-extrabold mb-12 text-pink-900">
              Gamification Portal
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
              {games.map(({ id, name, description }) => (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-600 rounded-3xl p-8 shadow-lg flex flex-col justify-between min-h-[350px] text-pink-50"
                >
                  <div>
                    <h2 className="text-3xl font-bold mb-3">{name}</h2>
                    <p className="text-pink-100">{description}</p>
                  </div>
                  <button
                    onClick={() => setPlayingGame(id)}
                    className="mt-8 px-8 py-4 bg-pink-700 text-white rounded-xl font-semibold tracking-wide hover:bg-pink-800 transition"
                  >
                    Play
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="mt-14 w-full border-t border-gray-300 pt-6 text-center text-gray-500 font-medium select-none">
              More coming soon...
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {playingGame && (
            <motion.div
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-pink-600 bg-opacity-95 flex items-center justify-center z-50 p-6"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-pink-50 rounded-3xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
              >
                {playingGame === "memory" && (
                  <MemoryMatch onClose={() => setPlayingGame(null)} />
                )}
                {playingGame === "color" && (
                  <ColorSorting onClose={() => setPlayingGame(null)} />
                )}
                {playingGame === "puzzle" && (
                  <SimplePuzzle onClose={() => setPlayingGame(null)} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
}


