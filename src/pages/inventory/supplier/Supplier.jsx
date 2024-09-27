import Partial from "../../../components/Partial";
import SupplierStats from "./partials/stats/SupplierStats";
import SupplierList from "./partials/SupplierList";

const Supplier = () => {
  return (
    <div className="">
      <Partial title="supplier" link="list" />
      <SupplierStats />
      <div className="my-5">
        <SupplierList />
      </div>

    </div>
  );
};

export default Supplier;
