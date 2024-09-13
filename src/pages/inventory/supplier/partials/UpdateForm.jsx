import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  Button,
  Label,
  TextInput,
  FileInput,
  Textarea,
  Spinner,
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
import { BASE_URL , BASE_IMAGE_URL } from "../../../../components/const/constant";
import {
  SuccessToast,
  DangerToast,
} from "../../../../components/ToastNotification";
import { useParams } from "react-router-dom";

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
    const { error, status , suppliers } = useSelector((state) => state.suppliers);

    // fetch specific supplier
    const {id} = useParams();

    console.log(`${BASE_URL}/supplier/${id}`);
    useEffect(() =>{
      const getSupplierById = async () =>{
        dispatch(getSuppliersStart());
        try {
          const response = await axios.get(`${BASE_URL}/supplier/${id}`)
          dispatch(getSupplierSuccess(response.data));
          console.log('suppliers data response from axios:' , response);
        }catch (err){
          console.log(err);
          dispatch(getSuppliersFailed(err.message || 'Error to get data from server'));
        }
      }
      getSupplierById();
    },[id , dispatch]);
  
  const [values, setValues] = useState({
    image: "",
    name: "",
    phone_number: "",
    location: "",
    longitude: "",
    latitude: "",
    address: "",
    city: "",
    email: "",
    contact_person: "",
    business_registration_number: "",
    vat_number: "",
    bank_account_number: "",
    bank_account_name: "",
    bank_name: "",
    note: "",
  });

  useEffect(() => {
    if (suppliers) {
      setValues({
        image: suppliers.image || "",
        name: suppliers.name || "",
        phone_number: suppliers.phone_number || "",
        location: suppliers.location || "",
        longitude: suppliers.longitude || "",
        latitude: suppliers.latitude || "",
        address: suppliers.address || "",
        city: suppliers.city || "",
        email: suppliers.email || "",
        contact_person: suppliers.contact_person || "",
        business_registration_number: suppliers.business_registration_number || "",
        vat_number: suppliers.vat_number || "",
        bank_account_number: suppliers.bank_account_number || "",
        bank_account_name: suppliers.bank_account_name || "",
        bank_name: suppliers.bank_name || "",
        note: suppliers.note || "",
      });
    }
  }, [suppliers , ]);

  console.log("fetched suppliers: " , suppliers , "form values :" , values );

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


  // handle submit patch request
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createSupplierStart());
    try {
      const response = await axios.post(`${BASE_URL}/supplier/${id}`, values, {
        params : {
          '_method' : 'PATCH',
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(createSupplierSuccess(response));
      setSuccessToastOpen(true);
      dispatch(getSupplierSuccess());
    } catch (error) {
      console.log(error);
      dispatch(createSupplierFailed(error?.response?.data?.errors));
      setFailToastOpen(true);
    }
  };

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
        <div className="relative flex items-center justify-center">
          <Label
            htmlFor="image"
            className={`flex items-center justify-center cursor-pointer rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
              imagePreview ? "p-0" : "p-10"
            }`}
            style={{ width: "250px", height: "250px" }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <>
              <img
                src={`${BASE_IMAGE_URL}/${suppliers.image}`}
                alt="Preview"
                className="w-[500px] h-full object-cover rounded-full"
              />
              </>
            )}
            <FileInput
              id="image"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
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
              <Label htmlFor="city" value="City" />
              <TextInput
                id="city"
                type="text"
                placeholder="City"
                value={values.city}
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

        <Button type="submit">
          {status == "loading" ? <Spinner /> : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateForm;
