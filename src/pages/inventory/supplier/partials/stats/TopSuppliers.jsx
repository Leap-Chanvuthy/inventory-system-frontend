import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BarChartComponent from '../../../../../components/charts/BarChart';
import { BASE_URL } from '../../../../../components/const/constant';
import axios from 'axios';

const TopSupplier = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchTopSuppliers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/suppliers/stats/top-suppliers`);
        console.log(response);

        const suppliersArray = Object.values(response.data.top_suppliers);
        const formattedData = suppliersArray.map((supplier, index) => ({
          order: supplier.supplier_info.name,
          high: supplier.raw_material_supplied, 
          low: 0,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchTopSuppliers();
  }, []);

  return (
    <div className="w-full">
      <BarChartComponent title="Top 5 Suppliers" dataset={data} />
    </div>
  );
};

export default TopSupplier;
