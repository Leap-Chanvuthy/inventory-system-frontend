// import { useSelector } from 'react-redux';

// const useToken = () => {
//     const {currentUser} = useSelector((state) => state.auth);

//     const token = currentUser?.authorisation?.token || null;
//     return token;
// }
 
// export default useToken;


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
const useToken = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const token = currentUser?.authorisation?.token || null;

  useEffect(() => {
    if (token) {
      try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));

        const exp = decoded.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= exp) {
          console.log("Token is expired. Logging out...");
          localStorage.removeItem("auth");
          dispatch(logout());
        } else {
          const remainingTime = exp - currentTime;
          console.log(`Token will expire in ${remainingTime / 1000} seconds.`);

          const timeout = setTimeout(() => {
            console.log("Token has expired. Logging out...");
            localStorage.removeItem("auth");
            dispatch(logout());
          }, remainingTime);

          return () => clearTimeout(timeout);
        }
      } catch (error) {
        console.error("Invalid token format or decoding error", error);
      }
    }
  }, [token, dispatch]);

  return token;
};

export default useToken;

