import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import FinancailKPICard from '../../FinancailKPICard';
import NonFinancailKPICard from '../../NonFinancialKPICard';
import FinancialCardLoading from '../../FinancialCardLoading';


const TotalExpense = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const [values , setValues] = useState({
    total_expense_usd_to_supplier: 0,
    total_expense_riel_to_supplier : 0,
    total_indebted_usd_to_supplier : 0 ,
    total_indebted_riel_to_supplier : 0,
  });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/total-expense`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('response:', response);

        setValues({
            total_expense_usd_to_supplier: response.data.total_expenditure.total_expense_usd_to_supplier || 0,
            total_expense_riel_to_supplier: response.data.total_expenditure.total_expense_riel_to_supplier || 0,
            total_indebted_usd_to_supplier: response.data.total_expenditure.total_indebted_usd_to_supplier || 0,
            total_indebted_riel_to_supplier: response.data.total_expenditure.total_indebted_riel_to_supplier || 0,
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
      <h3 className='font-bold text-lg'>Expenditure To Supplier Summary</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <FinancailKPICard data={values.total_expense_usd_to_supplier} title="Total Expense USD" />
        <FinancailKPICard data={values.total_expense_riel_to_supplier} title="Total Expense Riel"/>
        <FinancailKPICard data={values.total_indebted_usd_to_supplier} title="Total Indebted USD" />
        <FinancailKPICard data={values.total_indebted_riel_to_supplier} title="Total Indebted Riel"/>
        </div>
    </div>
  );
};

export default TotalExpense;
