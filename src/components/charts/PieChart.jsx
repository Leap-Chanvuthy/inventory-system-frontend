import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, options }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for dark mode in the user's preferences
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    // Listen for changes to the color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setTheme(e.matches ? 'dark' : 'light');
    });
  }, []);

  // Default options for the Pie chart
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: theme === 'dark' ? '#fff' : '#000', // Adjusts color based on theme
        },
      },
    },
  };

  return (
    <div className="w-full h-96 dark:bg-gray-800 bg-white shadow rounded-lg p-5">
      <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
        Pie Chart
      </h2>
      <div className="h-full">
        <Pie data={data} options={options || defaultOptions} />
      </div>
    </div>
  );
};

export default PieChart;
