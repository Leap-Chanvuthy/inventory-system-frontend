import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Table,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState, useEffect } from "react";
import {
  DangerToast,
  SuccessToast,
} from "../../../../components/ToastNotification";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import {
  BASE_IMAGE_URL,
  BASE_URL,
} from "../../../../components/const/constant";
import {
  updateRawMaterialFailure,
  updateRawMaterialSuccess,
  updateRawMaterialStart,
  fetchRawMaterialsStart,
  fetchRawMaterialsSuccess,
  fetchRawMaterialsFailure,
  deleteRawMaterialStart,
  deleteRawMaterialSuccess,
  deleteRawMaterialFailure,
} from "../../../../redux/slices/rawMaterialSlice";
import {
  setSingleSelection,
  toggleSingleSelection,
} from "../../../../redux/slices/selectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import SupplierRelationship from "./relationships/SupplierRelationship";
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashCan } from "react-icons/fa6";
import { MdFileDownload } from "react-icons/md";

const UpdateForm = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [failedToastOpen, setFailToastOpen] = useState(false);
  const dispatch = useDispatch();
  const { status, error, rawMaterials } = useSelector(
    (state) => state.rawMaterials
  );
  const { singleSelection } = useSelector((state) => state.selections);
  const { id } = useParams();

  // get specific material by id
  useEffect(() => {
    const getMaterialById = async (e) => {
      dispatch(fetchRawMaterialsStart());
      try {
        const response = await axios.get(`${BASE_URL}/raw-material/${id}`);
        console.log(response);
        dispatch(fetchRawMaterialsSuccess(response.data));
      } catch (err) {
        console.log(err);
        dispatch(fetchRawMaterialsFailure(err));
      }
    };

    getMaterialById();
  }, [id, dispatch]);

  // list of images from API
  const [oldImages, setOldImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageId, setImageId] = useState(null);

  const handleImageClick = (img, id) => {
    setSelectedImage(img);
    setImageId(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // inital values
  const [values, setValues] = useState({
    image: [],
    name: "",
    material_code: "",
    quantity: "",
    remaining_quantity: "",
    unit_price_in_usd: "",
    exchange_rate_from_usd_to_riel: "",
    minimum_stock_level: "",
    raw_material_category_id: "",
    unit_of_measurement: "",
    package_size: "",
    status: "",
    location: "",
    description: "",
    expiry_date: "",
    supplier_id: "",
  });

  useEffect(() => {
    if (rawMaterials) {
      setValues({
        image: [],
        name: rawMaterials?.name || "",
        material_code: rawMaterials?.material_code || "",
        quantity: rawMaterials?.quantity || "",
        remaining_quantity: rawMaterials?.remaining_quantity || "",
        unit_price_in_usd: rawMaterials?.unit_price_in_usd || "",
        exchange_rate_from_usd_to_riel:
          rawMaterials?.exchange_rate_from_usd_to_riel || "",
        minimum_stock_level: rawMaterials?.minimum_stock_level || "",
        raw_material_category_id: rawMaterials?.raw_material_category_id || "",
        unit_of_measurement: rawMaterials?.unit_of_measurement || "",
        package_size: rawMaterials?.package_size || "",
        status: rawMaterials?.status || "",
        location: rawMaterials?.location || "",
        description: rawMaterials?.description || "",
        expiry_date: rawMaterials?.expiry_date || "",
        supplier_id: rawMaterials?.supplier?.id || "",
      });

      setOldImages(rawMaterials?.raw_material_images || []);
      dispatch(setSingleSelection(rawMaterials?.supplier?.id));
    }
  }, [rawMaterials]);

  console.log("values of raw materials:", rawMaterials);

  // handle values change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSingleSelect = (id) => {
    dispatch(toggleSingleSelection(id));
  };

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      supplier_id: singleSelection,
    }));
  }, [singleSelection]);

  // handle file change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length) {
      const newImagePreviews = validImages.map((file) =>
        URL.createObjectURL(file)
      );

      setValues((prevValues) => ({
        ...prevValues,
        image: [...prevValues.image, ...validImages],
      }));
    } else {
      alert("Please upload valid image files.");
    }
  };

  const handleRemoveImage = (imageIndex) => {
    const updatedImages = [...values.image];
    updatedImages.splice(imageIndex, 1);
    setValues({ ...values, image: updatedImages });
  };

  // get raw material category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async (e) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/non-paginate/raw-material-categories`
        );
        console.log(response);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  // Handle delete image
  const handleDeleteImage = async (e) => {
    e.preventDefault();
    dispatch(deleteRawMaterialStart());
    try {
      const response = await axios.delete(
        `${BASE_URL}/raw-material/${id}/images/${imageId}`
      );
      console.log(response);
      dispatch(deleteRawMaterialSuccess(id));
      setOpenModal(false);
      const updatedMaterial = await axios.get(`${BASE_URL}/raw-material/${id}`);
      dispatch(fetchRawMaterialsSuccess(updatedMaterial.data));
    } catch (err) {
      console.log(err.response);
      dispatch(
        deleteRawMaterialFailure(
          err.message || "Error deleting image from the server."
        )
      );
    }
  };

  // Submit patch request to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateRawMaterialStart());
    try {
      const response = await axios.post(
        `${BASE_URL}/raw-material/${id}`,
        values,
        {
          params: {
            _method: "PATCH",
          },
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(updateRawMaterialSuccess(response));
      const updatedMaterial = await axios.get(`${BASE_URL}/raw-material/${id}`);
      console.log("updated material:", updatedMaterial);
      dispatch(fetchRawMaterialsSuccess(updatedMaterial.data));
      // dispatch(fetchRawMaterialsSuccess());
      setOpenSuccess(true);
    } catch (error) {
      setFailToastOpen(true);
      console.error("Error submitting the form:", error);
      dispatch(updateRawMaterialFailure(error?.response?.data?.errors));
    }
  };

  return (
    <div className="my-5">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Raw Material Updated Successfully"
      />
      <DangerToast
        open={failedToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something went wrong"
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="flex flex-col gap-5">
            <h2 className="text-md font-semibold">General Info</h2>
            <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="name" value="Material Name" />
                <TextInput
                  id="name"
                  placeholder="Enter material name"
                  value={values.name}
                  onChange={handleChange}
                  className={`${
                    error?.name
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.name && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.name}
                        </span>
                      </>
                    )
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="material_code"
                  value="Material Code (Auto Generated)"
                />
                <TextInput
                  id="material_code"
                  placeholder="Enter material code"
                  value={values.material_code}
                  onChange={handleChange}
                  disabled
                  className={`${
                    error?.material_code
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.material_code && (
                      <>
                        <span class="font-medium text-red-400">
                          {error.material_code}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="expiry_date" value="Expiry Date" />
                <TextInput
                  id="expiry_date"
                  type="date"
                  value={values.expiry_date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className="text-md font-semibold">Stock Info</h2>
            <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="quantity" value="Quantity" />
                <TextInput
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
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
                <Label htmlFor="remaing_quantity" value="Remainig Quantity" />
                <TextInput
                  id="remaining_quantity"
                  type="number"
                  placeholder="Enter remaining quantity"
                  value={values.remaining_quantity}
                  onChange={handleChange}
                  className={`${
                    error?.remaining_quantity
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.remaining_quantity && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.remaining_quantity}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="minimum_stock_level"
                  value="Minimum Stock Level"
                />
                <TextInput
                  id="minimum_stock_level"
                  type="number"
                  placeholder="Enter minimum stock level"
                  value={values.minimum_stock_level}
                  onChange={handleChange}
                  className={`${
                    error?.minimum_stock_level
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.minimum_stock_level && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.minimum_stock_level}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="raw_material_category_id"
                  value="Raw Material Category"
                />
                <Select
                  id="raw_material_category_id"
                  placeholder="Enter raw material category"
                  value={values.raw_material_category_id}
                  onChange={handleChange}
                  helperText={
                    error?.raw_material_category_id && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.raw_material_category_id}
                        </span>
                      </>
                    )
                  }
                >
                  <option value="">Select an option</option>
                  {categories &&
                    categories.map((category) => (
                      <option value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                </Select>
              </div>

              <div>
                <Label htmlFor="status" value="Status" />
                <Select
                  id="status"
                  placeholder="Enter status"
                  value={values.status}
                  onChange={handleChange}
                  disabled
                  helperText={
                    error?.status && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.status}
                        </span>
                      </>
                    )
                  }
                >
                  <option value="">Select an option</option>
                  <option value="IN_STOCK">In stock</option>
                  <option value="OUT_OF_STOCK">Out of stock</option>
                  <option value="LOW_STOCK">Low Stock</option>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="unit_of_measurement"
                  value="Unit of Measurement"
                />
                <TextInput
                  id="unit_of_measurement"
                  placeholder="Enter unit of measurement"
                  value={values.unit_of_measurement}
                  onChange={handleChange}
                  className={`${
                    error?.unit_of_measurement
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.unit_of_measurement && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.unit_of_measurement}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="package_size" value="Package Size" />
                <TextInput
                  id="package_size"
                  placeholder="Enter package size"
                  value={values.package_size}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="location" value="Location" />
                <TextInput
                  id="location"
                  placeholder="Enter location"
                  value={values.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className="text-md font-semibold">Currency Info</h2>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
                <div>
                  <Label
                    htmlFor="unit_price_in_usd"
                    value="Unit Price in USD"
                  />
                  <TextInput
                    id="unit_price_in_usd"
                    type="number"
                    placeholder="Unit price in USD"
                    value={values.unit_price_in_usd}
                    onChange={handleChange}
                    className={`${
                      error?.unit_price_in_usd
                        ? "border-[1.5px] border-red-400 rounded-md"
                        : ""
                    } `}
                    helperText={
                      error?.unit_price_in_usd && (
                        <>
                          <span className="font-medium text-red-400">
                            {error.unit_price_in_usd}
                          </span>
                        </>
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="total_value_in_usd"
                    value="Total Value in USD (Auto Calculated)"
                  />
                  <TextInput
                    // id="total_value_in_usd"
                    type="text"
                    placeholder="Enter total value"
                    value={rawMaterials.total_value_in_usd}
                    onChange={handleChange}
                    disabled
                    className={`${
                      error?.total_value_in_usd
                        ? "border-[1.5px] border-red-400 rounded-md"
                        : ""
                    } `}
                    helperText={
                      error?.total_value_in_usd && (
                        <>
                          <span className="font-medium text-red-400">
                            {error.total_value_in_usd}
                          </span>
                        </>
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="exchange_rate_from_usd_to_riel"
                    value="Exchange Rate From USD to Riel"
                  />
                  <TextInput
                    id="exchange_rate_from_usd_to_riel"
                    type="text"
                    placeholder="Enter total value"
                    value={values.exchange_rate_from_usd_to_riel}
                    onChange={handleChange}
                    className={`${
                      error?.exchange_rate_from_usd_to_riel
                        ? "border-[1.5px] border-red-400 rounded-md"
                        : ""
                    } `}
                    helperText={
                      error?.exchange_rate_from_usd_to_riel && (
                        <>
                          <span className="font-medium text-red-400">
                            {error.exchange_rate_from_usd_to_riel}
                          </span>
                        </>
                      )
                    }
                  />
                </div>
              </div>
              <h2 className="text-md font-semibold my-3">
                Riel Currency (Auto Calculated)
              </h2>
              <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
                <div>
                  <Label
                    htmlFor="unit_price_in_riel"
                    value="Total Value in Riel"
                  />
                  <TextInput
                    // id="unit_price_in_riel"
                    type="text"
                    placeholder="Enter total value"
                    value={rawMaterials.unit_price_in_riel}
                    onChange={handleChange}
                    disabled
                    className={`${
                      error?.unit_price_in_riel
                        ? "border-[1.5px] border-red-400 rounded-md"
                        : ""
                    } `}
                    helperText={
                      error?.unit_price_in_riel && (
                        <>
                          <span className="font-medium text-red-400">
                            {error.unit_price_in_riel}
                          </span>
                        </>
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="total_value_in_riel"
                    value="Total Value in Riel"
                  />
                  <TextInput
                    // id="total_value_in_riel"
                    type="number"
                    placeholder="Enter total value"
                    value={rawMaterials.total_value_in_riel}
                    onChange={handleChange}
                    disabled
                    className={`${
                      error?.total_value_in_riel
                        ? "border-[1.5px] border-red-400 rounded-md"
                        : ""
                    } `}
                    helperText={
                      error?.total_value_in_riel && (
                        <>
                          <span className="font-medium text-red-400">
                            {error.total_value_in_riel}
                          </span>
                        </>
                      )
                    }
                  />
                </div>
                <div>
                  <Label
                    htmlFor="exchange_rate_from_riel_to_usd"
                    value="Exchange Rate From Riel to USD"
                  />
                  <TextInput
                    id="exchange_rate_from_riel_to_usd"
                    // type="number"
                    placeholder="Enter total value"
                    value={rawMaterials.exchange_rate_from_riel_to_usd}
                    onChange={handleChange}
                    disabled
                    className={`${
                      error?.exchange_rate_from_riel_to_usd
                        ? "border-[1.5px] border-red-400 rounded-md"
                        : ""
                    } `}
                    helperText={
                      error?.exchange_rate_from_riel_to_usd && (
                        <>
                          <span className="font-medium text-red-400">
                            {error.exchange_rate_from_riel_to_usd}
                          </span>
                        </>
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-md font-semibold my-5">Additional</h2>
          <div className="my-5">
            <Label htmlFor="description" value="Description" />
            <Textarea
              cols={4}
              id="description"
              placeholder="Enter description"
              value={values.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-md font-semibold">Supplier</h2>
            {error?.supplier_id && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">{error?.supplier_id}</span>
              </Alert>
            )}
            <div className="overflow-x-auto lg:max-w-6xl  my-5">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Select</Table.HeadCell>
                  {/* <Table.HeadCell>Image</Table.HeadCell> */}
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
                  {rawMaterials?.supplier ? (
                    <Table.Row
                      key={rawMaterials?.supplier?.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <Checkbox
                          checked={
                            singleSelection === rawMaterials?.supplier?.id
                          }
                          onChange={() =>
                            handleSingleSelect(rawMaterials?.supplier?.id)
                          }
                        />
                      </Table.Cell>
                      {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            <Avatar
                              img={supplier.image ? `${BASE_IMAGE_URL}/${rawMaterials?.supplier.image}` : ""}
                            />
                          </Table.Cell> */}
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.phone_number}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.supplier_category ===
                          "PRODUCT" && (
                          <Badge color="success">
                            {rawMaterials?.supplier?.supplier_category}
                          </Badge>
                        )}
                        {rawMaterials?.supplier?.supplier_category ===
                          "SERVICE" && (
                          <Badge color="warning">
                            {rawMaterials?.supplier?.supplier_category}
                          </Badge>
                        )}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <div className="flex flex-wrap gap-2">
                          {rawMaterials?.supplier?.supplier_status ===
                            "ACTIVE" && (
                            <Badge color="success">
                              {rawMaterials?.supplier?.supplier_status}
                            </Badge>
                          )}
                          {rawMaterials?.supplier?.supplier_status ===
                            "INACTIVE" && (
                            <Badge color="warning">
                              {rawMaterials?.supplier?.supplier_status}
                            </Badge>
                          )}
                          {rawMaterials?.supplier?.supplier_status ===
                            "SUSPENDED" && (
                            <Badge color="failure">
                              {rawMaterials?.supplier?.supplier_status}
                            </Badge>
                          )}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.location}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.contact_person}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.business_registration_number}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.bank_account_number}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.bank_name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.supplier_code}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.address}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {rawMaterials?.supplier?.email}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <a
                          href={rawMaterials?.supplier?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {rawMaterials?.supplier?.website}
                        </a>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <a
                          href={rawMaterials?.supplier?.social_media}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {rawMaterials?.supplier?.social_media}
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    <Table.Row>
                      <Table.Cell colSpan="16" className="text-center py-4">
                        No suppliers found.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
            <SupplierRelationship />
          </div>

          <div className="my-5">
            <h2 className="text-md font-semibold mb-5">Images</h2>
            <div className="flex flex-wrap gap-3">
              {oldImages.map((img, index) => (
                <img
                  key={index}
                  src={`${BASE_IMAGE_URL}/${img.image}`}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer"
                  onClick={() => handleImageClick(img.image, img.id)}
                  alt={`Thumbnail of ${img.image}`}
                />
              ))}
            </div>

            <Modal show={selectedImage} onClose={closeModal}>
              <Modal.Header>Image</Modal.Header>
              <Modal.Body>
                <img
                  src={`${BASE_IMAGE_URL}/${selectedImage}`}
                  className="rounded-md"
                />
              </Modal.Body>
              <Modal.Footer>
                <div className="flex justify-between gap-5">
                  <Button color="gray" onClick={closeModal}>
                    <IoIosArrowBack className="mr-2" />
                    Back
                  </Button>
                  <div className="flex justify-center gap-3">
                    <Button onClick={handleDeleteImage} disabled={status == 'loading'} color="failure">
                      <FaTrashCan className="mr-3" />
                      {status === "loading" ? <Spinner /> : "Remove"}
                    </Button>
                    <Button onClick={closeModal}>
                      <MdFileDownload className="mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Modal.Footer>
            </Modal>
          </div>

          <div>
            <h2 className="text-md font-semibold">Add More Images</h2>
            <div className="flex items-center justify-center mt-4 mb-4">
              <Label
                htmlFor="image_upload"
                className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-4 w-full"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="mb-3 w-10 h-10 text-gray-400 dark:text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 5a2 2 0 00-1.5.654L9.828 10.832A3.5 3.5 0 1112.5 13H17a2 2 0 002-2V7a2 2 0 00-2-2H16z" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or GIF (max. 2MB)
                  </p>
                </div>
                <input
                  id="image_upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {values.image.length > 0 && (
              <div className="flex flex-wrap">
                {values.image.map((img, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Product Preview ${index + 1}`}
                      className="w-[18rem] h-40 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <MdCancel />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* <Button type="submit" className="w-full">
          {status === "loading" ? <Spinner /> : "Save"}
        </Button> */}
        <div className="flex gap-5">
          <Link to="/raw-materials" className="text-blue-500 cursor-pointer">
            <Button color="gray">
              <IoIosArrowBack className="mr-2" />
              Back
            </Button>
          </Link>
          <Button type="submit" className="w-full">
            {status === "loading" ? (
              <div>
                <Spinner />
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
