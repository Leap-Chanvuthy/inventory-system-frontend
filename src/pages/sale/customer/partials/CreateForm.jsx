import {
  Button,
  Label,
  TextInput,
  Select,
  Timeline,
  Textarea,
  Spinner,
} from "flowbite-react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { HiCalendar } from "react-icons/hi";
import { DangerToast, SuccessToast } from "../../../../components/ToastNotification";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../../components/const/constant";
import axios from "axios";
import { MdCancel } from "react-icons/md";
import {
  createCustomerFailed,
  createCustomerStart,
  createCustomerSuccess,
} from "../../../../redux/slices/customerSlice";

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

const CreateForm = () => {
  const { error, status, customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [values, setValues] = useState({
    image: "",
    fullname: "",
    email_address: "",
    phone_number: "",
    social_media: "",
    shipping_address: "",
    longitude: "",
    latitude: "",
    customer_status: "",
    customer_category_id: "",
    customer_note: "",
  });

  // // get customer category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async (e) => {
      try {
        const response = await axios.get(`${BASE_URL}/customer-categories/all`);
        console.log(response.data);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  // Map selection
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

  // Handle values change
  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    setValues({ ...values, [key]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValues((prevValues) => ({
        ...prevValues,
        image: file,
      }));
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

  // Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCustomerStart());
    try {
      const response = await axios.post(`${BASE_URL}/customer`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(createCustomerSuccess(response.data));
      setSuccessToastOpen(true);
      setValues({
        image: "",
        fullname: "",
        email_address: "",
        phone_number: "",
        social_media: "",
        shipping_address: "",
        longitude: "",
        latitude: "",
        customer_status: "",
        customer_category_id: "",
        customer_note: "",
      });
    } catch (err) {
      console.log(err.response);
      setFailToastOpen(true);
      dispatch(createCustomerFailed(err?.response?.data?.errors));
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="my-5">
      <SuccessToast
        open={successToastOpen}
        onClose={() => setOpenSuccess(false)}
        message="Customer created Successfully"
      />

      <DangerToast
        open={failToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something Went Wrong!"
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Timeline>
          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Title>Customer Info</Timeline.Title>
              <Timeline.Body>
                <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3 my-3">
                  <div className="w-full">
                    <Label htmlFor="fullname" value="Customer Name" />
                    <TextInput
                      id="fullname"
                      type="text"
                      placeholder="Customer Name"
                      className={`${
                        error?.fullname
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      value={values.fullname}
                      onChange={handleChange}
                      helperText={
                        error?.fullname && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.fullname}
                            </span>
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
                      placeholder="Phone Number"
                      className={`${
                        error?.phone_number
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      value={values.phone_number}
                      onChange={handleChange}
                      helperText={
                        error?.phone_number && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.phone_number}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>

                  <div className="w-full">
                    <Label htmlFor="email" value="Email Address" />
                    <TextInput
                      id="email_address"
                      type="text"
                      placeholder="Email Address"
                      className={`${
                        error?.email_address
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      value={values.email_address}
                      onChange={handleChange}
                      helperText={
                        error?.email_address && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.email_address}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>

                  <div className="w-full">
                    <Label htmlFor="social_media" value="Socail Media" />
                    <TextInput
                      id="social_media"
                      type="text"
                      placeholder="eg, facebook, telegram"
                      value={values.social_media}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Title>Status & Category</Timeline.Title>
              <Timeline.Body>
                <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3 my-3">
                  <div className="w-full">
                    <Label htmlFor="customer_status" value="Customer Status" />
                    <Select
                      id="customer_status"
                      type="text"
                      placeholder="Website"
                      value={values.customer_status}
                      onChange={handleChange}
                      helperText={
                        error?.customer_status && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.customer_status}
                            </span>
                          </>
                        )
                      }
                    >
                      <option value="">Select an option</option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="SUSPENDED">Suspended</option>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="customer_category_id" value="Category" />
                    <Select
                      id="customer_category_id"
                      placeholder="Choose category"
                      value={values.customer_category_id}
                      onChange={handleChange}
                      helperText={
                        error?.customer_category_id && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.customer_category_id}
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
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Title>Location</Timeline.Title>
              <Timeline.Body>
                <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3 my-3">
                  <div className="w-full">
                    <Label
                      htmlFor="shipping_address"
                      value="Customer Address"
                    />
                    <TextInput
                      id="shipping_address"
                      type="text"
                      placeholder="Address"
                      className={`${
                        error?.shipping_address
                          ? "border-[1.5px] border-red-400 rounded-md"
                          : ""
                      } `}
                      value={values.shipping_address}
                      onChange={handleChange}
                      helperText={
                        error?.shipping_address && (
                          <>
                            <span className="font-medium text-red-400">
                              {error.shipping_address}
                            </span>
                          </>
                        )
                      }
                    />
                  </div>

                  <div className="w-full">
                    <Label htmlFor="longitude" value="Longitude" />
                    <TextInput
                      id="longitude"
                      type="text"
                      disabled
                      value={values.longitude}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="w-full">
                    <Label htmlFor="latitude" value="Latitude" />
                    <TextInput
                      id="latitude"
                      type="text"
                      disabled
                      value={values.latitude}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full my-5" style={{ height: "400px" }}>
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
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Title>Additional</Timeline.Title>
              <Timeline.Body>
                <div className="my-5">
                  <Label htmlFor="customer_note" value="Note" />
                  <Textarea
                    cols={4}
                    id="customer_note"
                    placeholder="Write your note"
                    value={values.customer_note}
                    onChange={handleChange}
                  />
                </div>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Title>Image</Timeline.Title>
              <Timeline.Body>
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
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG or GIF (max. 2MB)
                      </p>
                    </div>
                    <input
                      id="image_upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  {values.image && (
                    <div className="relative mr-2 mb-2">
                      <img
                        src={URL.createObjectURL(values.image)}
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
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
        <Button disabled={status == 'loading'} type="submit" onClick={() => setOpenSuccess(true)}>
          {status == 'loading' ? <Spinner /> : 'Save'}
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
