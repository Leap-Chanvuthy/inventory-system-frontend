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
// import { useSelector } from 'react-redux';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const TopValuedRawMaterials = () => {
//   const [chartData, setChartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const token = useToken();
//   const {theme} = useSelector((state) => state.theme);

//   useEffect(() => {
//     const fetchTopValuedMaterials = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/kpi/top-valued-raw-materials`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const topValuedMaterials = response.data.top_valued_raw_materials || [];

//         setChartData({
//           labels: topValuedMaterials.map(item => item.name),
//           datasets: [
//             {
//               label: 'Value in USD',
//               data: topValuedMaterials.map(item => parseFloat(item.value_usd.replace(/,/g, ''))),
//               backgroundColor: '#0891B2',
//               borderColor: '#0891B2',
//               borderWidth: 1,
//             },
//             // {
//             //   label: 'Value in Riel',
//             //   data: topValuedMaterials.map(item => parseFloat(item.value_riel.replace(/,/g, ''))),
//             //   backgroundColor: 'rgba(153, 102, 255, 0.2)',
//             //   borderColor: 'rgba(153, 102, 255, 1)',
//             //   borderWidth: 1,
//             // },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching top valued raw materials:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchTopValuedMaterials();
//     }
//   }, [token]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='w-full lg:md:h-96'>
//       <h3 className='font-bold text-lg'>Top 5 Expensive Materials</h3>
//       <Bar
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Top Valued Raw Materials (USD)' },
//           },
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: 'Raw Material Name',
//               },
//               grid: {
//                 color: '#e8e6dc', // Custom grid color for x-axis
//               },
//             },
//             y: {
//               beginAtZero: true,
//               title: {
//                 display: true,
//                 text: 'Amount (USD)',
//               },
//               ticks: {
//                 precision: 0,
//               },
//               grid: {
//                 color: '#e8e6dc', // Custom grid color for x-axis
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default TopValuedRawMaterials;



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
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopValuedRawMaterials = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchTopValuedMaterials = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/top-valued-raw-materials`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const topValuedMaterials = response.data.top_valued_raw_materials || [];

        setChartData({
          labels: topValuedMaterials.map(item => item.name),
          datasets: [
            {
              label: 'Value in USD',
              data: topValuedMaterials.map(item => parseFloat(item.value_usd.replace(/,/g, ''))),
              backgroundColor: '#0891B2',
              borderColor: '#0891B2',
              borderWidth: 1,
              yAxisID: 'y-axis-1',
            },
            {
              label: 'Value in Riel',
              data: topValuedMaterials.map(item => parseFloat(item.value_riel.replace(/,/g, ''))),
              backgroundColor: '#F59E0B',
              borderColor: '#F59E0B',
              borderWidth: 1,
              yAxisID: 'y-axis-2',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching top valued raw materials:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTopValuedMaterials();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full lg:md:h-96'>
      <h3 className='font-bold text-lg'>Top 5 Expensive Materials</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top Valued Raw Materials' },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const value = chartData.datasets[context.datasetIndex].data[index];
                  const material = chartData.labels[index];
                  return `${material}: ${value}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Raw Material Name',
              },
              grid: {
                color: '#e8e6dc', // Custom grid color for x-axis
              },
            },
            'y-axis-1': {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Value in USD',
              },
              grid: {
                color: '#e8e6dc', // Custom grid color for y-axis
              },
              ticks: {
                precision: 0,
              },
            },
            'y-axis-2': {
              type: 'linear',
              position: 'right',
              title: {
                display: true,
                text: 'Value in Riel',
              },
              grid: {
                drawOnChartArea: false, // Only draw grid lines for one y-axis
              },
              ticks: {
                precision: 0,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TopValuedRawMaterials;