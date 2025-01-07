import Partial from "../../../components/Partial";
import RecoverSaleOrderList from "./partials/RecoverSaleOrderList";

const RecoverSaleOrder = () => {
  return (
    <div className="w-full ">
      <Partial title="sale orders" link="recover" />
        <RecoverSaleOrderList />
    </div>
  );
};

export default RecoverSaleOrder;
