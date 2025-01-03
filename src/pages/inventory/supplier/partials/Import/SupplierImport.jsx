import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { Alert, Button, Label } from "flowbite-react";
import {
  DangerToast,
  SuccessToast,
} from "../../../../../components/ToastNotification";
import { BASE_URL } from "../../../../../components/const/constant";
import { HiInformationCircle } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const SupplierImport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  console.log(error);
  const [success, setSuccess] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /(\.xlsx|\.csv)$/i;

    if (!allowedExtensions.exec(file.name)) {
      alert("Please upload a file with .xlsx or .csv extension.");
      event.target.value = ""; // Clear the input
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("supplier_file", selectedFile);

    setUploading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/suppliers/import`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      setSelectedFile(null);
      setUploading(false);
      setError(null);
      setSuccess("Suppliers Imported Successfully!");
      setSuccessToastOpen(true);
    } catch (err) {
      setUploading(false);
      setError(err.response?.data?.errors || "An error occurred");
      setToastOpen(true);
      console.error("Error uploading file:", err?.response);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-lg font-semibold">Bulk Upload Suppliers Data</h2>
        <p>
          This functionality allows you to upload and integrate data files
          seamlessly. Whether you're updating existing records or adding new
          information, our import tool ensures that your data is accurately
          processed and incorporated into the system.
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-center mt-4 mb-4">
          <Label
            htmlFor="file_input"
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
                CSV , XLSX (max. 10MB)
              </p>
            </div>
            <input
              id="file_input"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        {selectedFile && (
          <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md dark:bg-slate-700">
            <span className="text-gray-900 dark:text-white">
              {selectedFile.name}
            </span>
            <AiOutlineDelete
              className="text-red cursor-pointer"
              onClick={handleRemoveFile}
            />
          </div>
        )}

        <DangerToast
          open={toastOpen}
          onClose={() => setToastOpen(false)}
          message="Somethings went wrong!"
        />

        <SuccessToast
          open={successToastOpen}
          onClose={() => setSuccessToastOpen(false)}
          message={success}
        />

        {error &&
          error.map((err) => (
            <Alert key={err.row} color="failure" icon={HiInformationCircle}>
              <span className="font-medium">
                Row {err.row}: {err.attribute} - {err.errors.join(", ")}
              </span>
            </Alert>
          ))}

        {/* <Button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button> */}

        <div className="flex gap-5">
          <Link to="/raw-materials" className="text-blue-500 cursor-pointer">
            <Button color="gray">
              <IoIosArrowBack className="mr-2" />
              Back
            </Button>
          </Link>
          <Button color="failure" onClick={handleRemoveFile} className="w-sm">
            Cancel
          </Button>
          <Button
            className="w-full"
            onClick={handleUpload}
            disabled={uploading || !selectedFile}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupplierImport;
