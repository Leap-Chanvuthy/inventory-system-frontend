import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';

const CustomerByStatus = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/customer-by-status`, {
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
              label: 'Customer by Status',
              data: statusData.map(item => item.amount),
              backgroundColor: '#F59E0B', // Solid color
              borderColor: '#F59E0B', // Solid color
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching customer by status:', error);
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
      <h3 className='font-bold text-lg'>Customer by Status</h3>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Customer by Status' },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Status',
              },
              grid: {
                color: '#e8e6dc', // Custom grid color for x-axis
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
                color: '#e8e6dc', // Custom grid color for x-axis
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CustomerByStatus;