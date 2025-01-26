import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import FinancailKPICard from '../../FinancailKPICard';
import FinancialCardLoading from '../../FinancialCardLoading';

const TotalIncome = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const [values , setValues] = useState({
    total_income_usd_from_customer: 0,
    total_income_riel_from_customer : 0,
    total_indebted_usd_from_customer : 0 ,
    total_indebted_riel_from_customer : 0,
  });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/total-income`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('response:', response);

        setValues({
            total_income_usd_from_customer: response.data.total_income.total_income_usd_from_customer,
            total_income_riel_from_customer : response.data.total_income.total_income_riel_from_customer,
            total_indebted_usd_from_customer : response.data.total_income.total_indebted_usd_from_customer,
            total_indebted_riel_from_customer : response.data.total_income.total_indebted_riel_from_customer,
        })

      } catch (error) {
        console.error('Error fetching total expense:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return (
        <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
            <FinancialCardLoading />
            <FinancialCardLoading />
            <FinancialCardLoading />
            <FinancialCardLoading />
        </div>
    );
  }

  return (
    <div>
      <h3 className='font-bold text-lg'>Income From Customer Summary</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <FinancailKPICard data={values.total_income_usd_from_customer} title="Total Income USD" />
        <FinancailKPICard data={values.total_income_riel_from_customer} title="Total Income Riel"/>
        <FinancailKPICard data={values.total_indebted_usd_from_customer} title="Total Indebted USD" />
        <FinancailKPICard data={values.total_indebted_riel_from_customer} title="Total Indebted Riel"/>
        </div>
    </div>
  );
};

export default TotalIncome;
