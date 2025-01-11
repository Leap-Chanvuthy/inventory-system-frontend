import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  Table,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";
import {
  DangerToast,
  SuccessToast,
} from "../../../../../components/ToastNotification";
import { IoIosArrowBack } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSingleSelectionState,
  toggleSingleSelection,
} from "../../../../../redux/slices/selectionSlice";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { HiInformationCircle } from "react-icons/hi";
import ProductRelationship from "../relationships/ProductRelationship";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../../../../redux/slices/productSlice";

const Create = () => {
  const { productOnCart } = useSelector((state) => state.products);
  const { singleSelection } = useSelector((state) => state.selections);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [overQuantityError, setOverQuantityError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);

  // initial values

  const [values, setValues] = useState({
    product_id: "",
    quantity: "",
    reason: "",
  });

  console.log("Form values :", values);

  // function to handle values changing
  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    setValues({ ...values, [key]: value });
  };

  // handle raw_material_id change
  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      product_id: singleSelection,
    }));
  }, [singleSelection]);

  // Function to hanlde selected id change of raw materials
  const handleSingleSelect = (id, material) => {
    dispatch(toggleSingleSelection(id));
    if (singleSelection == id) {
      dispatch(removeProductFromCart({ id }));
    } else {
      dispatch(addProductToCart(material));
    }
  };

  // clear single selection state when component is unmounted
  useEffect(() => {
    dispatch(resetSingleSelectionState());
    dispatch(removeProductFromCart());
  }, [location.pathname, dispatch, openModal]);

  // Sending post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/product-scrap`, values);
      console.log(response);
      setLoading(false);
      setSuccessToastOpen(true);
      setOpenModal(false);
      resetForm();
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.errors);
      setOverQuantityError(err?.response?.data?.error);
      setFailToastOpen(true);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setValues({
      product_id: "",
      quantity: "",
      reason: "",
    });
    setError(null);
    setOverQuantityError(null);
    dispatch(removeProductFromCart());
    dispatch(resetSingleSelectionState());
  };

  function onCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <Tooltip content="Click to create">
        <Button onClick={() => setOpenModal(true)}>
          <div className="flex items-center gap-1">Create New</div>
        </Button>
      </Tooltip>
      <Modal show={openModal} size="6xl" onClose={onCloseModal} popup>
        <Modal.Header>
          <h3 className="font-semibold p-4">Create Product Scrap</h3>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center gap-3">
                <Alert color="warning" className="w-full" icon={IoCartOutline}>
                  <span className="font-bold">Select Product Scrapping</span>
                </Alert>
                <ProductRelationship />
              </div>

              {/* Table */}
              <div className="overflow-x-auto lg:max-w-6xl  my-5">
                <div className="my-5">
                  {error?.product_id ? (
                    <Alert color="failure" icon={HiInformationCircle}>
                      <span className="font-medium">
                        Product cannot be empty !
                      </span>{" "}
                      Please select product to create.
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
                <Table striped>
                  <Table.Head>
                    <Table.HeadCell>Select</Table.HeadCell>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Product Code
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Product Name
                    </Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Quantity</Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Remaining Quantity
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Warehouse location
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Unit Price in USD
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Total Value in USD
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Exchange Rate USD to Riel
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Unit Price in Riel
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Total Value in Riel
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Exchange Rate Riel to USD
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Minimum Stock
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Created
                    </Table.HeadCell>
                    <Table.HeadCell className="whitespace-nowrap">
                      Updated
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {productOnCart ? (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                          <Checkbox
                            checked={singleSelection == productOnCart.id}
                            onChange={() =>
                              handleSingleSelect(
                                productOnCart.id,
                                productOnCart
                              )
                            }
                          />
                        </Table.Cell>

                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.id}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.product_code}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.product_name}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <div className="flex flex-wrap gap-2">
                            {productOnCart.status === "IN_STOCK" && (
                              <Badge color="success">
                                {productOnCart.status}
                              </Badge>
                            )}
                            {productOnCart.status === "LOW_STOCK" && (
                              <Badge color="warning">
                                {productOnCart.status}
                              </Badge>
                            )}
                            {productOnCart.status === "OUT_OF_STOCK" && (
                              <Badge color="failure">
                                {productOnCart.status}
                              </Badge>
                            )}
                          </div>
                        </Table.Cell>

                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              color={
                                productOnCart.category ? "warning" : "failure"
                              }
                            >
                              {productOnCart.category
                                ? productOnCart.category.category_name
                                : "NULL"}
                            </Badge>
                          </div>
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.quantity}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.remaining_quantity}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.warehouse_location}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          $ {productOnCart.unit_price_in_usd}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          $ {productOnCart.total_value_in_usd}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          ៛ {productOnCart.exchange_rate_from_usd_to_riel} / 1$
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.unit_price_in_riel} ​៛
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.total_value_in_riel} ​៛
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          $ {productOnCart.exchange_rate_from_riel_to_usd} /
                          100៛
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {productOnCart.minimum_stock_level}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {new Date(productOnCart.created_at).toLocaleString(
                            "en-US",
                            {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                          ,{" "}
                          {formatDistanceToNow(
                            new Date(productOnCart.created_at)
                          )}{" "}
                          ago
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap">
                          {formatDistanceToNow(
                            new Date(productOnCart.updated_at)
                          )}{" "}
                          ago
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      <Table.Row>
                        <Table.Cell colSpan="8" className="text-center py-4">
                          No products selected.
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </div>

              {/* Table */}

              <div className="w-md">
                <div className="my-5">
                  {overQuantityError ? (
                    <Alert color="failure" icon={HiInformationCircle}>
                      <span className="font-medium">{overQuantityError}</span>
                    </Alert>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="quantity"
                    className="font-bold"
                    value="Quantity Scraped"
                  />
                </div>
                <TextInput
                  type="number"
                  id="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  className={`${
                    error?.quantity
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.quantity && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.quantity}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="reason"
                    className="font-bold"
                    value="Describe Reason"
                  />
                </div>
                <Textarea
                  id="reason"
                  value={values.reason}
                  onChange={handleChange}
                  className={`${
                    error?.reason
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.reason && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.reason}
                        </span>
                      </>
                    )
                  }
                />
              </div>
            </div>

            <div className="flex gap-5">
              <Button
                color="gray"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                <IoIosArrowBack className="mr-2" />
                Back
              </Button>
              <Button color="failure" onClick={resetForm} className="w-sm">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message={"Product Scrap Created Successfully"}
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message={`Something Went Wrong!"`}
      />
    </>
  );
};

export default Create;
