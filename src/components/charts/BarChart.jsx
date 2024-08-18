// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
// } from 'chart.js';
// import { useSelector } from 'react-redux';

// ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

// const BarChartComponent = ({ title }) => {
//   const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });

//   // Get the theme from Redux store
//   const { theme } = useSelector((state) => state.theme);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setChartDimensions({ width: 300, height: 200 });
//       } else if (window.innerWidth < 1024) {
//         setChartDimensions({ width: 400, height: 250 });
//       } else {
//         setChartDimensions({ width: 500, height: 300 });
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const data = {
//     labels: ['User', 'Supplier', 'Customer'],
//     datasets: [
//       {
//         label: 'Count',
//         data: [10, 15, 20], // Replace with your data
//         backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
//         borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           color: theme === 'dark' ? '#fff' : '#000',
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return tooltipItem.label + ': ' + tooltipItem.raw;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: theme === 'dark' ? '#444' : '#ddd',
//         },
//       },
//       y: {
//         grid: {
//           color: theme === 'dark' ? '#444' : '#ddd',
//         },
//       },
//     },
//   };

//   return (
//     <div className="my-5 p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
//       <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
//         {title}
//       </h3>
//       <div className="relative h-64 w-full">
//         <Bar data={data} options={options} width={chartDimensions.width} height={chartDimensions.height} />
//       </div>
//     </div>
//   );
// };

// export default BarChartComponent;


import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChartComponent = ({ title }) => {
  const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });

  // Get the theme from Redux store
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartDimensions({ width: 300, height: 200 });
      } else if (window.innerWidth < 1024) {
        setChartDimensions({ width: 400, height: 250 });
      } else {
        setChartDimensions({ width: 500, height: 300 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to determine bar colors based on value
  const getBarColors = (data) => {
    return data.map(value => {
      if (value < 10) return theme === 'dark' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.2)';
      if (value < 20) return theme === 'dark' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0.2)';
      return theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)';
    });
  };

  const data = {
    labels: ['User', 'Supplier', 'Customer'],
    datasets: [
      {
        label: 'Count',
        data: [10, 15, 20], // Replace with your data
        backgroundColor: getBarColors([10, 15, 20]), // Apply colors
        borderColor: getBarColors([10, 15, 20]).map(color => color.replace('0.2', '1')), // Change transparency for border
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: theme === 'dark' ? '#fff' : '#000',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === 'dark' ? '#444' : '#ddd',
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? '#444' : '#ddd',
        },
      },
    },
  };

  return (
    <div className="my-5 p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
        {title}
      </h3>
      <div className="relative h-64 w-full">
        <Bar data={data} options={options} width={chartDimensions.width} height={chartDimensions.height} />
      </div>
    </div>
  );
};

export default BarChartComponent;
