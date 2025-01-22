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

const RawMaterialByCategory = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/raw-material-by-category`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const categories = response.data.categories || [];
        setChartData({
          labels: categories.map(item => item.category), // Use category as labels
          datasets: [
            {
              label: 'Raw Material by Category',
              data: categories.map(item => item.amount), // Use amount for the data
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching raw material by category:', error);
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
      <h3>Raw Material by Category</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Raw Material by Category' },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Category',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Amount',
              },
              ticks: {
                precision: 0, // Ensure whole numbers on the y-axis
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RawMaterialByCategory;
