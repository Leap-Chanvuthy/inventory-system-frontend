import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button, Label, TextInput, FileInput, Textarea } from "flowbite-react";

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

  console.log(values);

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
      latitude: lat,
      longitude: lng,
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

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <h1>Create Supplier Infos</h1>
      <form className="w-full flex flex-col gap-4 my-5">
        <div className="relative flex items-center justify-center">
          <Label
            htmlFor="image"
            className={`flex items-center justify-center cursor-pointer rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
              imagePreview ? "p-0" : "p-10"
            }`}
            style={{ width: "200px", height: "200px" }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <>
                <svg
                  className="text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </>
            )}
            <FileInput id="image" className="hidden" onChange={handleFileChange} />
          </Label>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Supplier Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Supplier Name"
              value={values.name}
              onChange={handleChange}
              required
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="phone_number" value="Phone Number" />
            </div>
            <TextInput
              id="phone_number"
              type="text"
              placeholder="Phone Number"
              value={values.phone_number}
              onChange={handleChange}
              required
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="location" value="Location" />
            </div>
            <TextInput
              id="location"
              type="text"
              placeholder="Location"
              value={values.location}
              onChange={handleChange}
              required
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="longitude" value="Longitude" />
            </div>
            <TextInput
              id="longitude"
              type="text"
              placeholder="Longitude"
              value={values.longitude}
              onChange={handleChange}
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="latitude" value="Latitude" />
            </div>
            <TextInput
              id="latitude"
              type="text"
              placeholder="Latitude"
              value={values.latitude}
              onChange={handleChange}
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <TextInput
              id="address"
              type="text"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput
              id="city"
              type="text"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              required
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="contact_person" value="Contact Person" />
            </div>
            <TextInput
              id="contact_person"
              type="text"
              placeholder="Contact Person"
              value={values.contact_person}
              onChange={handleChange}
              required
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="business_registration_number" value="Business Registration Number" />
            </div>
            <TextInput
              id="business_registration_number"
              type="text"
              placeholder="Business Registration Number"
              value={values.business_registration_number}
              onChange={handleChange}
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="vat_number" value="VAT Number" />
            </div>
            <TextInput
              id="vat_number"
              type="text"
              placeholder="VAT Number"
              value={values.vat_number}
              onChange={handleChange}
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="bank_account_number" value="Bank Account Number" />
            </div>
            <TextInput
              id="bank_account_number"
              type="text"
              placeholder="Bank Account Number"
              value={values.bank_account_number}
              onChange={handleChange}
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="bank_account_name" value="Bank Account Name" />
            </div>
            <TextInput
              id="bank_account_name"
              type="text"
              placeholder="Bank Account Name"
              value={values.bank_account_name}
              onChange={handleChange}
              shadow
            />
          </div>

          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="bank_name" value="Bank Name" />
            </div>
            <TextInput
              id="bank_name"
              type="text"
              placeholder="Bank Name"
              value={values.bank_name}
              onChange={handleChange}
              shadow
            />
          </div>
        </div>

        <div className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="note" value="Note" />
          </div>
          <Textarea
            cols={3}
            id="note"
            type="text"
            placeholder="Note"
            value={values.note}
            onChange={handleChange}
            shadow
          />
        </div>

        <div className="w-full mb-4" style={{ height: "400px" }}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onClick={handleMapClick}
          >
            {selectedLocation && (
              <Marker position={selectedLocation} />
            )}
          </GoogleMap>
        </div>

        <Button type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
