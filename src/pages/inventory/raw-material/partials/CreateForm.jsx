import { Alert, Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import {
  DangerToast,
  SuccessToast,
} from "../../../../components/ToastNotification";
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
import SupplierRelationship from "./relationships/SupplierRelationship";
import { HiInformationCircle } from "react-icons/hi";
import { toggleSingleSelection } from "../../../../redux/slices/selectionSlice";

const CreateForm = () => {
  const { status, error } = useSelector((state) => state.rawMaterials);
  const {singleSelection} = useSelector((state) => state.selections);
  const dispatch = useDispatch();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [failedToastOpen, setFailToastOpen] = useState(false);

  const [values, setValues] = useState({
    image: [],
    name: "",
    material_code: "",
    quantity: "",
    remaining_quantity: "",
    unit_price_in_usd: "",
    total_value_in_usd: "",
    exchange_rate_from_usd_to_riel : "",
    unit_price_in_riel: "",
    total_value_in_riel: "",
    exchange_rate_from_riel_to_usd : "",
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

  console.log(values);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  useEffect(() => {
    setValues((prevValues) => ({ ...prevValues, supplier_id: singleSelection }));
  }, [singleSelection]);

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
  const [categories , setCategories] = useState([]);
  console.log(categories)

  useEffect(() =>{
    const getCategory = async (e) =>{
      try {
        
        const response = await axios.get(`${BASE_URL}/non-paginate/raw-material-categories`)
        console.log(response.data);
        setCategories(response.data);
      }catch (err){
        console.log(err);
      }
    }
    getCategory();
  } , [])

  // Submit post request to backend

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addRawMaterialStart());
    try {
      const response = await axios.post(`${BASE_URL}/raw-materials`, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(addRawMaterialSuccess(response.data));
      setOpenSuccess(true);
      setValues({
        image: [],
        name: "",
        material_code: "",
        quantity: "",
        remaining_quantity: "",
        unit_price_in_usd: "",
        total_value_in_usd: "",
        unit_price_in_riel: "",
        total_value_in_riel: "",
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
      dispatch(toggleSingleSelection(null));
    } catch (error) {
      console.error("Error submitting the form:", error);
      setFailToastOpen(true);
      dispatch(addRawMaterialFailure(error?.response?.data?.errors));
    }
  };

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
            </div>

            <h2 className="text-md font-semibold">Currency Info</h2>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="unit_price_in_usd" value="Unit Price in USD" />
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
                  <Label htmlFor="total_value_in_usd" value="Total Value in USD" />
                  <TextInput
                    id="total_value_in_usd"
                    type="text"
                    placeholder="Enter total value"
                    value={values.total_value_in_usd}
                    onChange={handleChange}
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
                  <Label htmlFor="exchange_rate_from_usd_to_riel" value="Exchange Rate From USD to Riel" />
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
              <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
              <div>
                  <Label
                    htmlFor="unit_price_in_riel"
                    value="Unit Price in Riel"
                  />
                  <TextInput
                    id="unit_price_in_riel"
                    type="text"
                    placeholder="Enter total value"
                    value={values.unit_price_in_riel}
                    onChange={handleChange}
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
                    id="total_value_in_riel"
                    type="text"
                    placeholder="Enter total value"
                    value={values.total_value_in_riel}
                    onChange={handleChange}
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
                  <Label htmlFor="exchange_rate_from_riel_to_usd" value="Exchange Rate From Riel to USD" />
                  <TextInput
                    id="exchange_rate_from_riel_to_usd"
                    type="text"
                    placeholder="Enter total value"
                    value={values.exchange_rate_from_riel_to_usd}
                    onChange={handleChange}
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

            <h2 className="text-md font-semibold">Additional</h2>
            <div className="grid grid-cols-1 lg:md:grid-cols-3 gap-3">
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
                  {categories && categories.map((category) =>(
                    <option value={category.id}>{category.category_name}</option>
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

          <div className="flex flex-col gap-3">
              <SupplierRelationship/>
              {error?.supplier_id &&
                <Alert color="failure" icon={HiInformationCircle}>
                  <span className="font-medium">{error?.supplier_id}</span>
                </Alert>
              }
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

        <Button type="submit" className="w-full">
          {status === "loading" ? <Spinner /> : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;
