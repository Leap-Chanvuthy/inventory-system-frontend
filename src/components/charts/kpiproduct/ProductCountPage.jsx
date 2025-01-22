import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
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

        const {
          product_count = 0,
          product_scrap_count = 0,
          current_stock_value_in_usd = '0',
        } = response.data;

        setChartData({
          labels: ['Product Count', 'Scrap Count', 'Stock Value (USD)'],
          datasets: [
            {
              label: 'KPI Metrics',
              data: [
                product_count,
                product_scrap_count,
                parseFloat(current_stock_value_in_usd),
              ],
              backgroundColor: [
                'rgba(255, 159, 64, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 159, 64, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
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
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Product KPI Metrics' },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Values',
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

export default ProductCountPage;
