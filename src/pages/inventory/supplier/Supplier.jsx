import Partial from "../../../components/Partial";
import SupplierList from "./partials/SupplierList";

const Supplier = () => {
  return (
    <div className="">
      <Partial title="supplier" link="list" />
      <div className="my-5">
        <SupplierList />
      </div>

    </div>
  );
};

export default Supplier;
