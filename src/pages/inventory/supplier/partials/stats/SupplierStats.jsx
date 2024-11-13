import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChart from '../../../../../components/charts/PieChart';
import BarChartComponent from '../../../../../components/charts/BarChart';
import { BASE_URL } from '../../../../../components/const/constant';
import TopSupplier from './TopSuppliers';

const SupplierStats = () => {
  const [statusData, setStatusData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/suppliers/stats`);
        setStatusData(response.data.supplier_status || []);
        setCategoryData(response.data.supplier_category || []);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading state
  if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

  const pieData = {
    labels: statusData.map(item => item.supplier_status),
    datasets: [
      {
        label: 'Supplier Status',
        data: statusData.map(item => item.count),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for the BarChart
  const categoryDataset = categoryData.map(item => ({
    order: item.supplier_category,
    high: item.count,
    low: 0,
  }));

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChart data={pieData} title="Supplier Status Distribution" />
        <BarChartComponent title="Supplier Category Distribution" dataset={categoryDataset} />
        <TopSupplier />
      </div>
    </div>
  );
};

export default SupplierStats;
