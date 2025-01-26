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

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const TopSupplier = () => {
//   const [chartData, setChartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const token = useToken();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/kpi/top-suppliers`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const suppliers = response.data.top_suppliers[0] || [];
//         const supplierNames = Object.values(suppliers).map(item => item.supplier_info.name);
//         const rawMaterialSupplied = Object.values(suppliers).map(item => item.raw_material_supplied);
//         const totalAmount = Object.values(suppliers).map(item => item.total_amount);

//         setChartData({
//           labels: supplierNames,
//           datasets: [
//             {
//               label: 'Raw Material Supplied',
//               data: rawMaterialSupplied,
//               backgroundColor: '#0891B2',
//               borderColor: '#0891B2',
//               borderWidth: 1,
//             },
//             {
//                 label: 'Total Profit',
//                 data: totalAmount,
//                 backgroundColor: '#F59E0B',
//                 borderColor: '#F59E0B',
//                 borderWidth: 1,
//               },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching top suppliers:', error);
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
//       <h3 className='font-bold text-lg'>Top Suppliers</h3>
//       <Bar
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Top Valued' },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   const index = context.dataIndex;
//                   const value = chartData.datasets[0].data[index];
//                   const supplier = chartData.labels[index];
//                   return `${supplier}: ${value}`;
//                 },
//               },
//             },
//           },
//           scales: {
//             x: {
//               title: {
//                 display: true,
//                 text: 'Raw Material Supplied',
//               },
//               grid: {
//                 color: '#e8e6dc', // Custom grid color for x-axis
//               },
//             },
//             y: {
//               beginAtZero: true,
//               title: {
//                 display: true,
//                 text: 'Amount of Raw Material Supplied',
//               },
//               ticks: {
//                 precision: 0,
//               },
//               grid: {
//                 color: '#e8e6dc', // Custom grid color for y-axis
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default TopSupplier;



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

const TopSupplier = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const token = useToken();
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/kpi/top-suppliers`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
  
          const suppliers = response.data.top_suppliers[0] || [];
          const supplierNames = Object.values(suppliers).map(item => item.supplier_info.name);
          const rawMaterialSupplied = Object.values(suppliers).map(item => item.raw_material_supplied);
          const totalAmount = Object.values(suppliers).map(item => parseFloat(item.total_amount.replace(/,/g, '')));
  
          setChartData({
            labels: supplierNames,
            datasets: [
              {
                label: 'Raw Material Supplied',
                data: rawMaterialSupplied,
                backgroundColor: '#0891B2',
                borderColor: '#0891B2',
                borderWidth: 1,
                yAxisID: 'y-axis-1',
              },
              {
                label: 'Total Amount (USD)',
                data: totalAmount,
                backgroundColor: '#F59E0B',
                borderColor: '#F59E0B',
                borderWidth: 1,
                yAxisID: 'y-axis-2',
              },
            ],
          });
        } catch (error) {
          console.error('Error fetching top suppliers:', error);
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
        <h3 className='font-bold text-lg'>Top Suppliers</h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Most Active Suppliers' },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const index = context.dataIndex;
                    const value = chartData.datasets[context.datasetIndex].data[index];
                    const supplier = chartData.labels[index];
                    return `${supplier}: ${value}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Supplier',
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
                  text: 'Raw Material Supplied',
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
                  text: 'Total Amount (USD)',
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
  
  export default TopSupplier;