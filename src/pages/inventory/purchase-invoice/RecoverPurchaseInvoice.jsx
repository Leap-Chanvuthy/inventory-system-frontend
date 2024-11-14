import Partial from "../../../components/Partial";
import RecoverPurchaseInvoiceList from "./partials/RecoverPurchaseInvoiceList";

const RecoverPurchaseInvoice = () => {
  return (
    <div className="">
      <Partial title="Purchase Invoice" link="recover" />
      <div className="my-5">
        <RecoverPurchaseInvoiceList />
      </div>
    </div>
  );
};

export default RecoverPurchaseInvoice;
