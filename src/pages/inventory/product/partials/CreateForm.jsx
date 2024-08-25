import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { MdOutlineMarkEmailUnread, MdLockOpen } from "react-icons/md";
import { SuccessToast } from "../../../../components/ToastNotification";

const CreateForm = () => {
  const [values, setValues] = useState({
    product_image: null,
    product_name: "",
    color: "",
    category: "",
    price: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleChange = e => {
    const { id, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [id]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValues(prevValues => ({ ...prevValues, product_image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Handle form submission
    setOpenSuccess(true);
  };

  return (
    <div className="my-5 ">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Product Created Successfully"
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative flex items-center justify-center">
          <Label
            htmlFor="product_image"
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
              <svg
                className="h-[100%] text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
            <FileInput
              id="product_image"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        <div>
          <Label htmlFor="product_name" value="Product Name" />
          <TextInput
            id="product_name"
            placeholder="Enter product name"
            required
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex flex-col lg:md:flex-row gap-3 ">
          <div className="w-full">
            <Label htmlFor="color" value="Color" />
            <TextInput
              id="color"
              placeholder="Enter color"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-full  flex flex-col ">
            <Label htmlFor="category" value="Category" />
            <select
              name=""
              id="category"
              className="border-[1px] rounded-[8px] "
              onChange={handleChange}
            >
              <option value="Raw Materials">Raw Materials</option>
              <option value="Work InWork In Progress ">Work In Progress</option>
              <option value="Packaging">Packaging</option>
              <option value="Finished Goods">Finished Goods</option>
            </select>
            {/* <TextInput
              id="category"
              placeholder="Enter category"
              required
              onChange={handleChange}
            /> */}
          </div>
        </div>

        <div>
          <Label htmlFor="price" value="Price" />
          <TextInput
            id="price"
            type="text"
            placeholder="Enter price"
            required
            onChange={handleChange}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateForm;
