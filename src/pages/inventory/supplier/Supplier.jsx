import SupplierByCategory from "../../../components/charts/supplier/SupplierByCategory";
import SupplierByStatus from "../../../components/charts/supplier/SupplierByStatus";
import Partial from "../../../components/Partial";
import SupplierList from "./partials/SupplierList";
import TopSupplier from "../../../components/charts/supplier/TopSupplier";

const Supplier = () => {
  return (
    <div className="">
      <Partial title="supplier" link="list" />
      <SupplierList />
      <div className="grid grid-cols-1 lg:md:grid-cols-2 gap-5 my-5">
        <TopSupplier />
        <SupplierByCategory />
        <SupplierByStatus />
      </div>

    </div>
  );
};

export default Supplier;
