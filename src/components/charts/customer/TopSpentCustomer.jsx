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

// const TopSpentCustomer = () => {
//   const [chartData, setChartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const token = useToken();
//   const {theme} = useSelector((state) => state.theme);

//   useEffect(() => {
//     const fetchTopValuedMaterials = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/kpi/top-spent-customers`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const topSpentCustomers = response.data.top_spent_customers || [];

//         setChartData({
//           labels: topSpentCustomers.map(item => item.customer_name),
//           datasets: [
//             {
//               label: 'Total Spent in USD',
//               data: topSpentCustomers.map(item => parseFloat(item.total_spent_in_usd.replace(/,/g, ''))),
//               backgroundColor: '#0891B2',
//               borderColor: '#0891B2',
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching top spent customer:', error);
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
//       <h3 className='font-bold text-lg'>Top 5 Spent Customers</h3>
//       <Bar
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Top Spent Customer (USD)' },
//           },
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: 'Customer Name',
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

// export default TopSpentCustomer;



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

const TopSpentCustomer = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/top-spent-customers`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const customers = response.data.top_spent_customers || [];
        const customerNames = customers.map(item => item.customer_name);
        const totalSpentInUSD = customers.map(item => parseFloat(item.total_spent_in_usd.replace(/,/g, '')));
        const totalSpentInRiel = customers.map(item => parseFloat(item.total_spent_in_riel.replace(/,/g, '')));

        setChartData({
          labels: customerNames,
          datasets: [
            {
              label: 'Total Spent (USD)',
              data: totalSpentInUSD,
              backgroundColor: '#0891B2',
              borderColor: '#0891B2',
              borderWidth: 1,
              yAxisID: 'y-axis-1',
            },
            {
              label: 'Total Spent (Riel)',
              data: totalSpentInRiel,
              backgroundColor: '#F59E0B',
              borderColor: '#F59E0B',
              borderWidth: 1,
              yAxisID: 'y-axis-2',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching top spent customers:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-96'>
      <h3 className='font-bold text-lg'>Top Spent Customers</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top Spent Customers' },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const value = chartData.datasets[context.datasetIndex].data[index];
                  const customer = chartData.labels[index];
                  return `${customer}: ${value}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Customer Name',
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
                text: 'Total Spent (USD)',
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
                text: 'Total Spent (Riel)',
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

export default TopSpentCustomer;