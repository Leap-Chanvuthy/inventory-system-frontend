import Partial from "../../../components/Partial";
import RecoverSupplierList from "./partials/RecoverSupplierList";

const RecoverSupplier = () => {
  return (
    <div className="">
      <Partial title="supplier" link="recover" />
      <RecoverSupplierList />
    </div>
  );
};

export default RecoverSupplier;
