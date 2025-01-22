import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';

// Import and register necessary Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopValuedRawMaterials = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = useToken();

  useEffect(() => {
    const fetchTopValuedMaterials = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/top-valued-raw-materials`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const topValuedMaterials = response.data.top_valued_raw_materials || [];

        // Update chart data
        setChartData({
          labels: topValuedMaterials.map(item => item.name), // Use 'name' for labels
          datasets: [
            {
              label: 'Top Valued Raw Materials (USD)',
              data: topValuedMaterials.map(item => parseFloat(item.value_usd)), // Use 'value_usd' for data
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching top valued raw materials:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTopValuedMaterials();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Top Valued Raw Materials</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Top Valued Raw Materials (USD)' },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Material',
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Value (USD)',
              },
              ticks: {
                precision: 0, // Ensure whole numbers for better readability
              },
            },
          },
        }}
      />
    </div>
  );
};

export default TopValuedRawMaterials;
