import { TextInput, Label, Button, Spinner, Select } from "flowbite-react";
import { useState } from "react";
import {
  getSuppliersStart,
  getSupplierSuccess,
  getSuppliersFailed,
} from "../../../../../redux/slices/supplierSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";
import { DangerToast, SuccessToast } from "../../../../../components/ToastNotification";

const SupplierExport = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.suppliers);
  // Toast Notification
  const [success, setSuccess] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  const [values, setValues] = useState({
    location: "",
    bank_name: "",
    supplier_status: "",
    supplier_category: "",
    contract_length: "",
    discount_term: "",
    payment_term: "",
  });

  console.log(values);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const exportSupplier = async (e) => {
    e.preventDefault();
    dispatch(getSuppliersStart());
    try {
      const response = await axios.get(`${BASE_URL}/suppliers/export`, {
        params: {
          "filter[location]": values.location,
          "filter[bank_name]": values.bank_name,
          "filter[supplier_status]": values.supplier_status,
          "filter[supplier_category]": values.supplier_category,
          "filter[contract_length]" : values.contract_length,
          "filter[discount_term]" : values.discount_term,
          "filter[payment_term]" : values.payment_term
        },
      });
      console.log(response);

      if (response.status === 200) {
        window.location.href = `${BASE_URL}/suppliers/export?filter[location]=${values.location}&filter[bank_name]=${values.bank_name}&filter[supplier_status]=${values.supplier_status}&filter[supplier_category]=${values.supplier_category}&filter[contract_length]=${values.contract_length}&filter[discount_term]=${values.discount_term}&filter[payment_term]=${values.payment_term}`;
      }
      setSuccess("Suppliers Data Downloaded Successfully!");
      setSuccessToastOpen(true);
      dispatch(getSupplierSuccess("Suppliers exported successfully"));
    } catch (err) {
      console.log(err);
      dispatch(getSuppliersFailed(err?.response?.data));
      setFailToastOpen(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-lg font-semibold">Download Data as Excel File</h2>
        <p>
          Download detailed reports of suppliers directly. The exported file
          will include all relevant information, neatly organized and aligned
          with the column headings .
        </p>
      </div>
      <form onSubmit={exportSupplier}>
        <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3">
          <div>
            <div className="mb-2 block">
              <Label value="Location" />
            </div>
            <TextInput
              id="location"
              type="text"
              value={values.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Bank Name" />
            </div>
            <TextInput
              id="bank_name"
              type="text"
              value={values.bank_name}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <Label htmlFor="supplier_status" value="Supplier Status" />
            <Select
              id="supplier_status"
              type="text"
              placeholder="Website"
              value={values.supplier_status}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </Select>
          </div>

          <div className="w-full">
            <Label htmlFor="supplier_category" value="Supplier Category" />
            <Select
              id="supplier_category"
              type="text"
              placeholder="Website"
              value={values.supplier_category}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              <option value="PRODUCT">Product</option>
              <option value="SERVICE">Service</option>
            </Select>
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Contract Length" />
            </div>
            <TextInput
              id="contract_length"
              type="text"
              value={values.contract_length}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Discount Term" />
            </div>
            <TextInput
              id="discount_term"
              type="text"
              value={values.discount_term}
              onChange={handleChange}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Payment Term" />
            </div>
            <TextInput
              id="payment_term"
              type="text"
              value={values.payment_term}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button type="submit" className="my-3">
          {status == "loading" ? (
            <div className="flex items-center gap-3">
              <Spinner />
              <p>Downloading...</p>
            </div>
          ) : (
            "Download"
          )}
        </Button>
      </form>
      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message={success}
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something Went Wrong!"
      />
    </div>
  );
};

export default SupplierExport;
