import { useDispatch, useSelector } from "react-redux";
import { getCurrencyStart , getCurrencySuccess , getCurrencyFailure } from "../redux/slices/currencySlice";
import { useEffect } from "react";

const useCurrency = () =>{

  const dispatch = useDispatch();
  const {currencies , status , error} = useSelector((state) => state.currencies);
  console.log('currency from api :' , currencies);


  useEffect(() => {
    const getCurrency = async (e) => {
      dispatch(getCurrencyStart());
      try {
        const response = await axios.get(`${BASE_URL}/currencies`);
        console.log(response);
        dispatch(getCurrencySuccess(response.data));
      }catch (err){
        console.log('error' , err);
        dispatch(getCurrencyFailure(err?.response?.data));
      }
    } 
    getCurrency();
  } , []);

  return {currencies};
}

export default useCurrency;