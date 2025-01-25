import CustomerByCategory from "../../../components/charts/customer/CustomerByCategory";
import CustomerByStatus from "../../../components/charts/customer/CustomerByStatus";
import CustomerCount from "../../../components/charts/customer/CustomerCount";
import TopSpentCustomer from "../../../components/charts/customer/TopSpentCustomer";
import Partial from "../../../components/Partial";
import CategoryList from "./partials/CategoryList";
import CustomerList from "./partials/CustomerList";

const Customer = () => {
  return (
    <div className="w-full ">
      <Partial title="customer" link="list" />

      <div className="my-10">
        <CustomerCount />
      </div>
      <CustomerList />
      <div className="grid grid-cols-1 lg:md:grid-cols-2 gap-5 my-5">
        <TopSpentCustomer />
        <CustomerByCategory />
        <CustomerByStatus />
      </div>
    </div>
  );
};

export default Customer;
