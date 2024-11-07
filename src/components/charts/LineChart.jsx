// import React from 'react';
// import LineChart from './components/LineChart';

// const LineChartComponent = () => {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Sales for 2024 (in USD)',
//         data: [5000, 7000, 8000, 6000, 12000, 10000, 15000],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         tension: 0.2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Sales Data',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ width: '80%', margin: 'auto' }}>
//       <h2>Sales Line Chart</h2>
//       <LineChart data={data} options={options} />
//     </div>
//   );
// };

// export default LineChartComponent;

// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

// Register the components we need in ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    
    const {theme} = useSelector((state) => state.theme)

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales for 2024 (in USD)',
            data: [5000, 7000, 8000, 6000, 12000, 10000, 15000],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.2, // Adds curve to line
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly Sales Data',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
      
  return <Line data={data} options={options} />;
};

export default LineChart;
