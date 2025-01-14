import Partial from "../../../components/Partial";
import SaleInvoiceList from "./partials/SaleInvoiceList";


const SaleInvoice = () => {
  return (
    <div className="w-full ">
      <Partial title="sale invoices" link="list" />

        <SaleInvoiceList />

    </div>
  );
};

export default SaleInvoice;
