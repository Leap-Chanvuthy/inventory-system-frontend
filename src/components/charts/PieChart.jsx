// import React, { useState, useEffect } from 'react';
// import { Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { useSelector } from 'react-redux';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ data, title }) => {
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
//     window.addEventListener('resize', handleResize); // Adjust on resize

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

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
//     },
//   };

//   return (
//     <div className="my-5 w-full lg:md:w-xl p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
//       <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
//         {title}
//       </h3>
//       <div className="relative h-64 w-full dark:text-gray-200">
//         <Pie data={data} options={options} width={chartDimensions.width} height={chartDimensions.height} />
//       </div>
//     </div>
//   );
// };

// export default PieChart;



import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
  const { theme } = useSelector((state) => state.theme);
  const [chartDimensions, setChartDimensions] = useState({ width: '110%', height: 300 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartDimensions({ width: '100%', height: 200 }); // For small screens
      } else if (window.innerWidth < 1024) {
        setChartDimensions({ width: '100%', height: 250 }); // For medium screens
      } else {
        setChartDimensions({ width: '100%', height: 300 }); // For large screens
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize); // Adjust on resize

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    },
  };

  return (
    <div className="my-5 w-full p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
        {title}
      </h3>
      <div className="relative h-64 w-full dark:text-gray-200">
        <Pie data={data} options={options} width={chartDimensions.width} height={chartDimensions.height} />
      </div>
    </div>
  );
};

export default PieChart;
