import { useEffect, useState } from "react";
import RawMaterialRelationship from "./relationships/RawMaterialRelationship";
import {
  Label,
  Select,
  TextInput,
  Button,
  Timeline,
  Alert,
  Spinner,
  Table,
  Checkbox,
  Badge,
} from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import {
  addInvoiceStart,
  addInvoiceSuccess,
  addInvoiceFailure,
  fetchInvoiceStart,
  fetchInvoiceSuccess,
  fetchInvoiceFailure,
} from "../../../../redux/slices/invoiceSlice";
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  DangerToast,
  SuccessToast,
} from "../../../../components/ToastNotification";
import { HiInformationCircle } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";

const payment_methods = [
  { id: 1, payment_method: "CREDIT_CARD" },
  { id: 2, payment_method: "CASH" },
  { id: 3, payment_method: "BANK" },
  { id: 4, payment_method: "OTHER" },
];

const UpdateForm = () => {
  const dispatch = useDispatch();
  const { error, status, invoices } = useSelector((state) => state.invoices);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // Fetch invoice by id
  const { id } = useParams();
  useEffect(() => {
    const getInvoice = async (e) => {
      dispatch(fetchInvoiceStart());
      try {
        const response = await axios.get(`${BASE_URL}/purchase-invoice/${id}`);
        dispatch(fetchInvoiceSuccess(response.data));
        console.log("Invoice response:", response);
      } catch (err) {
        console.log(err);
        dispatch(
          fetchInvoiceFailure(err.message || "Error to get data from server")
        );
      }
    };
    getInvoice();
  }, [id, dispatch]);

  //initial values
  const [values, setValues] = useState({
    payment_method: "",
    payment_date: "",
    discount_percentage: "",
    tax_percentage: "",
    clearing_payable_percentage: "",
    raw_materials: [],
  });

  useEffect(() => {
    if (invoices) {
      setValues({
        payment_method: invoices?.payment_method || "",
        payment_date: invoices?.payment_date || "",
        discount_percentage: invoices?.discount_percentage || "",
        tax_percentage: invoices?.tax_percentage || "",
        clearing_payable_percentage: invoices?.clearing_payable_percentage || "",
        raw_materials: invoices?.purchase_invoice_details?.map((raw_material_ids) => raw_material_ids?.id) ||[],
      });
    }
  }, [invoices]);

  console.log(values);

  // handle selected raw material ids changes
//   const [selectedRawMaterialIds, setSelectedRawMaterialIds] = useState([]);
//   const handleRawMaterialsSelected = (selectedIds) => {
//     setSelectedRawMaterialIds(selectedIds);
//     setValues((prevValues) => ({ ...prevValues, raw_materials: selectedIds }));
//   };
    const handleRawMaterialsSelected = (selectedIds) => {
        setValues((prevValues) => ({...prevValues, raw_materials: Array.from(new Set([...prevValues.raw_materials, ...selectedIds])),}));
    };
  

  // toggle raw material ids from api
  const toggleRawMaterial = (materialId) => {
    setValues((prevValues) => ({
      ...prevValues,
      raw_materials: prevValues.raw_materials.includes(materialId)
        ? prevValues.raw_materials.filter((id) => id !== materialId)
        : [...prevValues.raw_materials, materialId],
    }));
  };

  // handle values change
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

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
      });
    } catch (err) {
      console.log(err);
      dispatch(addInvoiceFailure(err?.response?.data?.errors));
      setFailToastOpen(true);
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
              <Timeline.Title>Invoice Details</Timeline.Title>
              <Timeline.Body>
                <div className="overflow-x-auto lg:max-w-6xl  my-5">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell className="whitespace-nowrap">
                        Select
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Code
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Status
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Category
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Quantity
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Remaining Quantity
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Unit Price in USD
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Total Value in USD
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Unit Price in Riel
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Total Value in Riel
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {invoices?.purchase_invoice_details?.length > 0 ? (
                        invoices?.purchase_invoice_details.map(
                          (invoiceDetail) => (
                            <Table.Row
                              key={invoiceDetail.id}
                              className="bg-white dark:border-gray-700 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
                            >
                              <Table.Cell>
                                <Checkbox
                                  checked={values.raw_materials.includes(
                                    invoiceDetail.id
                                  )}
                                  onChange={() => toggleRawMaterial(invoiceDetail.id)}
                                />
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {invoiceDetail?.raw_material?.material_code}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div className="flex flex-wrap gap-2">
                                  {invoiceDetail?.raw_material?.status ===
                                    "IN_STOCK" && (
                                    <Badge color="success">
                                      {invoiceDetail?.raw_material?.status}
                                    </Badge>
                                  )}
                                  {invoiceDetail?.raw_material?.status ===
                                    "OUT_OF_STOCK" && (
                                    <Badge color="failure">
                                      {invoiceDetail?.raw_material?.status}
                                    </Badge>
                                  )}
                                </div>
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                <div className="flex flex-wrap gap-2">
                                  <Badge
                                    color={
                                      invoiceDetail?.raw_material?.category
                                        ? "warning"
                                        : "failure"
                                    }
                                  >
                                    {invoiceDetail?.raw_material?.category
                                      ? invoiceDetail?.raw_material?.category
                                          ?.category_name
                                      : "NULL"}
                                  </Badge>
                                </div>
                              </Table.Cell>

                              <Table.Cell className="whitespace-nowrap">
                                {invoiceDetail?.raw_material?.quantity}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {
                                  invoiceDetail?.raw_material
                                    ?.remaining_quantity
                                }
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {invoiceDetail?.raw_material?.unit_price_in_usd}{" "}
                                ($)
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {
                                  invoiceDetail?.raw_material
                                    ?.total_value_in_usd
                                }{" "}
                                ($)
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {
                                  invoiceDetail?.raw_material
                                    ?.unit_price_in_riel
                                }{" "}
                                (៛)
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {
                                  invoiceDetail?.raw_material
                                    ?.total_value_in_riel
                                }
                                ​​ (​៛)
                              </Table.Cell>
                            </Table.Row>
                          )
                        )
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan="8" className="text-center py-4">
                            No purchase invoice found.
                          </Table.Cell>
                        </Table.Row>
                      )}
                    </Table.Body>
                  </Table>
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={MdOutlineAdd} />
            <Timeline.Content>
              <Timeline.Title>Add More Raw Materials</Timeline.Title>
              <div className="my-5">
                {error?.raw_materials ? (
                  <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">
                      Raw Material Cannot be NULL !
                    </span>{" "}
                    Please select at least one raw material to create invoice.
                  </Alert>
                ) : (
                  <></>
                )}
              </div>
              <Timeline.Body>
                <RawMaterialRelationship
                //   onRawMaterialsSelected={handleRawMaterialsSelected}
                                  onRawMaterialsSelected={handleRawMaterialsSelected}
                  selectedRawMaterials={values.raw_materials}
                />
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        <Button className="w-full" type="submit">
          {status == "loading" ? <Spinner /> : "Save"}
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

export default UpdateForm;