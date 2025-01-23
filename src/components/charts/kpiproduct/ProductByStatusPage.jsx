import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';

const ProductByStatusPage = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/product-by-status`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const statusData = response.data.status || [];
        setData({
          labels: statusData.map(item => item.status),
          datasets: [
            {
              label: 'Products by Status',
              data: statusData.map(item => item.product_amount),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching products by status:', error);
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
      <h3>Products by Status</h3>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Products by Status' },
          },
          scales: {
            y: { beginAtZero: true },
          },
        }}
      />
    </div>
  );
};

export default ProductByStatusPage;