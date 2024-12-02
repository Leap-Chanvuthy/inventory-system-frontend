import { useEffect, useState } from "react";
import RawMaterialRelationship from "./relationships/RawMaterialRelationship";
import { Label, Select, TextInput, Button, Timeline, Alert, Spinner } from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import {
  addInvoiceStart,
  addInvoiceSuccess,
  addInvoiceFailure,
} from "../../../../redux/slices/invoiceSlice";
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  DangerToast,
  SuccessToast,
} from "../../../../components/ToastNotification";
import { HiInformationCircle } from "react-icons/hi";
import { resetMultipleSelectionState } from "../../../../redux/slices/selectionSlice";

const payment_methods = [
  { id: 1, payment_method: "CREDIT_CARD" },
  { id: 2, payment_method: "CASH" },
  { id: 3, payment_method: "BANK" },
  { id: 4, payment_method: "OTHER" },
];

const CreateForm = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.invoices);
  const { multipleSelection } = useSelector((state) => state.selections);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const [supplierMisMatchError , setSupplierMisMatchError] = useState(null);

  //initial values
  const [values, setValues] = useState({
    payment_method: "",
    payment_date: "",
    discount_percentage: 0,
    tax_percentage: 0,
    clearing_payable_percentage: "",
    raw_materials: [],
  });
  console.log(values);


  // handle values change
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  useEffect(() =>{
    setValues((prevValues) => ({...prevValues , raw_materials : multipleSelection}))
  },[multipleSelection])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addInvoiceStart());
    try {
      const response = await axios.post(`${BASE_URL}/purchase-invoice`, values);
      console.log(response);
      dispatch(addInvoiceSuccess(response.data));
      setSuccessToastOpen(true);
      setValues({
        payment_method: "",
        payment_date: "",
        discount_percentage: "",
        tax_percentage: "",
        clearing_payable_percentage: "",
        raw_materials: [],
      })
      dispatch(resetMultipleSelectionState());
    } catch (err) {
      console.log(err);
      dispatch(addInvoiceFailure(err?.response?.data?.errors));
      setFailToastOpen(true);
      setSupplierMisMatchError(err?.response?.data?.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Timeline>
          <Timeline.Item>
            <Timeline.Point icon={FaFileInvoiceDollar} />
            <Timeline.Content>
              <Timeline.Title>Invoice Information</Timeline.Title>
              <Timeline.Body>
                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-5 my-5">
                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Payment Method" />
                    </div>
                    <Select
                      id="payment_method"
                      onChange={handleChange}
                      value={values.payment_method}
                      helperText={
                        error?.payment_method && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.payment_method}
                            </span>
                          </>
                        )
                      }
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
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Payment Date" />
                    </div>
                    <TextInput
                      id="payment_date"
                      type="date"
                      onChange={handleChange}
                      value={values.payment_date}
                      className={`${
                        error?.payment_date
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      helperText={
                        error?.payment_date && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.payment_date}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Discount (%)" />
                    </div>
                    <TextInput
                      id="discount_percentage"
                      type="number"
                      min="0"
                      
                      onChange={handleChange}
                      value={values.discount_percentage}
                      className={`${
                        error?.discount_percentage
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      helperText={
                        error?.discount_percentage && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.discount_percentage}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Tax (%)" />
                    </div>
                    <TextInput
                      id="tax_percentage"
                      type="number"
                      min="0"
                      
                      onChange={handleChange}
                      value={values.tax_percentage}
                      className={`${
                        error?.tax_percentage
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      helperText={
                        error?.tax_percentage && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.tax_percentage}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Payable Rate (%)" />
                    </div>
                    <TextInput
                      id="clearing_payable_percentage"
                      type="number"
                      min="0"
                      
                      onChange={handleChange}
                      value={values.clearing_payable_percentage}
                      className={`${
                        error?.clearing_payable_percentage
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      helperText={
                        error?.clearing_payable_percentage && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.clearing_payable_percentage}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={IoCartOutline} />
            <Timeline.Content>
              <Timeline.Title>Invoice Items</Timeline.Title>
                <div className="my-5">
                    {error?.raw_materials ?  
                        <Alert color="failure" icon={HiInformationCircle}>
                            <span className="font-medium">Raw Material Cannot be NULL !</span> Please select at least one raw material to create invoice.
                        </Alert> : <></>
                    }  

                    {supplierMisMatchError ?  
                        <Alert color="failure" icon={HiInformationCircle}>
                            <span className="font-medium">{supplierMisMatchError}</span>
                        </Alert> : <></>
                    }  
                </div>
              <Timeline.Body>
                <RawMaterialRelationship createStatus={status} />
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        <Button className="w-full" type="submit">
          {status == 'loading' ? <Spinner /> : 'Save'}
        </Button>
      </form>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Purchase Invoice Created Successfully!"
      />
      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something Went Wrong!"
      />
    </div>
  );
};

export default CreateForm;
