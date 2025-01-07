import axios from "axios";
import { Button, Modal, TextInput, Select, Label} from "flowbite-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../../components/const/constant";
import {
  DangerToast,
  SuccessToast,
} from "../../../../../components/ToastNotification";

const SaleOrderExport = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // initial values and its handle change function
  const [values, setValues] = useState({
    id: "",
    payment_method: "",
    order_status: "",
    payment_status: "",
    order_date: "",
    discount_percentage: "",
    tax_percentage: "",
    clearing_payable_percentage: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  // get raw material category
  //   const [categories, setCategories] = useState([]);
  //   console.log(categories);

  //   useEffect(() => {
  //     const getCategory = async (e) => {
  //       try {
  //         const response = await axios.get(
  //           `${BASE_URL}/product-categories/all`
  //         );
  //         console.log(response.data);
  //         setCategories(response.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getCategory();
  //   }, []);

  // get export file
  const exportSaleOrders = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/sale-orders/export`, {
        params: {
          "filter[id]": values.id,
          "filter[payment_method]": values.payment_method,
          "filter[order_status]": values.order_status,
          "fitler[payment_status]": values.quantity,
          "filter[order_date]": values.order_date,
          "filter[discount_percentage]": values.discount_percentage,
          "filter[tax_percentage]": values.tax_percentage,
          "filter[clearing_payable_percentage]":
            values.clearing_payable_percentage,
            "filter[start_date]": values.start_date,
            "filter[end_date]": values.end_date,
          },
          responseType: 'blob',
      });
      console.log(response);
      if (response.status === 200) {
        window.location.href = `${BASE_URL}/sale-orders/export?filter[id]=${values.id}&filter[payment_method]=${values.payment_method}&filter[order_status]=${values.order_status}&filter[payment_status]=${values.payment_status}&filter[order_date]=${values.order_date}&filter[discount_percentage]=${values.discount_percentage}&filter[tax_percentage]=${values.tax_percentage}&filter[clearing_payable_percentage]=${values.clearing_payable_percentage}&filter[start_date]=${values.start_date}&filter[end_date]=${values.end_date}`;
        setOpenModal(false);
        resetFilters();
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

  const resetFilters = () => {
    setValues({
        id: "",
        payment_method: "",
        order_status: "",
        payment_status: "",
        order_date: "",
        discount_percentage: "",
        tax_percentage: "",
        clearing_payable_percentage: "",
        start_date: "",
        end_date: "",
    });
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Export</Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={exportSaleOrders}>
          <Modal.Header className="dark:bg-gray-800 dark:text-white">
            <p className="font-bold">Export</p>
          </Modal.Header>
          <Modal.Body className="dark:bg-gray-800 dark:text-gray-400">
            <div className="grid grid-cols-3 gap-3">
              <div className="mb-4">
                <Label className="font-bold" htmlFor="id" value="ID" />
                <TextInput
                  id="id"
                  type="number"
                  onChange={handleChange}
                  value={values.id}
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="payment_method" value="Payment Method" />
                <Select
                  id="payment_method"
                  onChange={handleChange}
                  value={values.payment_method}
                >
                  <option value="">Select Payment Method</option>
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="CASH">Cash</option>
                  <option value="BANK">Bank</option>
                  <option value="OTHER">Other</option>
                </Select>
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="order_status" value="Order Status" />
                <Select
                  id="order_status"
                  onChange={handleChange}
                  value={values.order_status}
                >
                  <option value="">Select Order Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="DELIVERING">Delivering</option>
                  <option value="COMPLETED">Completed</option>
                </Select>
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="payment_status" value="Payment Status" />
                <Select
                  id="payment_status"
                  onChange={handleChange}
                  value={values.payment_status}
                >
                  <option value="">Select Payment Status</option>
                  <option value="PAID">Paid</option>
                  <option value="UNPAID">Unpaid</option>
                  <option value="INDEBTED">Indebted</option>
                  <option value="OVERPAID">Overpaid</option>
                </Select>
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="order_date" value="Order Date" />
                <TextInput
                  id="order_date"
                  type="date"
                  onChange={handleChange}
                  value={values.order_date}
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold"
                  htmlFor="discount_percentage"
                  value="Discount (%)"
                />
                <TextInput
                  id="discount_percentage"
                  type="number"
                  onChange={handleChange}
                  value={values.discount_percentage}
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="tax_percentage" value="Tax (%)" />
                <TextInput
                  id="tax_percentage"
                  type="number"
                  onChange={handleChange}
                  value={values.tax_percentage}
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold"
                  htmlFor="clearing_payable_percentage"
                  value="Payable Rate (%)"
                />
                <TextInput
                  id="clearing_payable_percentage"
                  type="number"
                  onChange={handleChange}
                  value={values.clearing_payable_percentage}
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="start_date" value="Start Date" />
                <TextInput
                  id="start_date"
                  type="date"
                  onChange={handleChange}
                  value={values.start_date}
                />
              </div>
              <div className="mb-4">
                <Label className="font-bold" htmlFor="end_date" value="End Date" />
                <TextInput
                  id="end_date"
                  type="date"
                  onChange={handleChange}
                  value={values.end_date}
                />
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

            <Button onClick={resetFilters} color="failure">
              Clear
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Product exported successfully !"
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`${error} || Something Went Wrong!"`}
      />
    </>
  );
};

export default SaleOrderExport;
