import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai"; 
import axios from "axios";
import { Button } from "flowbite-react";
import { DangerToast, SuccessToast } from "../../../../../components/ToastNotification";
import { BASE_URL } from "../../../../../components/const/constant";

const SupplierImport = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); 
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
      const response = await axios.post(`${BASE_URL}/suppliers/import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);

      setSelectedFile(null);
      setUploading(false);
      setError(null);
      setSuccess("Suppliers Imported Successfully!");
      setSuccessToastOpen(true); 
    } catch (err) {
      setUploading(false);
      setError(err.response?.data?.error || 'An error occurred');
      setToastOpen(true); 
      console.error("Error uploading file:", err?.response);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-lg font-semibold">Bulk Upload Suppliers Data</h2>
        <p>
        This functionality allows you to upload and integrate data files seamlessly. Whether you're updating existing records or adding new information, our import tool ensures that your data is accurately processed and incorporated into the system. 
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-center mt-4 mb-4">
          <label
            htmlFor="file_input"
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
              <span>Upload File</span>
            </div>
            <input
              type="file"
              id="file_input"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {selectedFile && (
          <div className="flex items-center justify-between mb-4 bg-gray-100 p-3 rounded-md dark:bg-slate-700">
            <span className="text-gray-900 dark:text-white">{selectedFile.name}</span>
            <AiOutlineDelete
              className="text-red cursor-pointer"
              onClick={handleRemoveFile}
            />
          </div>
        )}

        <DangerToast
          open={toastOpen}
          onClose={() => setToastOpen(false)}
          message={error}
        />

        <SuccessToast
          open={successToastOpen}
          onClose={() => setSuccessToastOpen(false)}
          message={success}
        />

        <Button
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
        >
          {uploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default SupplierImport;
