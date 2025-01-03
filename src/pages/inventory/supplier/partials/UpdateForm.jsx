import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  Button,
  Label,
  TextInput,
  FileInput,
  Select,
  Textarea,
  Spinner,
  Table,
  Badge,
  Checkbox,
  Modal,
} from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import {
  createSupplierStart,
  createSupplierFailed,
  createSupplierSuccess,
  getSuppliersStart,
  getSupplierSuccess,
  getSuppliersFailed,
} from "../../../../redux/slices/supplierSlice";
import axios from "axios";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../components/const/constant";
import {
  SuccessToast,
  DangerToast,
} from "../../../../components/ToastNotification";
import { Link, useParams } from "react-router-dom";
import {
  resetMultipleSelectionState,
  setMultipleSelection,
  toggleMultipleSelection,
} from "../../../../redux/slices/selectionSlice";
import RawMaterialRelationship from "./relationship/RawMaterialRelationship";
import { IoIosArrowBack } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const center = {
  lat: 12.5657,
  lng: 104.991,
};

const UpdateForm = () => {
  // diapatch redux action
  const dispatch = useDispatch();
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const { error, status, suppliers } = useSelector((state) => state.suppliers);
  const { multipleSelection } = useSelector((state) => state.selections);
  const [oldImages, setOldImages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // fetch specific supplier
  const { id } = useParams();

  useEffect(() => {
    const getSupplierById = async () => {
      dispatch(getSuppliersStart());
      try {
        const response = await axios.get(`${BASE_URL}/supplier/${id}`);
        dispatch(getSupplierSuccess(response.data));
        console.log("suppliers data response from axios:", response);
      } catch (err) {
        console.log(err);
        dispatch(
          getSuppliersFailed(err.message || "Error to get data from server")
        );
      }
    };
    getSupplierById();
  }, [id, dispatch]);

  const [values, setValues] = useState({
    image: "",
    name: "",
    phone_number: "",
    location: "",
    longitude: "",
    latitude: "",
    address: "",
    email: "",
    contact_person: "",
    website: "",
    social_media: "",
    supplier_category: "",
    supplier_status: "",
    contract_length: "",
    discount_term: "",
    payment_term: "",
    business_registration_number: "",
    vat_number: "",
    bank_account_number: "",
    bank_account_name: "",
    bank_name: "",
    note: "",
    raw_materials: [],
  });

  console.log("Multiple selection :", multipleSelection);

  useEffect(() => {
    if (suppliers) {
      setValues({
        image: "",
        name: suppliers?.name,
        phone_number: suppliers?.phone_number || "",
        location: suppliers?.location || "",
        longitude: suppliers?.longitude || "",
        latitude: suppliers?.latitude || "",
        address: suppliers?.address || "",
        email: suppliers?.email || "",
        contact_person: suppliers?.contact_person || "",
        website: suppliers?.website || "",
        social_media: suppliers?.social_media || "",
        supplier_category: suppliers?.supplier_category || "",
        supplier_status: suppliers?.supplier_status || "",
        contract_length: suppliers?.contract_length || "",
        discount_term: suppliers?.discount_term || "",
        payment_term: suppliers?.payment_term || "",
        business_registration_number:
          suppliers?.business_registration_number || "",
        vat_number: suppliers?.vat_number || "",
        bank_account_number: suppliers?.bank_account_number || "",
        bank_account_name: suppliers?.bank_account_name || "",
        bank_name: suppliers?.bank_name || "",
        note: suppliers?.note || "",
        raw_materials: suppliers?.raw_materials?.map(
          (raw_material) => raw_material.id
        ),
      });
    }
    setOldImages(suppliers?.image);
    dispatch(
      setMultipleSelection(
        suppliers?.raw_materials?.map((raw_material) => raw_material.id)
      )
    );
  }, [suppliers]);

  // reset set state when component is unmounted
  useEffect(() => {
    return () => {
      dispatch(resetMultipleSelectionState());
    };
  }, [location.pathname, dispatch]);

  // Handle image click
  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleMultipleSelect = (id) => {
    dispatch(toggleMultipleSelection(id));
  };

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      raw_materials: multipleSelection,
    }));
  }, [multipleSelection]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAd4rEAQqf58fCJGABqW99teDP9BcuyN08",
  });

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    setValues((prevValues) => ({
      ...prevValues,
      latitude: JSON.stringify(lat),
      longitude: JSON.stringify(lng),
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValues((prevValues) => ({
        ...prevValues,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleRemoveImage = () => {
    setValues((prevValues) => ({
      ...prevValues,
      image: null,
    }));
  };

  // handle submit patch request
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createSupplierStart());
    try {
      const response = await axios.post(`${BASE_URL}/supplier/${id}`, values, {
        params: {
          _method: "PATCH",
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(createSupplierSuccess(response));
      setSuccessToastOpen(true);
      setImagePreview(null);
      const updatedSupplier = await axios.get(`${BASE_URL}/supplier/${id}`);
      dispatch(getSupplierSuccess(updatedSupplier.data));
      dispatch(resetMultipleSelectionState());
    } catch (error) {
      console.log(error);
      dispatch(createSupplierFailed(error?.response?.data?.errors));
      setFailToastOpen(true);
    }
  };

  // map loading state
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Supplier Created Successfully!"
      />
      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something Went Wrong!"
      />
      <form className="w-full flex flex-col gap-4 my-5" onSubmit={handleSubmit}>
        {/* image section */}
        <div>
          <h2 className="text-lg font-semibold my-2">Supplier Profile</h2>
          <div className="flex items-center justify-center">
            <Label
              htmlFor="image"
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
              <input
                id="image"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </Label>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-[18rem] h-40 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 text-white bg-red-500 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <MdCancel />
                </button>
              </div>
            )}
          </div>

          <div className="my-5">
            <div className="flex flex-wrap gap-3">
              <img
                src={`${BASE_IMAGE_URL}/${oldImages}`}
                className="w-16 h-16 object-cover rounded-md cursor-pointer"
                onClick={() => handleImageClick(oldImages)}
                alt={`Thumbnail of ${oldImages}`}
              />
            </div>
            <Modal show={selectedImage} onClose={closeModal}>
              <Modal.Header>
                <span className="font-bold">Customer Image</span>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={`${BASE_IMAGE_URL}/${selectedImage}`}
                  className="rounded-md"
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold my-5">General Info</h2>
          <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
            <div className="w-full">
              <Label htmlFor="name" value="Supplier Name / Company" />
              <TextInput
                id="name"
                type="text"
                placeholder="Supplier Name"
                className={`${
                  error?.name ? "border-[1.5px] border-red rounded-md" : ""
                } `}
                value={values.name}
                onChange={handleChange}
                helperText={
                  error?.name && (
                    <>
                      <span className="font-medium text-red">{error.name}</span>
                    </>
                  )
                }
              />
            </div>

            <div className="w-full">
              <Label htmlFor="phone_number" value="Phone Number" />
              <TextInput
                id="phone_number"
                type="text"
                placeholder="phone_number"
                className={`${
                  error?.phone_number
                    ? "border-[1.5px] border-red rounded-md"
                    : ""
                } `}
                value={values.phone_number}
                onChange={handleChange}
                helperText={
                  error?.phone_number && (
                    <>
                      <span className="font-medium text-red">
                        {error.phone_number}
                      </span>
                    </>
                  )
                }
              />
            </div>

            <div className="w-full">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="text"
                placeholder="Email"
                className={`${
                  error?.email ? "border-[1.5px] border-red rounded-md" : ""
                } `}
                value={values.email}
                onChange={handleChange}
                helperText={
                  error?.email && (
                    <>
                      <span className="font-medium text-red">
                        {error.email}
                      </span>
                    </>
                  )
                }
              />
            </div>

            <div className="w-full">
              <Label htmlFor="contact_person" value="Contact Person" />
              <TextInput
                id="contact_person"
                type="text"
                placeholder="Contact Person"
                className={`${
                  error?.contact_person
                    ? "border-[1.5px] border-red rounded-md"
                    : ""
                } `}
                value={values.contact_person}
                onChange={handleChange}
                helperText={
                  error?.contact_person && (
                    <>
                      <span className="font-medium text-red">
                        {error.contact_person}
                      </span>
                    </>
                  )
                }
              />
            </div>

            <div className="w-full">
              <Label htmlFor="website" value="Website" />
              <TextInput
                id="website"
                type="text"
                placeholder="Website"
                value={values.website}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="social_media" value="Socail Media" />
              <TextInput
                id="social_media"
                type="text"
                placeholder="Website"
                value={values.social_media}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="supplier_category" value="Supplier Category" />
              <Select
                id="supplier_category"
                type="text"
                placeholder="Website"
                value={values.supplier_category}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="PRODUCT">Product</option>
                <option value="SERVICE">Service</option>
              </Select>
            </div>

            <div className="w-full">
              <Label htmlFor="supplier_status" value="Supplier Status" />
              <Select
                id="supplier_status"
                type="text"
                placeholder="Website"
                value={values.supplier_status}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="SUSPENDED">Suspended</option>
              </Select>
            </div>
          </div>
        </div>

        {/* Location Info Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold my-5">Location Info</h2>
          <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
            <div className="w-full">
              <Label htmlFor="location" value="Location" />
              <TextInput
                id="location"
                type="text"
                placeholder="Location"
                className={`${
                  error?.location ? "border-[1.5px] border-red rounded-md" : ""
                } `}
                value={values.location}
                onChange={handleChange}
                helperText={
                  error?.location && (
                    <>
                      <span className="font-medium text-red">
                        {error.location}
                      </span>
                    </>
                  )
                }
              />
            </div>

            <div className="w-full">
              <Label htmlFor="address" value="Address" />
              <TextInput
                id="address"
                type="text"
                placeholder="Address"
                value={values.address}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="longitude" value="Longitude" />
              <TextInput
                id="longitude"
                type="text"
                placeholder="Longitude"
                value={values.longitude}
                disabled
              />
            </div>

            <div className="w-full">
              <Label htmlFor="latitude" value="Latitude" />
              <TextInput
                id="latitude"
                type="text"
                placeholder="Latitude"
                value={values.latitude}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Business Info Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold my-5">Business Information</h2>
          <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
            <div className="w-full">
              <Label htmlFor="contract_length" value="Contract Length" />
              <TextInput
                id="contract_length"
                type="text"
                placeholder="Contract Length"
                value={values.contract_length}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="discount_term" value="Discount Term" />
              <TextInput
                id="discount_term"
                type="text"
                placeholder="Discount Term"
                value={values.discount_term}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="payment_term" value="Payment Term" />
              <TextInput
                id="payment_term"
                type="text"
                placeholder="Payment Term"
                value={values.payment_term}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label
                htmlFor="business_registration_number"
                value="Business Registration Number"
              />
              <TextInput
                id="business_registration_number"
                type="text"
                placeholder="Business Registration Number"
                value={values.business_registration_number}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="vat_number" value="VAT Number" />
              <TextInput
                id="vat_number"
                type="text"
                placeholder="VAT Number"
                value={values.vat_number}
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <Label
                htmlFor="bank_account_number"
                value="Bank Account Number"
              />
              <TextInput
                id="bank_account_number"
                type="text"
                placeholder="Bank Account Number"
                value={values.bank_account_number}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="bank_account_name" value="Bank Account Name" />
              <TextInput
                id="bank_account_name"
                type="text"
                placeholder="Bank Account Name"
                value={values.bank_account_name}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <Label htmlFor="bank_name" value="Bank Name" />
              <TextInput
                id="bank_name"
                type="text"
                placeholder="Bank Name"
                value={values.bank_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="w-full">
          <h2 className="text-lg font-semibold my-5">Additional</h2>
          <div className="">
            <Label htmlFor="note" value="Note" />
            <Textarea
              id="note"
              placeholder="Note"
              value={values.note}
              onChange={handleChange}
              cols={3}
            />
          </div>
        </div>

        {/* Notes Section */}
        <div className="w-full">
          <h2 className="text-lg font-semibold my-5">Raw Materials on Hand</h2>
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
                {suppliers?.raw_materials?.length > 0 ? (
                  suppliers?.raw_materials.map((raw_material) => (
                    <Table.Row
                      key={raw_material.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800 font-medium text-gray-900 dark:text-white"
                    >
                      <Table.Cell>
                        <Checkbox
                          checked={multipleSelection?.includes(raw_material.id)}
                          onChange={() => handleMultipleSelect(raw_material.id)}
                        />
                      </Table.Cell>
                      <Table.Cell>{raw_material?.id}</Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.material_code}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.name}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <div className="flex flex-wrap gap-2">
                          {raw_material?.status === "IN_STOCK" && (
                            <Badge color="success">
                              {raw_material?.status}
                            </Badge>
                          )}
                          {raw_material?.status === "OUT_OF_STOCK" && (
                            <Badge color="failure">
                              {raw_material?.status}
                            </Badge>
                          )}
                        </div>
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            color={
                              raw_material?.category ? "warning" : "failure"
                            }
                          >
                            {raw_material?.category
                              ? raw_material?.category?.category_name
                              : "NULL"}
                          </Badge>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.quantity}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.remaining_quantity}
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.unit_price_in_usd} ($)
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.total_value_in_usd} ($)
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.unit_price_in_riel} (៛)
                      </Table.Cell>
                      <Table.Cell className="whitespace-nowrap">
                        {raw_material?.total_value_in_riel}
                        ​​ (​៛)
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="8" className="text-center py-4">
                      No raw materials found.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Raw Materials Relationship */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold my-5">Add More Raw Materials</h2>
          <RawMaterialRelationship createStatus={status} />
        </div> */}

        <div className="w-full mb-4" style={{ height: "400px" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
        </div>

        <div className="flex gap-5">
          <Link to="/suppliers" className="text-blue-500 cursor-pointer">
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
