import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser } = useSelector((state) => state.auth);

  // Allow access if the user is ADMIN or if their role is in the allowedRoles
  return currentUser?.user && (allowedRoles.includes(currentUser?.user?.role) || currentUser?.user?.role === 'ADMIN') 
    ? <Outlet /> 
    : <Navigate to="/login" />;
};

export default ProtectedRoute;
