// Simple server-side risk scorer (can be expanded to ML later)
function scoreEmotion(emotion) {
  if (!emotion) return { risk: 'low', explanation: 'No emotion' };
  const high = ['sad','angry','disgusted','fearful','stressed'];
  if (high.includes(emotion)) return { risk: 'high', explanation: `Detected ${emotion}` };
  if (emotion === 'neutral') return { risk: 'medium', explanation: 'Neutral expression' };
  return { risk: 'low', explanation: `Detected ${emotion}` };
}

module.exports = { scoreEmotion };
