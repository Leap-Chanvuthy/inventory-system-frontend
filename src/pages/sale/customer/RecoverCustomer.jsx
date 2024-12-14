import Partial from "../../../components/Partial";
import RecoverCustomerList from "./partials/RecoverCustomerList";

const RecoverCustomer = () => {
  return (
    <div className="">
      <Partial title="customers" link="recover" />
      <div className="my-5">
        <RecoverCustomerList />
      </div>
    </div>
  );
};

export default RecoverCustomer;
