import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { currentUser } = useSelector((state) => state.auth);

  // Allow access if the user is authenticated
  return currentUser?.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PublicRoute;
