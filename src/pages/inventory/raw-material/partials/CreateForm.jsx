import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { SuccessToast } from "../../../../components/ToastNotification";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";

const CreateForm = () => {
  const [values, setValues] = useState({
    raw_materials: [
      {
        product_images: [],
        name: "",
        quantity: "",
        unit_price: "",
        total_value: "",
        minimum_stock_level: "",
        unit: "",
        package_size: "",
        supplier_id: "",
      },
    ],
    payment_method: "",
    status: "",
    discount_percentage: 0,
    tax_percentage: 0,
    clearing_payable: 0,
    indebted: 0,
  });
  console.log(values);

  const [openSuccess, setOpenSuccess] = useState(false);

  const handleChange = (index, e) => {
    const { id, value } = e.target;
    if (index === null) {
      setValues((prevValues) => ({ ...prevValues, [id]: value }));
    } else {
      const updatedMaterials = [...values.raw_materials];
      updatedMaterials[index][id] = value;
      setValues({ ...values, raw_materials: updatedMaterials });
    }
  };

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length) {
      const newImagePreviews = validImages.map((file) =>
        URL.createObjectURL(file)
      );

      const updatedMaterials = [...values.raw_materials];
      updatedMaterials[index].product_images = [
        ...updatedMaterials[index].product_images,
        ...validImages,
      ];
      setValues({ ...values, raw_materials: updatedMaterials });
    } else {
      alert("Please upload valid image files.");
    }
  };

  const handleAddProduct = () => {
    setValues((prevValues) => ({
      ...prevValues,
      raw_materials: [
        ...prevValues.raw_materials,
        {
          product_images: [],
          name: "",
          quantity: "",
          unit_price: "",
          total_value: "",
          minimum_stock_level: "",
          unit: "",
          package_size: "",
          supplier_id: "",
        },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedMaterials = [...values.raw_materials];
    updatedMaterials.splice(index, 1);
    setValues({ ...values, raw_materials: updatedMaterials });
  };

  const handleRemoveImage = (productIndex, imageIndex) => {
    const updatedMaterials = [...values.raw_materials];
    updatedMaterials[productIndex].product_images.splice(imageIndex, 1);
    setValues({ ...values, raw_materials: updatedMaterials });
  };



  // sending post request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${BASE_URL}/raw-materials` , values);
    console.log(response);
    // setOpenSuccess(true);
  };

  return (
    <div className="my-5">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Products Created Successfully"
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="payment_method" value="Payment Method" />
            <TextInput
              id="payment_method"
              placeholder="Enter payment method"
              required
              value={values.payment_method}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="status" value="Status" />
            <TextInput
              id="status"
              placeholder="Enter status"
              required
              value={values.status}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="discount_percentage" value="Discount Percentage" />
            <TextInput
              id="discount_percentage"
              type="number"
              placeholder="Enter discount percentage"
              required
              value={values.discount_percentage}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="tax_percentage" value="Tax Percentage" />
            <TextInput
              id="tax_percentage"
              type="number"
              placeholder="Enter tax percentage"
              required
              value={values.tax_percentage}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="clearing_payable" value="Clearing Payable" />
            <TextInput
              id="clearing_payable"
              type="number"
              placeholder="Enter clearing payable amount"
              required
              value={values.clearing_payable}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="indebted" value="Indebted" />
            <TextInput
              id="indebted"
              type="number"
              placeholder="Enter indebted amount"
              required
              value={values.indebted}
              onChange={(e) => handleChange(null, e)}
            />
          </div>
        </div>

        {values.raw_materials.map((material, index) => (
          <div
            key={index}
            className="border border-dashed border-slate-600 p-4 rounded-md mb-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">
                Raw Material {index + 1}
              </h3>
              {values.raw_materials.length > 1 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <MdCancel className="text-red text-xl" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" value="Material Name" />
                <TextInput
                  id="name"
                  placeholder="Enter material name"
                  required
                  value={material.name}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="quantity" value="Quantity" />
                <TextInput
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  required
                  value={material.quantity}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="unit_price" value="Unit Price" />
                <TextInput
                  id="unit_price"
                  type="text"
                  placeholder="Enter unit price"
                  required
                  value={material.unit_price}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="total_value" value="Total Value" />
                <TextInput
                  id="total_value"
                  type="text"
                  placeholder="Enter total value"
                  required
                  value={material.total_value}
                  onChange={(e) => handleChange(index, e)}
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
                  required
                  value={material.minimum_stock_level}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="unit" value="Unit" />
                <TextInput
                  id="unit"
                  type="text"
                  placeholder="Enter unit (e.g., kg)"
                  required
                  value={material.unit}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="package_size" value="Package Size" />
                <TextInput
                  id="package_size"
                  type="text"
                  placeholder="Enter package size (e.g., 10kg)"
                  required
                  value={material.package_size}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="supplier_id" value="Supplier ID" />
                <TextInput
                  id="supplier_id"
                  type="number"
                  placeholder="Enter supplier ID"
                  required
                  value={material.supplier_id}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>

            <div className="flex items-center justify-center mt-4 mb-4">
              <Label
                htmlFor={`image_${index}`}
                className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-4 w-full"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="h-8 w-8 text-gray-500 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Upload Image</span>
                </div>
                <FileInput
                  id={`image_${index}`}
                  className="hidden"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </Label>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {material.product_images.map((file, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${imgIndex}`}
                    className="w-full h-[8rem] object-cover rounded-md border-2 border-slate-800 dark:bg-slate-300"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-600 h-8 w-8 rounded-full bg-slate-800 text-white p-1"
                    onClick={() => handleRemoveImage(index, imgIndex)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button type="button" onClick={handleAddProduct}>
            Add Another Product
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
