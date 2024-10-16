import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { DangerToast, SuccessToast } from "../../../../components/ToastNotification";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import {
  addRawMaterialStart,
  addRawMaterialSuccess,
  addRawMaterialFailure,
} from "../../../../redux/slices/rawMaterialSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { getCurrencyFailure, getCurrencyStart, getCurrencySuccess } from "../../../../redux/slices/currencySlice";

const CreateForm = () => {
  const [values, setValues] = useState({
    product_images: [],
    name: "",
    material_code: "",
    quantity: "",
    unit_price: "",
    total_value: "",
    minimum_stock_level: "",
    raw_material_category: "",
    unit_of_measurement: "",
    package_size: "",
    status: "",
    location: "",
    description: "",
    expiry_date: "",
    supplier_id: "",
    currency_id : ""
  });

  console.log(values);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [failedToastOpen, setFailToastOpen] = useState(false);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.rawMaterials);
  const {currencies} = useSelector((state) => state.currencies);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length) {
      const newImagePreviews = validImages.map((file) =>
        URL.createObjectURL(file)
      );

      setValues((prevValues) => ({
        ...prevValues,
        product_images: [...prevValues.product_images, ...validImages],
      }));
    } else {
      alert("Please upload valid image files.");
    }
  };

  const handleRemoveImage = (imageIndex) => {
    const updatedImages = [...values.product_images];
    updatedImages.splice(imageIndex, 1);
    setValues({ ...values, product_images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addRawMaterialStart());
    try {
      const formData = new FormData();
      for (const key in values) {
        if (Array.isArray(values[key])) {
          values[key].forEach((file) => formData.append(key, file));
        } else {
          formData.append(key, values[key]);
        }
      }
      const response = await axios.post(`${BASE_URL}/raw-materials`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addRawMaterialSuccess(response.data));
      setOpenSuccess(true);
      setValues({
        product_images: [],
        name: "",
        material_code: "",
        quantity: "",
        unit_price: "",
        total_value: "",
        minimum_stock_level: "",
        raw_material_category: "",
        unit_of_measurement: "",
        package_size: "",
        status: "",
        location: "",
        description: "",
        expiry_date: "",
        supplier_id: "",
      })
    } catch (error) {
      console.error("Error submitting the form:", error);
      setFailToastOpen(true);
      dispatch(addRawMaterialFailure(error?.response?.data?.errors));
    }
  };


  // get currency 

  useEffect(() => {
    const getCurrency = async (e) => {
      dispatch(getCurrencyStart());
      try {
        const response = await axios.get(`${BASE_URL}/currencies`);
        console.log(response);
        dispatch(getCurrencySuccess(response.data));
      }catch (err){
        console.log('error' , err);
        dispatch(getCurrencyFailure(err?.response?.data));
      }
    } 
    getCurrency();
  } , [])


  return (
    <div className="my-5">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Product Created Successfully"
      />

      <DangerToast
        open={failedToastOpen}
        onClose={() => setFailToastOpen(false)}
        message="Something went wrong."
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
                <Label htmlFor="material_code" value="Material Code (Auto Generated)" />
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
                <Label htmlFor="unit_price" value="Unit Price" />
                <TextInput
                  id="unit_price"
                  type="text"
                  placeholder="Enter unit price"
                  value={values.unit_price}
                  onChange={handleChange}
                  className={`${
                    error?.unit_price
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.unit_price && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.unit_price}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <Label htmlFor="total_value" value="Total Value" />
                <TextInput
                  id="total_value"
                  type="text"
                  placeholder="Enter total value"
                  value={values.total_value}
                  onChange={handleChange}
                  className={`${
                    error?.total_value
                      ? "border-[1.5px] border-red-400 rounded-md"
                      : ""
                  } `}
                  helperText={
                    error?.total_value && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.total_value}
                        </span>
                      </>
                    )
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="currency_id"
                  value="Choose currency"
                />
                <Select
                  id="currency_id"
                  value={values.currency_id}
                  onChange={handleChange}
                  helperText={
                    error?.currency_id && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.currency_id}
                        </span>
                      </>
                    )
                  }
                >
                <option value="">Select an option</option>
                {currencies && currencies.map((currency) => (
                  <option value={currency.id}>{currency.base_currency_name} - {currency.symbol} </option>
                ))}
                </Select>
              </div>


            </div>

            <h2 className="text-md font-semibold">Additional</h2>          
            <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
              <div>
                <Label
                  htmlFor="raw_material_category"
                  value="Raw Material Category"
                />
                <Select
                  id="raw_material_category"
                  placeholder="Enter raw material category"
                  value={values.raw_material_category}
                  onChange={handleChange}
                  helperText={
                    error?.raw_material_category && (
                      <>
                        <span className="font-medium text-red-400">
                          {error.raw_material_category}
                        </span>
                      </>
                    )
                  }
                >
                <option value="">Select an option</option>
                <option value='CATEGORY_1'>Category 1</option>
                <option value='CATEGORY_2'>Category 2</option>
                <option value='CATEGORY_3'>Category 3</option>

                </Select>
              </div>

              <div>
                <Label
                  htmlFor="status"
                  value="Status"
                />
                <Select
                  id="status"
                  placeholder="Enter status"
                  value={values.status}
                  onChange={handleChange}
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
                  <option value=''>Select an option</option>
                  <option value='IN_STOCK'>In stock</option>
                  <option value='OUT_OF_STOCK'>Out of stock</option>
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
            </div>

            <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
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
          </div>

          
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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

          <div className="flex flex-col gap-4 mt-2">
            {values.product_images.length > 0 && (
              <div className="flex flex-wrap">
                {values.product_images.map((image, index) => (
                  <div key={index} className="relative mr-2 mb-2">
                    <img
                      src={URL.createObjectURL(image)}
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

        <Button type="submit" className="w-full">
          {status === 'loading' ? <Spinner /> : 'Save'}
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
