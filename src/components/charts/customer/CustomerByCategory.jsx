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

const CustomerByCategory = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/customer-by-category`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const categories = response.data.categories || [];
        setChartData({
          labels: categories.map(item => item.category), 
          datasets: [
            {
              label: 'Customer by Category',
              data: categories.map(item => item.amount), 
              backgroundColor: '#8B5CF6',
              borderColor: '#8B5CF6',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching customer by category:', error);
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
    <div className='w-full lg:md:h-96'>
      <h3 className='font-bold text-lg'>Customer by Category</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Customer by Category' },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Category',
              },
              grid: {
                color: '#e8e6dc',
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
                color: '#e8e6dc',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CustomerByCategory;


// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import useToken from '../../../hooks/useToken';
// import { BASE_URL } from '../../const/constant';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const CustomerByCategory = () => {
//   const [chartData, setChartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const token = useToken();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/kpi/customer-by-category`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const categories = response.data.categories || [];
//         setChartData({
//           labels: categories.map(item => item.category),
//           datasets: [
//             {
//               label: 'Customer by Category',
//               data: categories.map(item => item.amount),
//               backgroundColor: [
//                 '#FF6384',
//                 '#36A2EB',
//                 '#FFCE56',
//                 '#4BC0C0',
//                 '#9966FF',
//                 '#FF9F40',
//               ],
//               borderColor: [
//                 '#FF6384',
//                 '#36A2EB',
//                 '#FFCE56',
//                 '#4BC0C0',
//                 '#9966FF',
//                 '#FF9F40',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching customer by category:', error);
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
//     <div className='w-full h-96 my-10'>
//       <h3 className='font-bold text-lg'>Customer by Category</h3>
//       <Pie
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Customer by Category' },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   const index = context.dataIndex;
//                   const value = chartData.datasets[0].data[index];
//                   const category = chartData.labels[index];
//                   return `${category}: ${value}`;
//                 },
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default CustomerByCategory;