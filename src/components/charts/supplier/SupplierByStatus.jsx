import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { BASE_URL } from '../../const/constant';
import useToken from '../../../hooks/useToken';
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

const SupplierByStatus = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/supplier-by-status`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const statuses = response.data.status[0] || [];
        setChartData({
          labels: statuses.map(item => item.supplier_status),
          datasets: [
            {
              label: 'Supplier by Status',
              data: statuses.map(item => item.count),
              backgroundColor: '#F59E0B',
              borderColor: '#F59E0B',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching supplier by status:', error);
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
    <div className='w-full h-96 my-10'>
      <h3 className='font-bold text-lg'>Supplier by Status</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Supplier by Status' },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const value = chartData.datasets[0].data[index];
                  const status = chartData.labels[index];
                  return `${status}: ${value}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Status',
              },
              grid: {
                color: '#E5E7EB',
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
                color: '#E5E7EB',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SupplierByStatus;