import { TextInput, Label, Button, Spinner } from "flowbite-react";
import { useState } from "react";
import {
  getSuppliersStart,
  getSupplierSuccess,
  getSuppliersFailed,
} from "../../../../../redux/slices/supplierSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";
import { SuccessToast } from "../../../../../components/ToastNotification";

const SupplierExport = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.suppliers);
  // Toast Notification
  const [success, setSuccess] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const [values, setValues] = useState({
    location: "",
    city: "",
    bank_name: "",
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
          "filter[city]": values.city,
          "filter[bank_name]": values.bank_name,
        },
      });
      console.log(response);

      if (response.status === 200) {
        window.location.href = `${BASE_URL}/suppliers/export?filter[location]=${values.location}&filter[city]=${values.city}&filter[bank_name]=${values.bank_name}`;
      }
      setSuccess("Suppliers Data Downloaded Successfully!");
      setSuccessToastOpen(true);
      dispatch(getSupplierSuccess("Suppliers exported successfully"));
    } catch (err) {
      console.log(err);
      dispatch(getSuppliersFailed(err?.response?.data));
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
              <Label value="City" />
            </div>
            <TextInput
              id="city"
              type="text"
              value={values.city}
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
    </div>
  );
};

export default SupplierExport;
