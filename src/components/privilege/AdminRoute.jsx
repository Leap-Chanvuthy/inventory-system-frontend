import { Outlet , Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AdminRoute = () =>{

    const {currentUser} = useSelector((state) => state.auth);

    return currentUser?.user && currentUser?.user?.role == 'ADMIN' ? <Outlet /> : <Navigate to='/login' />

}


export default AdminRoute;