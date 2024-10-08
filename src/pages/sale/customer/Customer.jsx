import Partial from "../../../components/Partial";
import CustomerList from "./partials/CustomerList";

const Customer = () => {
  return (
    <div className="w-full ">
      <Partial title="customer" link="list" />
      <CustomerList />
    </div>
  );
};

export default Customer;
