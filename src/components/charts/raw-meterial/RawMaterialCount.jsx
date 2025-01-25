import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import FinancailKPICard from '../../FinancailKPICard';
import { current } from '@reduxjs/toolkit';
import NonFinancailKPICard from '../../NonFinancialKPICard';


const RawMaterialCount = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const [values , setValues] = useState({
    raw_material_count: 0,
    raw_material_scrap_count : 0,
    current_stock_value_in_usd : 0 ,
    current_stock_value_in_riel : 0,
  });

  console.log('values:', values);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/raw-material-count`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setValues({
          raw_material_count: response.data.raw_material_count || 0,
          raw_material_scrap_count: response.data.raw_material_scrap_count || 0,
          current_stock_value_in_usd: response.data.current_stock_value_in_usd || 0,
          current_stock_value_in_riel: response.data.current_stock_value_in_riel || 0,
        })

      } catch (error) {
        console.error('Error fetching raw material count:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className='font-bold text-lg'>Raw Material Stock Summary</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <FinancailKPICard data={values.current_stock_value_in_usd} title="Stock Value in USD" />
        <FinancailKPICard data={values.current_stock_value_in_riel} title="Stock Value in Riel"/>
        <NonFinancailKPICard data={values.raw_material_count} title="No. of Raw Material" />
        <NonFinancailKPICard data={values.raw_material_scrap_count} title="No. of Material Scrap" />
        </div>
    </div>
  );
};

export default RawMaterialCount;
