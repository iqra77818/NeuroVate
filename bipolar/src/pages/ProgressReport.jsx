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

  const sleepData = [
    { day: 'Mon', hours: 6 },
    { day: 'Tue', hours: 4 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 7 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 6.5 },
    { day: 'Sun', hours: 7.5 },
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

  const sleepChartData = {
    labels: sleepData.map((d) => d.day),
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepData.map((d) => d.hours),
        backgroundColor: 'rgba(167,139,250,0.7)',
      },
    ],
  };

  return (
    <div className="relative min-h-screen p-6 text-gray-900 dark:text-white">
      {/* Main Card */}
      <div className="max-w-5xl mx-auto -mt-5 font-notoserif rounded-lg shadow-lg p-6 bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center">Weekly Progress Report</h1>

        {/* Mood + Sleep */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Mood Box */}
          <div className="p-4 rounded-lg shadow-md bg-blue-50 dark:bg-blue-900">
            <h2 className="text-xl font-semibold mb-3">😊 Mood Overview</h2>
            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              {moodData.map((entry) => (
                <div
                  key={entry.day}
                  className="p-2 rounded bg-blue-100 dark:bg-blue-800"
                >
                  <p className="font-medium">{entry.day}</p>
                  <p className="text-2xl">{entry.mood}</p>
                </div>
              ))}
            </div>
            <Line data={moodChartData} height={150} />
          </div>

          {/* Sleep Box */}
          <div className="p-4 rounded-lg shadow-md bg-purple-50 dark:bg-purple-900">
            <h2 className="text-xl font-semibold mb-3">🌙 Sleep Pattern</h2>
            <div className="space-y-2 mb-4">
              {sleepData.map((entry) => (
                <div key={entry.day} className="flex justify-between text-sm">
                  <span>{entry.day}</span>
                  <span>{entry.hours} hrs</span>
                </div>
              ))}
            </div>
            <Bar data={sleepChartData} height={150} />
          </div>
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




