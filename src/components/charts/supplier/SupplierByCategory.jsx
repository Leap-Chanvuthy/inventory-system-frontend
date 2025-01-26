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

const SupplierByCategory = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/supplier-by-category`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const categories = response.data.categories || [];
        setChartData({
          labels: categories.map(item => item.supplier_category), 
          datasets: [
            {
              label: 'Supplier by Category',
              data: categories.map(item => item.count), 
              backgroundColor: '#8B5CF6',
              borderColor: '#8B5CF6',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching supplier by category:', error);
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
      <h3 className='font-bold text-lg'>Supplier by Category</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Supplier by Category' },
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

export default SupplierByCategory;
