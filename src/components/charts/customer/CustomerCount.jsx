import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';
import { BASE_URL } from '../../const/constant';
import FinancailKPICard from '../../FinancailKPICard';
import NonFinancailKPICard from '../../NonFinancialKPICard';


const CustomerCount = () => {
  const [loading, setLoading] = useState(true);
  const token = useToken();
  const [values , setValues] = useState({
    customer_count: 0,
  });

  console.log('values:', values);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/kpi/customer-count`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        setValues({
          customer_count: response.data.customer_count || 0,
        })

      } catch (error) {
        console.error('Error fetching customer count:', error);
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
      <h3 className='font-bold text-lg'>Customer Summary</h3>
      <div className="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 my-5">
        <NonFinancailKPICard data={values.customer_count} title="No. of Customers" />
        </div>
    </div>
  );
};

export default CustomerCount;
