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
  import { FaPlus } from "react-icons/fa6";
  import axios from "axios";
  import { BASE_URL } from "../../../../../components/const/constant";
  import {
    DangerToast,
    SuccessToast,
  } from "../../../../../components/ToastNotification";
  import { IoIosArrowBack } from "react-icons/io";
  import { IoCartOutline } from "react-icons/io5";
  import RawMaterialRelationship from "../relationships/RawMaterialRelationship";
  import { useDispatch, useSelector } from "react-redux";
  import {
    resetSingleSelectionState,
    setSingleSelection,
    toggleSingleSelection,
  } from "../../../../../redux/slices/selectionSlice";
  import {
    addMaterialToCart,
    removeMaterialFromCart,
  } from "../../../../../redux/slices/rawMaterialSlice";
  import { HiInformationCircle } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { fetchStockScrapFailure, fetchStockScrapStart, fetchStockScrapSuccess, updateStockScrapFailure, updateStockScrapStart, updateStockScrapSuccess } from "../../../../../redux/slices/stockScrapSlice";
import RawMaterialScrapTable from "../list/RawMaterialScrapTable";
  
  const Update = ({raw_material_scrap_id}) => {
    const { materialOnCart , error , status } = useSelector((state) => state.rawMaterials);
    const { singleSelection } = useSelector((state) => state.selections);
    const { stockScraps } = useSelector((state) => state.stockScraps);
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [overQuantityError, setOverQuantityError] = useState(null);
    const [successToastOpen, setSuccessToastOpen] = useState(false);
    const [failToastOpen, setFailToastOpen] = useState(false);
  
    // initial values
    const [values, setValues] = useState({
      raw_material_id: "",
      quantity: "",
      reason: "",
    });

    // // fetch raw materila scrap by id
    useEffect(() => {
      const getRawMaterialScrapById = async () => {
        dispatch(fetchStockScrapStart());
        try {
          const response = await axios.get(`${BASE_URL}/raw-material-scrap/${raw_material_scrap_id}`);
          console.log(response);
          dispatch(fetchStockScrapSuccess(response.data));
        }catch(err){
          console.log('Error :' , err.response);
          dispatch(fetchStockScrapFailure(err?.response?.data?.error));
        }
      }
        getRawMaterialScrapById();
    },[raw_material_scrap_id]);


    useEffect(() =>{
      if (stockScraps){
        setValues({
          raw_material_id : stockScraps?.id,
          quantity : stockScraps?.quantity,
          reason : stockScraps?.reason
        });
      }
      dispatch(setSingleSelection(stockScraps?.raw_material?.id));
      dispatch(addMaterialToCart(stockScraps?.raw_material));

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
        raw_material_id: singleSelection,
      }));
    }, [singleSelection]);
  
    // Function to hanlde selected id change of raw materials
    const handleSingleSelect = (id, material) => {
      dispatch(toggleSingleSelection(id));
      if (singleSelection == id) {
        dispatch(removeMaterialFromCart({ id }));
      } else {
        dispatch(addMaterialToCart(material));
      }
    };
  
    // clear single selection state when component is unmounted
    useEffect(() => {
      dispatch(resetSingleSelectionState());
      dispatch(removeMaterialFromCart());
    }, [location.pathname, dispatch , openModal]);
  
    // Sending post request
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(updateStockScrapStart());
      try {
        const response = await axios.patch(
          `${BASE_URL}/raw-material-scrap/${raw_material_scrap_id}`,
          values
        );
        console.log(response);
        dispatch(updateStockScrapSuccess(response.data));
        setSuccessToastOpen(true);
        const updateRawMaterialScrap = await axios.get(`${BASE_URL}/raw-material-scrap/${raw_material_scrap_id}`);
        dispatch(fetchStockScrapSuccess(updateRawMaterialScrap.data));
      } catch (err) {
        console.log(err);
        dispatch(updateStockScrapFailure(err?.response?.data?.errors));
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
            <h3 className="font-semibold p-4">Update Raw Material Scrap</h3>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center gap-3">
                  <Alert color="warning" className="w-full" icon={IoCartOutline}>
                    <span className="font-bold">
                      Select Raw Material Scrapping
                    </span>
                  </Alert>
                  <RawMaterialRelationship />
                </div>
  
                {/* Table */}
                <div className="overflow-x-auto lg:max-w-6xl  my-5">
                <div className="my-5">
                    {error?.raw_material_id ? (
                      <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">
                          Raw material cannot be empty !
                        </span>{" "}
                        Please select raw material to create.
                      </Alert>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Table striped>
                    <Table.Head>
                      <Table.HeadCell>Select</Table.HeadCell>
                      <Table.HeadCell>ID</Table.HeadCell>
                      {/* <Table.HeadCell>Image</Table.HeadCell> */}
                      <Table.HeadCell>Code</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Material Name
                      </Table.HeadCell>
                      <Table.HeadCell>Quantity</Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Remaining Quantity
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Supplier Code
                      </Table.HeadCell>
                      <Table.HeadCell className="whitespace-nowrap">
                        Supplier Name
                      </Table.HeadCell>
                      <Table.HeadCell>Status</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
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
                      <Table.HeadCell className="whitespace-nowrap">
                        Minimum Stock
                      </Table.HeadCell>
                      <Table.HeadCell>location</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                      {materialOnCart ? (
                        <Table.Row
                          key={materialOnCart.id}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell>
                            <Checkbox
                              checked={singleSelection == materialOnCart.id}
                              onChange={() =>
                                handleSingleSelect(
                                  materialOnCart.id,
                                  materialOnCart
                                )
                              }
                            />
                          </Table.Cell>
                          <Table.Cell>{materialOnCart.id}</Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.material_code}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.name}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.quantity}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.remaining_quantity}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.supplier ? (
                              materialOnCart.supplier.supplier_code
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                <Badge color="failure">N/A</Badge>
                              </div>
                            )}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.supplier ? (
                              materialOnCart.supplier.name
                            ) : (
                              <div className="flex flex-wrap gap-2">
                                <Badge color="failure">N/A</Badge>
                              </div>
                            )}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap gap-2">
                              {materialOnCart.status === "IN_STOCK" && (
                                <Badge color="success">
                                  {materialOnCart.status}
                                </Badge>
                              )}
                              {materialOnCart.status === "LOW_STOCK" && (
                                <Badge color="warning">
                                  {materialOnCart.status}
                                </Badge>
                              )}
                              {materialOnCart.status === "OUT_OF_STOCK" && (
                                <Badge color="failure">
                                  {materialOnCart.status}
                                </Badge>
                              )}
                            </div>
                          </Table.Cell>
  
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                color={
                                  materialOnCart.category ? "warning" : "failure"
                                }
                              >
                                {materialOnCart.category
                                  ? materialOnCart.category.category_name
                                  : "NULL"}
                              </Badge>
                            </div>
                          </Table.Cell>
  
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            $ {materialOnCart.unit_price_in_usd}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            $ {materialOnCart.total_value_in_usd}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.unit_price_in_riel} ​៛
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.total_value_in_riel} ​៛
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.minimum_stock_level}
                          </Table.Cell>
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {materialOnCart.location}
                          </Table.Cell>
                        </Table.Row>
                      ) : (
                        <Table.Row>
                          <Table.Cell colSpan="8" className="text-center py-4">
                            No raw materials selected.
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
          message={"Raw Material Scrap Created Successfully"}
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
  