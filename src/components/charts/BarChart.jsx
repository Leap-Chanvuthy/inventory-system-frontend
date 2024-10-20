import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';

const BarChartComponent = ({ title, dataset }) => {
  const [chartHeight, setChartHeight] = useState(300);
  
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(200);
      } else if (window.innerWidth < 1024) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`w-full my-5 p-4 border ${
        theme === 'dark' ? 'dark:border-gray-700' : 'light:border-gray-200'
      } rounded-lg`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h3>
      <Stack direction="column" spacing={1} >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={dataset} layout='horizontal'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="order" stroke={theme === 'dark' ? '#fff' : '#000'} />
            <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
            <Tooltip />
            <Legend />
            <Bar dataKey="high" fill={theme === 'dark' ? '#ff7300' : '#82ca9d'} />
            <Bar dataKey="low" fill={theme === 'dark' ? '#387908' : '#8884d8'} />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </div>
  );
};

export default BarChartComponent;
