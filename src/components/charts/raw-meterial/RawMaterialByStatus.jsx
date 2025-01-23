// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import useToken from '../../../hooks/useToken';
// import { BASE_URL } from '../../const/constant';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const RawMaterialByStatus = () => {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const token = useToken();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/kpi/raw-material-by-status`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const statusData = response.data.status || [];
//         if (statusData.length > 0) {
//           setChartData({
//             labels: statusData.map((item) => item.status),
//             datasets: [
//               {
//                 label: 'Raw Material by Status',
//                 data: statusData.map((item) => item.raw_material_amount),
//                 backgroundColor: statusData.map(
//                   (_, idx) => `rgba(${(idx + 1) * 50}, 102, 255, 0.2)`
//                 ),
//                 borderColor: statusData.map(
//                   (_, idx) => `rgba(${(idx + 1) * 50}, 102, 255, 1)`
//                 ),
//                 borderWidth: 1,
//               },
//             ],
//           });
//         } else {
//           console.warn('No status data available.');
//           setChartData({
//             labels: ['No Data'],
//             datasets: [
//               {
//                 label: 'Raw Material by Status',
//                 data: [0],
//                 backgroundColor: 'rgba(153, 102, 255, 0.2)',
//                 borderColor: 'rgba(153, 102, 255, 1)',
//                 borderWidth: 1,
//               },
//             ],
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching raw material by status:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchData();
//     }
//   }, [token]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h3>Raw Material by Status</h3>
//       {chartData ? (
//         <Bar
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: { position: 'top' },
//               title: { display: true, text: 'Raw Material by Status' },
//             },
//             scales: {
//               y: {
//                 beginAtZero: true,
//                 title: {
//                   display: true,
//                   text: 'Amount',
//                 },
//               },
//             },
//           }}
//         />
//       ) : (
//         <div>No data to display</div>
//       )}
//     </div>
//   );
// };

// export default RawMaterialByStatus;


import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RawMaterialByStatus = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/raw-material-by-status`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const statuses = response.data.status || [];
        setChartData({
          labels: statuses.map(item => item.status),
          datasets: [
            {
              label: 'Raw Material by Status',
              data: statuses.map(item => item.raw_material_amount),
              backgroundColor: '#F59E0B', // Solid color
              borderColor: '#F59E0B', // Solid color
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching raw material by status:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='w-full h-96'>
      <h3 className='font-bold text-lg'>Raw Material by Status</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Raw Material by Status' },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const value = chartData.datasets[0].data[index];
                  const status = chartData.labels[index];
                  return `${status}: ${value}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Status',
              },
              grid: {
                color: '#E5E7EB', // Custom grid color for x-axis
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount',
              },
              ticks: {
                precision: 0,
              },
              grid: {
                color: '#E5E7EB', // Custom grid color for y-axis
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RawMaterialByStatus;