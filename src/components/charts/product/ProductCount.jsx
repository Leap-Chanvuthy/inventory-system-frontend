// import React, { useEffect, useState } from 'react';
// import { Pie } from 'react-chartjs-2'; // Import Pie chart
// import axios from 'axios';
// import useToken from '../../../hooks/useToken';
// import { BASE_URL } from '../../const/constant';

// const ProductCountPage = () => {
//   const [chartData, setChartData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const token = useToken();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${BASE_URL}/kpi/product-count`, {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log(response.data);

//         const {
//           product_count = 0,
//           product_scrap_count = 0,
//           current_stock_value_in_usd = '0',
//           current_stock_value_in_riel = '0'
//         } = response.data;

//         setChartData({
//           labels: [
//             'Product Count', 
//             'Scrap Count', 
//             'Stock Value (USD)', 
//             'Stock Value (Riel)'
//           ],
//           datasets: [
//             {
//               label: 'KPI Metrics',
//               data: [
//                 product_count,
//                 product_scrap_count,
//                 parseFloat(current_stock_value_in_usd),
//                 parseFloat(current_stock_value_in_riel.replace(/,/g, '')), 
          
//               ],
//               backgroundColor: [
//                 'rgba(255, 159, 64, 0.6)',
//                 'rgba(75, 192, 192, 0.6)',
//                 'rgba(153, 102, 255, 0.6)',
//                 'rgba(255, 99, 132, 0.6)',
//                 'rgba(54, 162, 235, 0.6)',
//                 'rgba(255, 206, 86, 0.6)',
//               ],
//               borderColor: [
//                 'rgba(255, 159, 64, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//               ],
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching product count:', error);
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
//       <h3>KPI Metrics</h3>
//       <Pie
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: { position: 'top' },
//             title: { display: true, text: 'Product KPI Metrics' },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default ProductCountPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import FinancailKPICard from '../../FinancailKPICard';
import NonFinancailKPICard from '../../NonFinancialKPICard';
import FinancialCardLoading from '../../FinancialCardLoading';
import NonFinancialCardLoading from '../../NonFinancialCardLoading';


const ProductCount = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const [values , setValues] = useState({
    product_count: 0,
    product_scrap_count : 0,
    current_stock_value_in_usd : 0 ,
    current_stock_value_in_riel : 0,
  });

  console.log('values:', values);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/product-count`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setValues({
          product_count: response.data.product_count || 0,
          product_scrap_count: response.data.product_scrap_count || 0,
          current_stock_value_in_usd: response.data.current_stock_value_in_usd || 0,
          current_stock_value_in_riel: response.data.current_stock_value_in_riel || 0,
        })

      } catch (error) {
        console.error('Error fetching product count:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <FinancialCardLoading />
        <FinancialCardLoading />
        <NonFinancialCardLoading />
        <NonFinancialCardLoading />
      </div>
    );
  }

  return (
    <div>
      <h3 className='font-bold text-lg'>Product Stock Summary</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <FinancailKPICard data={values.current_stock_value_in_usd} title="Stock Value in USD" currency="៛" />
        <FinancailKPICard data={values.current_stock_value_in_riel} title="Stock Value in Riel" currency="$" />
        <NonFinancailKPICard data={values.product_count} title="No. of Products" />
        <NonFinancailKPICard data={values.product_scrap_count} title="No. of Products Scrap" />
        </div>
    </div>
  );
};

export default ProductCount;
