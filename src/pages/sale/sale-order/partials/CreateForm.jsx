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
} from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";
import { FaFileInvoiceDollar, FaUserTie } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL , BASE_IMAGE_URL } from "../../../../components/const/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  DangerToast,
  SuccessToast,
} from "../../../../components/ToastNotification";
import { HiInformationCircle } from "react-icons/hi";
import {
  resetMultipleSelectionState,
  resetSingleSelectionState,
  toggleMultipleSelection,
  toggleSingleSelection,
} from "../../../../redux/slices/selectionSlice";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import {
  createSaleOrderFailed,
  createSaleOrderStart,
  createSaleOrderSuccess,
} from "../../../../redux/slices/saleOrderSlice";
import ProductRelationship from "./relationship/ProductRelationship";
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart, resetCartItems } from "../../../../redux/slices/cartSlice";
import { resetProducts, toggleProduct, updateQuantity } from "../../../../redux/slices/productSelectionSlice";
import CustomerRelationship from "./relationship/CustomerRelationship";
import { addCustomerToCart, removeCustomerFromCart } from "../../../../redux/slices/customerSlice";
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

const CreateForm = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const { error, status } = useSelector((state) => state.saleOrders);
  const { selectedProducts } = useSelector((state) => state.productSelections);
  const { singleSelection ,  multipleSelection } = useSelector((state) => state.selections);
  const { cartItems } = useSelector((state) => state.carts);
  const { customerOnCart } = useSelector((state) => state.customers);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const [overQuantityError, setOverQuantityError] = useState(null);

  console.log(customerOnCart);

  //initial values
  const [values, setValues] = useState({
    payment_method: "",
    order_status: "",
    order_date: "",
    discount_percentage: 0,
    tax_percentage: 0,
    clearing_payable_percentage: 0,
    customer_id : "",
    products: [],
  });
  console.log("Create form values :" , values);

  // handle values change
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  // Function to hanlde selected id change of raw materials
  const handleMultipleSelect = (id, product) => {
    dispatch(toggleMultipleSelection(id));
    dispatch(toggleProduct({ id }));
    if (multipleSelection.includes(id)){
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
    setValues((prevValues) => ({ ...prevValues, products: selectedProducts , customer_id : singleSelection}));
  }, [selectedProducts , singleSelection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createSaleOrderStart());
    try {
      const response = await axios.post(`${BASE_URL}/sale-order`, values , {
        headers :{
          Authorization : `Bearer ${token}`
        }
      });
      console.log(response);
      dispatch(createSaleOrderSuccess(response.data));
      setSuccessToastOpen(true);
      resetForm();
    } catch (err) {
      console.log(err);
      dispatch(createSaleOrderFailed(err?.response?.data?.errors));
      setOverQuantityError(err?.response?.data?.error);
      setFailToastOpen(true);
    }
  };

  const resetForm = () => {
    setValues({
      payment_method: "",
      order_date: "",
      order_status: "",
      discount_percentage: 0,
      tax_percentage: 0,
      clearing_payable_percentage: 0,
      customer_id : "",
      products: [],
    });
    dispatch(resetMultipleSelectionState());
    dispatch(resetSingleSelectionState());
    dispatch(resetCartItems());
    dispatch(removeCustomerFromCart());
    dispatch(resetProducts());
  };

  // clear state when component is unmount
  useEffect(() =>{
    resetForm();
  },[location.pathname , dispatch]);

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
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Order Status" />
                    </div>
                    <Select
                      id="order_status"
                      onChange={handleChange}
                      value={values.order_status}
                      helperText={
                        error?.order_status && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.order_status}
                            </span>
                          </>
                        )
                      }
                    >
                      <option value="">Select an option</option>
                      {order_status.map((status) => (
                        <option key={status.id} value={status.status}>
                          {status.status}
                        </option>
                      ))}
                    </Select>
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
                      <Table.HeadCell>Customer ID</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Customer Name
                      </Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Phone Number
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Email Address
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">Shipping Address</Table.HeadCell>
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
                                    customerOnCart.category ? "warning" : "failure"
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
                                {customerOnCart.customer_status === "INACTIVE" && (
                                  <Badge color="warning">
                                    {customerOnCart.customer_status}
                                  </Badge>
                                )}
                                {customerOnCart.customer_status === "SUSPENDED" && (
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
                                <Table.Cell>{product.remaining_quantity}</Table.Cell>
                                <Table.Cell>
                                  <div className="flex items-center gap-2">
                                    {/* <Button color='failure'>-</Button> */}
                                    <TextInput
                                      type="number"
                                      min="0"
                                      className="w-16"
                                      style={{ textAlign: 'center' }}
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
                                <Table.Cell>$ {product.unit_price_in_usd} / {product.unit_price_in_riel} ៛ </Table.Cell>
                                <Table.Cell>
                                  <Tooltip content="Click to remove products">
                                    <Checkbox
                                        color="failure"
                                        className="cursor-pointer text-lg w-5 h-5"
                                        checked={multipleSelection?.includes(product.id)}
                                        onChange={() =>
                                          handleMultipleSelect(product.id, product)
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
          <Button color="failure" onClick={resetForm} className="w-sm">
            Cancel
          </Button>
          <Button type="submit" className="w-full">
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
        message="Sale Order Created Successfully!"
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
