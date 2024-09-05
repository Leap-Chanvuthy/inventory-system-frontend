import { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button, Label, TextInput } from "flowbite-react";

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
  
  const [values , setValues] = useState({
    latitute : "",
    longitude : ""
  });

  console.log(values);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAd4rEAQqf58fCJGABqW99teDP9BcuyN08",
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

        setValues({
          ...values,       
          latitute: lat,   
          longitude: lng, 
        });
      
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <h1>Create Supplier Infos</h1>
      <form className="w-full flex flex-col gap-4 my-5">
        <div className="flex flex-col lg:md:flex-row gap-3">
          {/* Name */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Supplier Name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Supplier Name"
              required
              shadow
            />
          </div>
          {/* Phone Number */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="phone_number" value="Phone Number" />
            </div>
            <TextInput
              id="phone_number"
              type="text"
              placeholder="Phone Number"
              required
              shadow
            />
          </div>
          {/* Location */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="location" value="Location" />
            </div>
            <TextInput
              id="location"
              type="text"
              placeholder="Location"
              required
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row gap-3">
          {/* Longitude */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="longitude" value="Longitude" />
            </div>
            <TextInput
              id="longitude"
              type="text"
              placeholder="Longitude"
              shadow
            />
          </div>
          {/* Latitude */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="latitude" value="Latitude" />
            </div>
            <TextInput
              id="latitude"
              type="text"
              placeholder="Latitude"
              shadow
            />
          </div>
          {/* Address */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="address" value="Address" />
            </div>
            <TextInput id="address" type="text" placeholder="Address" shadow />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row gap-3">
          {/* City */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="city" value="City" />
            </div>
            <TextInput id="city" type="text" placeholder="City" shadow />
          </div>
          {/* Email */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="Email"
              required
              shadow
            />
          </div>
          {/* Contact Person */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="contact_person" value="Contact Person" />
            </div>
            <TextInput
              id="contact_person"
              type="text"
              placeholder="Contact Person"
              required
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row gap-3">
          {/* Business Registration Number */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="business_registration_number"
                value="Business Registration Number"
              />
            </div>
            <TextInput
              id="business_registration_number"
              type="text"
              placeholder="Business Registration Number"
              shadow
            />
          </div>
          {/* VAT Number */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="vat_number" value="VAT Number" />
            </div>
            <TextInput
              id="vat_number"
              type="text"
              placeholder="VAT Number"
              shadow
            />
          </div>
          {/* Bank Account Number */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label
                htmlFor="bank_account_number"
                value="Bank Account Number"
              />
            </div>
            <TextInput
              id="bank_account_number"
              type="text"
              placeholder="Bank Account Number"
              shadow
            />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row gap-3">
          {/* Bank Account Name */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="bank_account_name" value="Bank Account Name" />
            </div>
            <TextInput
              id="bank_account_name"
              type="text"
              placeholder="Bank Account Name"
              shadow
            />
          </div>
          {/* Bank Name */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="bank_name" value="Bank Name" />
            </div>
            <TextInput
              id="bank_name"
              type="text"
              placeholder="Bank Name"
              shadow
            />
          </div>
          {/* Note */}
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="note" value="Note" />
            </div>
            <TextInput
              id="note"
              type="text"
              placeholder="Note"
              required
              shadow
            />
          </div>
        </div>

        {/* Map Picker */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeat-password" value="Pick Location" />
          </div>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
          </GoogleMap>
          {selectedLocation && (
            <div className="mt-4">
              <p>Latitude: {selectedLocation.lat}</p>
              <p>Longitude: {selectedLocation.lng}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit">Submit Supplier Info</Button>
      </form>
    </div>
  );
};

export default CreateForm;
