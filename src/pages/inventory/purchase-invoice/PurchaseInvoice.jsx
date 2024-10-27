import Partial from "../../../components/Partial";
import PurchaseInvoiceList from "./partials/PurchaseInvoiceList";

const PurchaseInvoice = () => {
  return (
    <div className="">
      <Partial title="Purchase Invoice" link="list" />
      <div className="my-5">
        <PurchaseInvoiceList />
      </div>

    </div>
  );
};

export default PurchaseInvoice;
