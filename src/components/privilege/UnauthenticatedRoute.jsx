import { Outlet , Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const UnauthicatedRoute = () =>{

    const {currentUser} = useSelector((state) => state.auth);

    return !currentUser ? <Outlet /> : <Navigate to='/' />

}


export default UnauthicatedRoute;