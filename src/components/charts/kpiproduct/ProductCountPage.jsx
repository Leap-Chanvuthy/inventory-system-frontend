import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie chart
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';

const ProductCountPage = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

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

        console.log(response.data);

        const {
          product_count = 0,
          product_scrap_count = 0,
          current_stock_value_in_usd = '0',
          current_stock_value_in_riel = '0'
        } = response.data;

        setChartData({
          labels: [
            'Product Count', 
            'Scrap Count', 
            'Stock Value (USD)', 
            'Stock Value (Riel)'
          ],
          datasets: [
            {
              label: 'KPI Metrics',
              data: [
                product_count,
                product_scrap_count,
                parseFloat(current_stock_value_in_usd),
                parseFloat(current_stock_value_in_riel.replace(/,/g, '')), 
          
              ],
              backgroundColor: [
                'rgba(255, 159, 64, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
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

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h3>KPI Metrics</h3>
      <Pie
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Product KPI Metrics' },
          },
        }}
      />
    </div>
  );
};

export default ProductCountPage;