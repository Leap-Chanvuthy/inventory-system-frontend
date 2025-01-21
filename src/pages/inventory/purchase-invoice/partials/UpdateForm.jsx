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
  Avatar,
} from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";
import { GrUserWorker } from "react-icons/gr";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import {
  fetchInvoiceStart,
  fetchInvoiceSuccess,
  fetchInvoiceFailure,
  updateInvoiceStart,
  updateInvoiceSuccess,
  updateInvoiceFailure,
} from "../../../../redux/slices/invoiceSlice";
import axios from "axios";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../components/const/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  DangerToast,
  SuccessToast,
} from "../../../../components/ToastNotification";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import {
  resetMultipleSelectionState,
  setMultipleSelection,
  toggleMultipleSelection,
} from "../../../../redux/slices/selectionSlice";
import { IoIosArrowBack } from "react-icons/io";
import useToken from "../../../../hooks/useToken";

const payment_methods = [
  { id: 1, payment_method: "CREDIT_CARD" },
  { id: 2, payment_method: "CASH" },
  { id: 3, payment_method: "BANK" },
  { id: 4, payment_method: "OTHER" },
];

const UpdateForm = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const { error, status, invoices } = useSelector((state) => state.invoices);
  console.log(invoices);
  const { multipleSelection } = useSelector((state) => state.selections);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const [supplierMisMatchError, setSupplierMisMatchError] = useState(null);

  // Fetch invoice by id
  const { id } = useParams();
  useEffect(() => {
    const getInvoice = async (e) => {
      dispatch(fetchInvoiceStart());
      try {
        const response = await axios.get(`${BASE_URL}/purchase-invoice/${id}` ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    // invoice details
    invoice_number: "",
    status: "",
    discount_value_in_riel: "",
    discount_value_in_usd: "",
    tax_value_in_riel: "",
    tax_value_in_usd: "",
    sub_total_in_riel: "",
    sub_total_in_usd: "",
    grand_total_without_tax_in_riel: "",
    grand_total_without_tax_in_usd: "",
    grand_total_with_tax_in_riel: "",
    grand_total_with_tax_in_usd: "",
    indebted_in_riel: "",
    indebted_in_usd: "",
  });

  console.log(values);

  useEffect(() => {
    if (invoices) {
      setValues({
        payment_method: invoices?.payment_method || "",
        payment_date: invoices?.payment_date || "",
        discount_percentage: invoices?.discount_percentage || "",
        tax_percentage: invoices?.tax_percentage || "",
        clearing_payable_percentage:
          invoices?.clearing_payable_percentage || "",
        raw_materials: invoices?.purchase_invoice_details?.map(
          (detail) => detail.raw_material_id
        ),
        // invoice detail
        invoice_number: invoices?.invoice_number,
        status: invoices?.status,
        discount_value_in_riel: invoices?.discount_value_in_riel,
        discount_value_in_usd: invoices?.discount_value_in_usd,
        tax_value_in_riel: invoices?.tax_value_in_riel,
        tax_value_in_usd: invoices?.tax_value_in_usd,
        sub_total_in_riel: invoices?.sub_total_in_riel,
        sub_total_in_usd: invoices?.sub_total_in_riel,
        grand_total_without_tax_in_riel:
          invoices?.grand_total_without_tax_in_riel,
        grand_total_without_tax_in_usd:
          invoices?.grand_total_without_tax_in_usd,
        grand_total_with_tax_in_riel: invoices?.grand_total_with_tax_in_riel,
        grand_total_with_tax_in_usd: invoices?.grand_total_with_tax_in_usd,
        indebted_in_riel: invoices?.indebted_in_riel,
        indebted_in_usd: invoices?.indebted_in_usd,
      });
    }
    dispatch(
      setMultipleSelection(
        invoices?.purchase_invoice_details?.map(
          (detail) => detail.raw_material_id
        )
      )
    );
  }, [invoices]);

  // Reset multiple selection state when component unmount
  useEffect(() => {
    dispatch(resetMultipleSelectionState());
  },[location.pathname , dispatch]);


  // handle values change
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleMultipleSelect = (id) => {
    dispatch(toggleMultipleSelection(id));
  };

  // handle selected raw material ids changes
  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      raw_materials: multipleSelection,
    }));
  }, [multipleSelection]);

  // handle update invoice function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateInvoiceStart());
    try {
      const response = await axios.patch(
        `${BASE_URL}/purchase-invoice/${id}`, values , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
      console.log(response);
      dispatch(updateInvoiceSuccess(response));
      setSuccessToastOpen(true);
      // Fetch the updated invoice details to ensure data consistency
      const updatedInvoice = await axios.get(`${BASE_URL}/purchase-invoice/${id}`, {
        headers :{
          Authorization : `Bearer ${token}`
        },
      });
      dispatch(fetchInvoiceSuccess(updatedInvoice.data));
      dispatch(resetMultipleSelectionState());
    } catch (err) {
      console.log(err);
      dispatch(updateInvoiceFailure(err?.response?.data?.errors));
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

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Invoice No." />
                    </div>
                    <TextInput
                      id="invoice_number"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.invoice_number}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Invoice Status." />
                    </div>
                    <TextInput
                      id="status"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.status}
                    />
                  </div>
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={GrUserWorker} />
            <Timeline.Content>
              <Timeline.Title>Supplier</Timeline.Title>
              <Timeline.Body>
                <div className="overflow-x-auto lg:max-w-6xl  my-5">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>Image</Table.HeadCell>
                      <Table.HeadCell>ID</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Name / Company
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Phone Number
                      </Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Location</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Contact Person
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Business Reg. No.
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Bank Account No.
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Bank Name
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Supplier Code
                      </Table.HeadCell>
                      <Table.HeadCell>Address</Table.HeadCell>
                      <Table.HeadCell>Email</Table.HeadCell>
                      <Table.HeadCell>Website</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Social Media
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {invoices.supplier ? (
                        <Table.Row
                          key={invoices.supplier.id}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Avatar
                              img={
                                invoices.supplier.image
                                  ? `${BASE_IMAGE_URL}/${invoices.supplier.image}`
                                  : ""
                              }
                            />
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.id}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.name}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.phone_number}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.supplier_category ===
                              "PRODUCT" && (
                              <Badge color="success">
                                {invoices.supplier.supplier_category}
                              </Badge>
                            )}
                            {invoices.supplier.supplier_category ===
                              "SERVICE" && (
                              <Badge color="warning">
                                {invoices.supplier.supplier_category}
                              </Badge>
                            )}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap gap-2">
                              {invoices.supplier.supplier_status ===
                                "ACTIVE" && (
                                <Badge color="success">
                                  {invoices.supplier.supplier_status}
                                </Badge>
                              )}
                              {invoices.supplier.supplier_status ===
                                "INACTIVE" && (
                                <Badge color="warning">
                                  {invoices.supplier.supplier_status}
                                </Badge>
                              )}
                              {invoices.supplier.supplier_status ===
                                "SUSPENDED" && (
                                <Badge color="failure">
                                  {invoices.supplier.supplier_status}
                                </Badge>
                              )}
                            </div>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.location}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.contact_person}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.business_registration_number}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.bank_account_number}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.bank_name}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.supplier_code}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.address}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {invoices.supplier.email}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <a
                              href={invoices.supplier.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {invoices.supplier.website}
                            </a>
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <a
                              href={invoices.supplier.social_media}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {invoices.supplier.social_media}
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan="16" className="text-center py-4">
                            No suppliers.
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
                      <Table.HeadCell>ID</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Code
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Product Name
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
                                  checked={multipleSelection?.includes(
                                    invoiceDetail.raw_material_id
                                  )}
                                  onChange={() =>
                                    handleMultipleSelect(
                                      invoiceDetail.raw_material_id
                                    )
                                  }
                                />
                              </Table.Cell>
                              <Table.Cell>
                                {invoiceDetail?.raw_material?.id}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {invoiceDetail?.raw_material?.material_code}
                              </Table.Cell>
                              <Table.Cell className="whitespace-nowrap">
                                {invoiceDetail?.raw_material?.name}
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
            <Timeline.Point icon={IoCartOutline} />
            <Timeline.Content>
              <Timeline.Title>Invoice Value in Riel</Timeline.Title>
              <Timeline.Body>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 my-5">
                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Discount Value (៛)" />
                    </div>
                    <TextInput
                      id="discount_value_in_riel"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.discount_value_in_riel}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Tax Value (៛)" />
                    </div>
                    <TextInput
                      id="tax_value_in_riel"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.tax_value_in_riel}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Sub Total (៛)" />
                    </div>
                    <TextInput
                      id="sub_total_in_riel"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.sub_total_in_riel}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="font-bold"
                        value="Grand Total (No Tax Included)"
                      />
                    </div>
                    <TextInput
                      id="grand_total_without_tax_in_riel"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.grand_total_without_tax_in_riel}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="font-bold"
                        value="Grand Total (Tax Included)"
                      />
                    </div>
                    <TextInput
                      id="grand_total_with_tax_in_riel"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.grand_total_with_tax_in_riel}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Indebted (៛)" />
                    </div>
                    <TextInput
                      id="indebted_in_riel"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.indebted_in_riel}
                    />
                  </div>
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={IoCartOutline} />
            <Timeline.Content>
              <Timeline.Title>Invoice Value in USD</Timeline.Title>
              <Timeline.Body>
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 my-5">
                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Discount Value ($)" />
                    </div>
                    <TextInput
                      id="discount_value_in_usd"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.discount_value_in_usd}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Tax Value ($)" />
                    </div>
                    <TextInput
                      id="tax_value_in_usd"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.tax_value_in_usd}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Sub Total ($)" />
                    </div>
                    <TextInput
                      id="sub_total_in_usd"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.sub_total_in_usd}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="font-bold"
                        value="Grand Total (No Tax Included)"
                      />
                    </div>
                    <TextInput
                      id="grand_total_without_tax_in_usd"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.grand_total_without_tax_in_usd}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label
                        className="font-bold"
                        value="Grand Total (Tax Included)"
                      />
                    </div>
                    <TextInput
                      id="grand_total_with_tax_in_usd"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.grand_total_with_tax_in_usd}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Indebted ($)" />
                    </div>
                    <TextInput
                      id="indebted_in_usd"
                      disabled
                      type="text"
                      onChange={handleChange}
                      value={values.indebted_in_usd}
                    />
                  </div>
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

                {supplierMisMatchError ? (
                  <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">{supplierMisMatchError}</span>
                  </Alert>
                ) : (
                  <></>
                )}
              </div>
              <Timeline.Body>
                <RawMaterialRelationship createStatus={status} />
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        {/* <Button className="w-full" type="submit">
          {status == "loading" ? <Spinner /> : "Save"}
        </Button> */}

        <div className="flex gap-5">
          <Link
            to="/purchase-invoices"
            className="text-blue-500 cursor-pointer"
          >
            <Button color="gray">
              <IoIosArrowBack className="mr-2" />
              Back
            </Button>
          </Link>
          <Button disabled={status == 'loading'} type="submit" className="w-full">
            {status === "loading" ? (
              <div>
                <Spinner /> Saving
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>

      </form>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Purchase Invoice Updated Successfully"
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
