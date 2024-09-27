import { useState , useEffect } from "react";
import axios from "axios";
import { addUserStart , addUserSuccess , addUserFailure } from "../../../../redux/slices/userSlice";
import { useSelector ,  useDispatch } from "react-redux";
import { BASE_URL } from "../../../../components/const/constant";
import PieChart from "../../../../components/charts/PieChart";



const UserRoleStat = () => {
    const [userRole, setUserRole] = useState([]);
    const [loading, setLoading] = useState(true);
  


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/users/role-counts`);
            setUserRole(response.data.user_role || []);
          } catch (error) {
            console.error("Error fetching data", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

      const pieData = {
        labels: userRole.map(item => item.role),
        datasets: [
          {
            label: 'Supplier Status',
            data: userRole.map(item => item.count),
            backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderWidth: 2,
          },
        ],
      };

    return (  
        <PieChart data={pieData} title="User Role" />
    );
}
 
export default UserRoleStat;