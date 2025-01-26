import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import FinancailKPICard from '../../FinancailKPICard';
import NonFinancailKPICard from '../../NonFinancialKPICard';
import NonFinancialCardLoading from '../../NonFinancialCardLoading';


const TotalInvoice = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const [values , setValues] = useState({
    total_sale_invoice : 0,
    total_purchase_invoice : 0,
  });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/total-invoice`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('response:', response);

        setValues({
            total_sale_invoice: response.data.total_invoice.total_sale_invoice || 0,
            total_purchase_invoice: response.data.total_invoice.total_purchase_invoice || 0,
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
            <NonFinancialCardLoading />
            <NonFinancialCardLoading />
        </div>
    );
  }

  return (
    <div>
      <h3 className='font-bold text-lg'>Invoice Summary</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <NonFinancailKPICard data={values.total_purchase_invoice} title="Total Purchase Invoice" />
        <NonFinancailKPICard data={values.total_sale_invoice} title="Total Sale Invoice"/>
        </div>
    </div>
  );
};

export default TotalInvoice;
