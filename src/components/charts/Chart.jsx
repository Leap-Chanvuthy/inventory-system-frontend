import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useSelector } from 'react-redux';

function Chart() {
  const { theme } = useSelector((state) => state.theme); 
  const [chartDimensions, setChartDimensions] = useState({ width: '100%', height: 300 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartDimensions({ width: '100%', height: 200 });
      } else if (window.innerWidth < 1024) {
        setChartDimensions({ width: '100%', height: 250 });
      } else {
        setChartDimensions({ width: '100%', height: 300 });
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: theme === 'dark' ? '#fff' : '#000',
      },
    },
    grid: {
      color: theme === 'dark' ? '#444' : '#ccc',
    },
    xAxis: {
      lineColor: theme === 'dark' ? '#fff' : '#000',
      tickColor: theme === 'dark' ? '#fff' : '#000',
    },
    yAxis: {
      lineColor: theme === 'dark' ? '#fff' : '#000',
      tickColor: theme === 'dark' ? '#fff' : '#000',
    },
  };

  return (
    <div className={`my-5 w-full p-4 border rounded-lg ${theme === 'dark' ? 'dark:border-gray-700' : 'light:border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
        Sales Over Time
      </h3>
      <div className="relative h-64 w-full">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10], color: options.xAxis.lineColor }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              color: '#009099',
            },
          ]}

          grid={options.grid}
        />
      </div>
    </div>
  );
}

export default Chart;
