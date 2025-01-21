import { useEffect, useState } from "react";
import {
  Label,
  Select,
  TextInput,
  Button,
  Timeline,
  Alert,
  Spinner,
  Avatar,
  Badge,
  Table,
  Checkbox,
  Tooltip,
  Radio,
} from "flowbite-react";
import { IoCartOutline, IoEyeSharp } from "react-icons/io5";
import { FaFileInvoiceDollar, FaUserTie } from "react-icons/fa6";
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
import { HiArrowRight, HiCalendar, HiInformationCircle } from "react-icons/hi";
import {
  resetMultipleSelectionState,
  resetSingleSelectionState,
  setMultipleSelection,
  setSingleSelection,
  toggleMultipleSelection,
  toggleSingleSelection,
} from "../../../../redux/slices/selectionSlice";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  fetchSaleOrderFailed,
  fetchSaleOrderStart,
  fetchSaleOrderSuccess,
  updateSaleOrderFailed,
  updateSaleOrderStart,
  updateSaleOrderSuccess,
} from "../../../../redux/slices/saleOrderSlice";
import ProductRelationship from "./relationship/ProductRelationship";
import {
  addToCart,
  removeFromCart,
  resetCartItems,
  setCart,
} from "../../../../redux/slices/cartSlice";
import {
  resetProducts,
  setProducts,
  toggleProduct,
  updateQuantity,
} from "../../../../redux/slices/productSelectionSlice";
import CustomerRelationship from "./relationship/CustomerRelationship";
import {
  addCustomerToCart,
  removeCustomerFromCart,
} from "../../../../redux/slices/customerSlice";
import useToken from "../../../../hooks/useToken";

const payment_methods = [
  { id: 1, payment_method: "CREDIT_CARD" },
  { id: 2, payment_method: "CASH" },
  { id: 3, payment_method: "BANK" },
  { id: 4, payment_method: "OTHER" },
];

const order_status = [
  { id: 1, status: "PENDING" },
  { id: 2, status: "PROCESSING" },
  { id: 3, status: "DELIVERING" },
  { id: 4, status: "COMPLETED" },
];

const UpdateForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useToken();
  const { saleOrders, error, status } = useSelector((state) => state.saleOrders);
  const { selectedProducts } = useSelector((state) => state.productSelections);
  const { singleSelection, multipleSelection } = useSelector((state) => state.selections);
  const { cartItems } = useSelector((state) => state.carts);
  const { customerOnCart } = useSelector((state) => state.customers);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const [overQuantityError, setOverQuantityError] = useState(null);

  // console.log("Multiple selections :", multipleSelection);
  // console.log("Cart items :", cartItems);
  // console.log("Product selection :", selectedProducts);

  // Fetch specific sale order
  useEffect(() => {
    const getSaleOrderById = async () => {
      dispatch(fetchSaleOrderStart());
      try {
        const response = await axios.get(`${BASE_URL}/sale-order/${id}` , {
          headers :{
            Authorization : `Bearer ${token}`
          }
        });
        console.log(response);
        dispatch(fetchSaleOrderSuccess(response.data));
      } catch (err) {
        dispatch(fetchSaleOrderFailed(err?.response?.data?.error));
      }
    };
    getSaleOrderById();
  }, [id, dispatch]);

  //initial values
  const [values, setValues] = useState({
    payment_method: "",
    order_status: "",
    order_date: "",
    discount_percentage: 0,
    tax_percentage: 0,
    clearing_payable_percentage: 0,
    customer_id: "",
    products: [],
    // add more field
    payment_status: "",
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

  // Set sale order
  useEffect(() => {
    if (saleOrders) {
      setValues({
        payment_method: saleOrders?.payment_method,
        order_status: saleOrders?.order_status,
        order_date: saleOrders?.order_date,
        discount_percentage: saleOrders?.discount_percentage,
        tax_percentage: saleOrders?.tax_percentage,
        clearing_payable_percentage: saleOrders?.clearing_payable_percentage,
        customer_id: "",
        products: [],
        // More fields
        payment_status: saleOrders?.payment_status,
        discount_value_in_riel: saleOrders?.discount_value_in_riel,
        discount_value_in_usd: saleOrders?.discount_value_in_usd,
        tax_value_in_riel: saleOrders?.tax_value_in_riel,
        tax_value_in_usd: saleOrders?.tax_value_in_usd,
        sub_total_in_riel: saleOrders?.sub_total_in_riel,
        sub_total_in_usd: saleOrders?.sub_total_in_riel,
        grand_total_without_tax_in_riel:
          saleOrders?.grand_total_without_tax_in_riel,
        grand_total_without_tax_in_usd:
          saleOrders?.grand_total_without_tax_in_usd,
        grand_total_with_tax_in_riel: saleOrders?.grand_total_with_tax_in_riel,
        grand_total_with_tax_in_usd: saleOrders?.grand_total_with_tax_in_usd,
        indebted_in_riel: saleOrders?.indebted_in_riel,
        indebted_in_usd: saleOrders?.indebted_in_usd,
      });
    }
    dispatch(
      setMultipleSelection(saleOrders?.products?.map((product) => product.id))
    );
    dispatch(setSingleSelection(saleOrders?.customer?.id));
    dispatch(setCart(saleOrders?.products || []));
    dispatch(addCustomerToCart(saleOrders?.customer));
    dispatch(
      setProducts(
        saleOrders?.products?.map((product) => ({
          id: product.id,
          quantity_sold: product.pivot.quantity_sold,
        })) || []
      )
    );
  }, [saleOrders]);

  // handle values change
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      order_status: value,
    }));
  };

  // Function to hanlde selected id change of raw materials
  const handleMultipleSelect = (id, product) => {
    dispatch(toggleMultipleSelection(id));
    dispatch(toggleProduct({ id }));
    if (multipleSelection.includes(id)) {
      dispatch(removeFromCart({ id }));
    } else {
      dispatch(addToCart(product));
    }
  };

  //Customer selection phase
  const handleCustomerSelection = (customerId, customer) => {
    dispatch(toggleSingleSelection(customerId));
    if (singleSelection == customerId) {
      dispatch(removeCustomerFromCart());
    } else {
      dispatch(addCustomerToCart(customer));
    }
  };

  // stagging phase
  const handleQuantityChange = (id, quantity) => {
    const parsedQuantity = parseInt(quantity);
    dispatch(updateQuantity({ id, quantity_sold: parsedQuantity }));
  };

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      products: selectedProducts,
      customer_id: singleSelection,
    }));
  }, [selectedProducts, singleSelection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateSaleOrderStart());
    try {
      const response = await axios.patch(`${BASE_URL}/sale-order/${id}`, values,
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
    
      );
      console.log(response);
      dispatch(updateSaleOrderSuccess(response.data));
      const updatedSaleOrder = await axios.get(`${BASE_URL}/sale-order/${id}`, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      dispatch(fetchSaleOrderSuccess(updatedSaleOrder.data));
      setSuccessToastOpen(true);
      //   resetForm();
    } catch (err) {
      console.log(err);
      dispatch(updateSaleOrderFailed(err?.response?.data?.errors));
      setOverQuantityError(err?.response?.data?.error);
      setFailToastOpen(true);
    }
  };

  const resetForm = () => {
    dispatch(resetMultipleSelectionState());
    dispatch(resetSingleSelectionState());
    dispatch(resetCartItems());
    dispatch(removeCustomerFromCart());
    dispatch(resetProducts());
  };

  // reset set state when component is unmounted
  useEffect(() => {
    return resetForm();
  }, [location.pathname, dispatch]);

  return (
    <div className="my-5">
      <form onSubmit={handleSubmit}>
        <Timeline>
          <Timeline.Item>
            <Timeline.Point icon={FaFileInvoiceDollar} />
            <Timeline.Content>
              <Timeline.Title>Sale Order Informations</Timeline.Title>
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
                    <div className="mb-5 block">
                      <Label className="font-bold" value="Order Status" />
                    </div>
                    <div className="flex flex-col lg:md:flex-row gap-5">
                      {order_status.map((status) => (
                        <div key={status.id} className="flex items-center mb-2">
                          <Tooltip content="Click to select order status">
                              <Radio
                                id={`order_status_${status.id}`}
                                name="order_status"
                                value={status.status}
                                checked={values.order_status === status.status}
                                onChange={handleRadioChange}
                                className="mr-2 w-5 h-5 cursor-pointer"
                                helperText={
                                    error?.order_status && (
                                    <>
                                        <span className="font-medium text-red-400">
                                        {error.order_status}
                                        </span>
                                    </>
                                    )
                                }
                              />
                          </Tooltip>
                          <Label
                            htmlFor={`order_status_${status.id}`}
                            value={status.status}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Order Date" />
                    </div>
                    <TextInput
                      id="order_date"
                      type="date"
                      onChange={handleChange}
                      value={values.order_date}
                      className={`${
                        error?.order_date
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      helperText={
                        error?.order_date && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.order_date}
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
                      <Label className="font-bold" value="Payment Status" />
                    </div>
                    <TextInput
                      id="payment_status"
                      type="text"
                      min="0"
                      onChange={handleChange}
                      disabled
                      value={values.payment_status}
                      className={`${
                        error?.payment_status
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      helperText={
                        error?.payment_status && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.payment_status}
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
            <Timeline.Point icon={FaUserTie} />
            <Timeline.Content>
              <Timeline.Title>Sale Person Info</Timeline.Title>
              <Timeline.Body>
                <div className="my-5">
                  {error?.vender_id ? (
                    <Alert color="failure" icon={HiInformationCircle}>
                      <span className="font-medium">
                        Customer field is required !
                      </span>{" "}
                      Please login to create sale order.
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="overflow-x-auto lg:max-w-3xl  my-5">
                  <Table hoverable>
                    <Table.Head>
                      <Table.HeadCell>Image</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Sale Person
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Phone
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Email
                      </Table.HeadCell>

                    </Table.Head>
                    <Table.Body className="divide-y">
                      {saleOrders ? (
                        <Table.Row
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Avatar
                              img={
                                saleOrders?.vender?.profile_picture
                                  ? `${BASE_IMAGE_URL}/${saleOrders?.vender?.profile_picture}`
                                  : ""
                              }
                            />
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {saleOrders?.vender?.name}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                color={
                                  saleOrders?.vender
                                    ? "warning"
                                    : "failure"
                                }
                              >
                                {saleOrders?.vender?.phone_number
                                  ? saleOrders?.vender?.phone_number
                                  : "N/A"}
                              </Badge>
                            </div>
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {saleOrders?.vender?.email}
                          </Table.Cell>
                        </Table.Row>
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan="16" className="text-center py-4">
                            No user selected for sale order.
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
            <Timeline.Point icon={FaUserTie} />
            <Timeline.Content>
              <Timeline.Title>Customer</Timeline.Title>
              <Timeline.Body>
                <div className="my-5">
                  {error?.customer_id ? (
                    <Alert color="failure" icon={HiInformationCircle}>
                      <span className="font-medium">
                        Customer field is required !
                      </span>{" "}
                      Please select customer to create sale order.
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>

                <div class="my-5">
                  <CustomerRelationship />
                </div>
                <div className="overflow-x-auto lg:max-w-7xl  my-5">
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>Image</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Customer ID
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Customer Name
                      </Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Phone
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Email
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Shipping Address
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Google Map
                      </Table.HeadCell>
                      <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {customerOnCart ? (
                        <Table.Row
                          key={customerOnCart.id}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Avatar
                              img={
                                customerOnCart.image
                                  ? `${BASE_IMAGE_URL}/${customerOnCart.image}`
                                  : ""
                              }
                            />
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {customerOnCart.id}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {customerOnCart.fullname}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                color={
                                  customerOnCart.category
                                    ? "warning"
                                    : "failure"
                                }
                              >
                                {customerOnCart.category
                                  ? customerOnCart.category.category_name
                                  : "N/A"}
                              </Badge>
                            </div>
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap gap-2">
                              {customerOnCart.customer_status === "ACTIVE" && (
                                <Badge color="success">
                                  {customerOnCart.customer_status}
                                </Badge>
                              )}
                              {customerOnCart.customer_status ===
                                "INACTIVE" && (
                                <Badge color="warning">
                                  {customerOnCart.customer_status}
                                </Badge>
                              )}
                              {customerOnCart.customer_status ===
                                "SUSPENDED" && (
                                <Badge color="failure">
                                  {customerOnCart.customer_status}
                                </Badge>
                              )}
                            </div>
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {customerOnCart.phone_number}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {customerOnCart.email_address ? (
                              customerOnCart.email_address
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                <Badge color="failure">N/A</Badge>
                              </div>
                            )}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {customerOnCart.shipping_address}
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-white">
                            <a
                              href={`https://www.google.com/maps?q=${customerOnCart.latitude},${customerOnCart.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Badge>
                                <div className="flex justify-center items-center gap-1">
                                  <IoEyeSharp /> View
                                </div>
                              </Badge>
                            </a>
                          </Table.Cell>

                          <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-white">
                            <Tooltip content="Click to remove customer">
                              <Checkbox
                                color="failure"
                                className="cursor-pointer text-lg w-5 h-5"
                                checked={singleSelection === customerOnCart.id}
                                onChange={() => {
                                  handleCustomerSelection(
                                    customerOnCart.id,
                                    customerOnCart
                                  );
                                }}
                              />
                            </Tooltip>
                          </Table.Cell>

                          {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              <Button color="failure" onClick={handleCustomerSelection}>Remove</Button>
                            </Table.Cell> */}
                        </Table.Row>
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan="16" className="text-center py-4">
                            No customers selected for sale order.
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
              <Timeline.Title>Products Ordered</Timeline.Title>
              <div className="my-5">
                {error?.products ? (
                  <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">
                      Product Cannot be empty !
                    </span>{" "}
                    Please select at least product to create sale order.
                  </Alert>
                ) : (
                  <></>
                )}
              </div>
              <div className="my-5">
                {overQuantityError ? (
                  <Alert color="failure" icon={HiInformationCircle}>
                    <span className="font-medium">{overQuantityError}</span>
                  </Alert>
                ) : (
                  <></>
                )}
              </div>
              <Timeline.Body>
                <div className="my-5">
                  <ProductRelationship />
                </div>
                <div>
                  <div className="overflow-x-auto">
                    <Table striped>
                      <Table.Head>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Product ID
                        </Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Product Code
                        </Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Product Name
                        </Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Quantity In Stock
                        </Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Quantity
                        </Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Price (usd & riel)
                        </Table.HeadCell>
                        <Table.HeadCell className="whitespace-nowrap">
                          Actions
                        </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {cartItems.length > 0 ? (
                          cartItems.map((product) => {
                            const selectedProduct = selectedProducts.find(
                              (item) => item.id === product.id
                            );
                            const quantitySold = selectedProduct?.quantity_sold;

                            return (
                              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 font-bold text-md">
                                <Table.Cell className="whitespace-nowrap">
                                  {product.product_images &&
                                  product.product_images.length > 0 ? (
                                    <Avatar
                                      img={`${BASE_IMAGE_URL}/${product.product_images[0].image}`}
                                      alt={product.name}
                                      className="w-10 h-10 object-cover"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Table.Cell>
                                <Table.Cell>{product.id}</Table.Cell>
                                <Table.Cell>{product.product_code}</Table.Cell>
                                <Table.Cell>{product.product_name}</Table.Cell>
                                <Table.Cell>
                                  {product.remaining_quantity}
                                </Table.Cell>
                                <Table.Cell>
                                  <div className="flex items-center gap-2">
                                    {/* <Button color='failure'>-</Button> */}
                                    <TextInput
                                      type="number"
                                      min="0"
                                      className="w-16"
                                      style={{ textAlign: "center" }}
                                      value={quantitySold}
                                      onChange={(e) =>
                                        handleQuantityChange(
                                          product.id,
                                          e.target.value
                                        )
                                      }
                                    />
                                    {/* <Button color='success'>+</Button> */}
                                  </div>
                                </Table.Cell>
                                <Table.Cell>
                                  $ {product.unit_price_in_usd} /{" "}
                                  {product.unit_price_in_riel} ៛{" "}
                                </Table.Cell>
                                <Table.Cell>
                                  <Tooltip content="Click to remove products">
                                    <Checkbox
                                      color="failure"
                                      className="cursor-pointer text-lg w-5 h-5"
                                      checked={multipleSelection?.includes(
                                        product.id
                                      )}
                                      onChange={() =>
                                        handleMultipleSelect(
                                          product.id,
                                          product
                                        )
                                      }
                                    />
                                  </Tooltip>
                                </Table.Cell>
                              </Table.Row>
                            );
                          })
                        ) : (
                          <Table.Row>
                            <Table.Cell
                              colSpan="8"
                              className="text-center py-4"
                            >
                              No order product selected.
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>

        <div className="flex gap-5">
          <Link to="/sale-orders" className="text-blue-500 cursor-pointer">
            <Button color="gray">
              <IoIosArrowBack className="mr-2" />
              Back
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={status == "loading"}
            className="w-full"
          >
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
        message="Sale Order Updated Successfully!"
      />
      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something Went Wrong !"
      />
    </div>
  );
};

export default UpdateForm;
