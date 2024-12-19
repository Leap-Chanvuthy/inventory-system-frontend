import Partial from "../../../components/Partial";
import SaleOrderList from "./partials/list/SaleOrderList";


const SaleOrder = () => {
  return (
    <div className="w-full ">
      <Partial title="sale orders" link="list" />

        <SaleOrderList />

    </div>
  );
};

export default SaleOrder;
