import Partial from "../../../components/Partial";
import CategoryList from "./partials/CategoryList";
import CustomerList from "./partials/CustomerList";

const Customer = () => {
  return (
    <div className="w-full ">
      <Partial title="customer" link="list" />
      <CustomerList />
      <CategoryList />
    </div>
  );
};

export default Customer;
