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
  import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
  import {
    resetSingleSelectionState,
    setSingleSelection,
    toggleSingleSelection,
  } from "../../../../../redux/slices/selectionSlice";
  import { HiInformationCircle } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { fetchStockScrapFailure, fetchStockScrapStart, fetchStockScrapSuccess, updateStockScrapFailure, updateStockScrapStart, updateStockScrapSuccess } from "../../../../../redux/slices/stockScrapSlice";
import { addProductToCart, removeProductFromCart } from "../../../../../redux/slices/productSlice";
import ProductRelationship from "../relationships/ProductRelationship";
import useToken from "../../../../../hooks/useToken";
  
  const Update = ({product_scrap_id}) => {
    const dispatch = useDispatch();
    const token = useToken();
    const { productOnCart } = useSelector((state) => state.products);
    const {stockScraps , error ,status } = useSelector((state) => state.stockScraps);
    const { singleSelection } = useSelector((state) => state.selections);

    const [openModal, setOpenModal] = useState(false);
    const [overQuantityError, setOverQuantityError] = useState(null);
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [failToastOpen, setFailToastOpen] = useState(false);
  
    // initial values
    const [values, setValues] = useState({
      product_id: "",
      quantity: "",
      reason: "",
    });

    // // fetch raw materila scrap by id
    useEffect(() => {
      const getProductScrapById = async () => {
        dispatch(fetchStockScrapStart());
        try {
          const response = await axios.get(`${BASE_URL}/product-scrap/${product_scrap_id}` , {
            headers : {
              Authorization : `Bearer ${token}`
            },
          });
          console.log(response);
          dispatch(fetchStockScrapSuccess(response.data));
        }catch(err){
          console.log('Error :' , err.response);
          dispatch(fetchStockScrapFailure(err?.response?.data?.error));
        }
      }
        getProductScrapById();
    },[product_scrap_id]);


    useEffect(() =>{
      if (stockScraps){
        setValues({
          product_id : stockScraps?.id,
          quantity : stockScraps?.quantity,
          reason : stockScraps?.reason
        });
      }
      dispatch(setSingleSelection(stockScraps?.product_id));
      dispatch(addProductToCart(stockScraps?.product));

    },[stockScraps]);

    
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
    const handleSingleSelect = (id, product) => {
      dispatch(toggleSingleSelection(id));
      if (singleSelection == id) {
        dispatch(removeProductFromCart({ id }));
      } else {
        dispatch(addProductToCart(product));
      }
    };
  
    // clear single selection state when component is unmounted
    useEffect(() => {
      dispatch(resetSingleSelectionState());
      dispatch(removeProductFromCart());
    }, [location.pathname, dispatch , openModal]);
  
    // Sending patch request
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(updateStockScrapStart());
      try {
        const response = await axios.patch(
          `${BASE_URL}/product-scrap/${product_scrap_id}`,values ,{
            headers : {
              Authorization : `Bearer ${token}`
            },
          });
        console.log(response);
        dispatch(updateStockScrapSuccess(response.data));
        setSuccessToastOpen(true);
        const updateProductScrap = await axios.get(`${BASE_URL}/product-scrap/${product_scrap_id}` ,{
          headers : {
            Authorization : `Bearer ${token}`
          },
        });
        dispatch(fetchStockScrapSuccess(updateProductScrap.data));
      } catch (err) {
        console.log(err.response.data.errors);
        dispatch(updateStockScrapFailure(err.response.data.errors));
        setOverQuantityError(err?.response?.data?.error);
        setFailToastOpen(true);
      }
    };
  
  
    function onCloseModal() {
      setOpenModal(false);
    }
  
    return (
      <>
        <Tooltip content="Click to create">
          <FiEdit onClick={() => setOpenModal(true)}>
            <div className="flex items-center gap-1">
            </div>
          </FiEdit>
        </Tooltip>
        <Modal show={openModal} size="5xl" onClose={onCloseModal} popup>
          <Modal.Header>
            <h3 className="font-semibold p-4">Update Product Scrap</h3>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center gap-3">
                  <Alert color="warning" className="w-full" icon={IoCartOutline}>
                    <span className="font-bold">
                      Select Product Scrapping
                    </span>
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
                <Button disabled={status == 'loading'} type="submit" className="w-full">
                  {status == 'loading' ? (
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
          message={"Product Scrap Updated Successfully"}
        />
  
        <DangerToast
          open={failToastOpen}
          onClose={() => setFailToastOpen(false)}
          message={`Something Went Wrong!"`}
        />
      </>
    );
  };
  
  export default Update;
  