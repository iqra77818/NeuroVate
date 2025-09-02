import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ProgressReport = () => {
  const moodData = [
    { day: 'Mon', mood: '😊', score: 8 },
    { day: 'Tue', mood: '😐', score: 5 },
    { day: 'Wed', mood: '😞', score: 3 },
    { day: 'Thu', mood: '😊', score: 7 },
    { day: 'Fri', mood: '😴', score: 6 },
    { day: 'Sat', mood: '😐', score: 4 },
    { day: 'Sun', mood: '😊', score: 8 },
  ];

  const journalData = [
    { day: 'Mon', count: 2 },
    { day: 'Tue', count: 1 },
    { day: 'Wed', count: 0 },
    { day: 'Thu', count: 3 },
    { day: 'Fri', count: 1 },
    { day: 'Sat', count: 2 },
    { day: 'Sun', count: 4 },
  ];

  const meditationData = [
    { day: 'Mon', sessions: 1 },
    { day: 'Tue', sessions: 0 },
    { day: 'Wed', sessions: 2 },
    { day: 'Thu', sessions: 1 },
    { day: 'Fri', sessions: 0 },
    { day: 'Sat', sessions: 3 },
    { day: 'Sun', sessions: 2 },
  ];

  const memoryGameData = [
    { day: 'Mon', score: 50 },
    { day: 'Tue', score: 55 },
    { day: 'Wed', score: 60 },
    { day: 'Thu', score: 65 },
    { day: 'Fri', score: 62 },
    { day: 'Sat', score: 70 },
    { day: 'Sun', score: 75 },
  ];

  const skippedMeds = [
    { datetime: '2025-08-25 08:00 AM' },
    { datetime: '2025-08-27 09:00 PM' },
  ];

  const moodChartData = {
    labels: moodData.map((d) => d.day),
    datasets: [
      {
        label: 'Mood Score',
        data: moodData.map((d) => d.score),
        backgroundColor: 'rgba(147,197,253,0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const journalChartData = {
    labels: journalData.map((d) => d.day),
    datasets: [
      {
        label: 'Journals Written',
        data: journalData.map((d) => d.count),
        backgroundColor: 'rgba(96, 165, 250, 0.7)',
      },
    ],
  };

  const meditationChartData = {
    labels: meditationData.map((d) => d.day),
    datasets: [
      {
        label: 'Meditation Sessions',
        data: meditationData.map((d) => d.sessions),
        backgroundColor: 'rgba(132, 204, 22, 0.7)', // greenish
      },
    ],
  };

  const memoryChartData = {
    labels: memoryGameData.map((d) => d.day),
    datasets: [
      {
        label: 'Memory Game Score',
        data: memoryGameData.map((d) => d.score),
        backgroundColor: 'rgba(236, 72, 153, 0.7)', // pink
      },
    ],
  };

  return (
    <div className="relative min-h-screen p-6 text-gray-900 bg-pink-200">
      {/* Main Card */}
      <div className="max-w-5xl mx-auto -mt-5 font-notoserif rounded-lg shadow-lg p-6 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center">Weekly Progress Report</h1>

        {/* Mood Overview */}
        <div className="p-4 rounded-lg shadow-md bg-blue-50 dark:bg-blue-900 mb-8">
          <h2 className="text-xl font-semibold mb-3">😊 Mood Overview</h2>
          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {moodData.map((entry) => (
              <div key={entry.day} className="p-2 rounded bg-blue-100 dark:bg-blue-800">
                <p className="font-medium">{entry.day}</p>
                <p className="text-2xl">{entry.mood}</p>
              </div>
            ))}
          </div>
          <Line data={moodChartData} height={150} />
        </div>

        {/* Journals and Meditation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 rounded-lg shadow-md bg-indigo-50 dark:bg-indigo-900">
            <h2 className="text-xl font-semibold mb-3">📓 Journals Written</h2>
            <Bar data={journalChartData} height={150} />
          </div>
          <div className="p-4 rounded-lg shadow-md bg-green-50 dark:bg-green-900">
            <h2 className="text-xl font-semibold mb-3">🧘 Meditation Sessions</h2>
            <Bar data={meditationChartData} height={150} />
          </div>
        </div>

        {/* Memory Improvement */}
        <div className="p-4 rounded-lg shadow-md bg-pink-50 dark:bg-pink-900 mb-8">
          <h2 className="text-xl font-semibold mb-3">🧠 Memory Improvement</h2>
          <Bar data={memoryChartData} height={150} />
        </div>

        {/* Skipped Medications */}
        <div className="p-4 rounded-lg shadow-md bg-red-50 dark:bg-red-900">
          <h2 className="text-xl font-semibold mb-3">💊 Skipped Medications</h2>
          {skippedMeds.length > 0 ? (
            <ul className="list-disc list-inside">
              {skippedMeds.map((item, idx) => (
                <li key={idx}>{item.datetime}</li>
              ))}
            </ul>
          ) : (
            <p className="text-green-600 dark:text-green-400">
              🎉 No medications were skipped this week!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressReport;
