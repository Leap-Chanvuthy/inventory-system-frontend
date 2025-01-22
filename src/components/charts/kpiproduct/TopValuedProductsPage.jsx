import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';

const TopValuedProductsPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/top-valued-products`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const topValuedProducts = response.data.top_valued_products || [];
        setData({
          labels: topValuedProducts.map(item => item.product),
          datasets: [
            {
              label: 'Top Valued Products',
              data: topValuedProducts.map(item => item.value),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching top valued products:', error);
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
      <h3>Top Valued Products</h3>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top Valued Products' },
          },
          scales: {
            y: { beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default TopValuedProductsPage;