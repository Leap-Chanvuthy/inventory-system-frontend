import axios from "axios";
import {
  Button,
  Modal,
  TextInput,
  Select,
  Datepicker,
  Label,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../components/const/constant";
import {
  fetchRawMaterialsStart,
  fetchRawMaterialsSuccess,
  fetchRawMaterialsFailure,
} from "../../../../../redux/slices/rawMaterialSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  DangerToast,
  SuccessToast,
} from "../../../../../components/ToastNotification";


const payment_methods = [
    { id: 1, payment_method: "CREDIT_CARD" },
    { id: 2, payment_method: "CASH" },
    { id: 3, payment_method: "BANK" },
    { id: 4, payment_method: "OTHER" },
  ];

const PurchaseInvoiceExport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // initial values and its handle change function
  const [values, setValues] = useState({
    invoice_number : "",
    status : "",
    payment_method : "",
    discount_percentage : "",
    tax_percentage : "",
    clearing_payable_percentage : "",
    start_date : "",
    end_date : "" 
  });

  console.log(values);

  const handleChage = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const resetFilters = () =>{
    setValues({
        invoice_number : "",
        status : "",
        payment_method : "",
        discount_percentage : "",
        tax_percentage : "",
        clearing_payable_percentage : "",
        start_date : "",
        end_date : "" 
    });
  };

  // get export file
  const exportRawMaterials = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/purchase-invoices/export`, {
        params: {
          "filter[invoice_number]": values.invoice_number,
          "filter[status]": values.status,
          "filter[payment_method]": values.payment_method,
          "fitler[discount_percentage]": values.discount_percentage,
          "filter[tax_percentage]": values.tax_percentage,
          "filter[clearing_payable_percentage]": values.clearing_payable_percentage,
          "filter[start_date]": values.start_date,
          "filter[end_date]": values.end_date,
        },
      });
      console.log(response);
      if (response.status === 200) {
        window.location.href = `${BASE_URL}/purchase-invoices/export?filter[invoice_number]=${values.invoice_number}&filter[status]=${values.status}&filter[payment_method]=${values.payment_method}&filter[discount_percentage]=${values.discount_percentage}&filter[tax_percentage]=${values.tax_percentage}&filter[clearing_payable_percentage]=${values.clearing_payable_percentage}&filter[start_date]=${values.start_date}&filter[end_date]=${values.end_date}`;
        setOpenModal(false);
        setValues({
            invoice_number : "",
            status : "",
            payment_method : "",
            discount_percentage : "",
            tax_percentage : "",
            clearing_payable_percentage : "",
            start_date : "",
            end_date : "" 
        });
      }
      setLoading(false);
      setSuccessToastOpen(true);
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.error);
      console.log(err);
      setFailToastOpen(true);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Export</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={exportRawMaterials}>
          <Modal.Header className="dark:bg-gray-800 dark:text-white">
            <p className="font-bold">Export</p>
          </Modal.Header>
          <Modal.Body className="dark:bg-gray-800 dark:text-gray-400">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
              <div>
                  <Label value="Invoice Number" className="font-bold" />
                  <TextInput
                    type="text"
                    id="invoice_number"
                    value={values.invoice_number}
                    onChange={handleChage}
                  />
                </div>

                <div>
                  <Label value="Invoice Status" className="font-bold" />
                  <Select
                    id="status"
                    value={values.status}
                    onChange={handleChage}
                  >
                    <option value="">Select an option</option>
                    <option value="PAID">Paid</option>
                    <option value="UNPAID">Unpaid</option>
                    <option value="INDEBTED">Indebted</option>
                  </Select>
                </div>

                <div>
                  <Label value="Payment Method" className="font-bold" />
                  <Select
                    id="payment_method"
                    value={values.payment_method}
                    onChange={handleChage}
                  >
                    <option value="">Select an option</option>
                    {payment_methods.map((pmt) => (
                        <option key={pmt.id} value={pmt.payment_method}>
                          {pmt.payment_method}
                        </option>
                      ))}
                  </Select>
                </div>

                <div>
                  <Label value="Discount (%)" className="font-bold" />
                  <TextInput
                    type="number"
                    id="discount_percentage"
                    value={values.discount_percentage}
                    onChange={handleChage}
                    min='0'
                    max='100'
                  />
                </div>

                <div>
                  <Label value="Tax (%)" className="font-bold" />
                  <TextInput
                    type="number"
                    id="tax_percentage"
                    value={values.tax_percentage}
                    onChange={handleChage}
                    min='0'
                    max='100'
                  />
                </div>

                <div>
                  <Label value="Payable Rate (%)" className="font-bold" />
                  <TextInput
                    type="number"
                    id="clearing_payable_percentage"
                    value={values.clearing_payable_percentage}
                    onChange={handleChage}
                    min='0'
                    max='100'
                  />
                </div>

                <div>
                  <Label value="From Date" className="font-semibold" />
                  <TextInput
                    type="date"
                    id="start_date"
                    value={values.start_date}
                    onChange={handleChage}
                  />
                </div>
                <div>
                  <Label value="To Date" className="font-semibold" />
                  <TextInput
                    type="date"
                    id="end_date"
                    value={values.end_date}
                    onChange={handleChage}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="dark:bg-gray-800">
            <Button
              type="submit"
              className="dark:bg-cyan-700 dark:hover:bg-cyan-800"
            >
              {loading == true ? "Exporting" : "Export"}
            </Button>
            <Button
              color='failure'
              onClick={resetFilters}
            >
              Clear
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Purchase invoices exported successfully !"
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`${error} || Something Went Wrong!"`}
      />
    </>
  );
};

export default PurchaseInvoiceExport;
