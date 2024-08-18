import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdLockOpen } from "react-icons/md";
import { SuccessToast } from "../../../components/ToastNotification";


const CreateForm = () => {

  const [values , setValues] = useState({
    profile_picture : null,
    email : '',
    password : '',
    password_confirmation : '',
    role : ''
  });

  const handleChange = (e) =>{
    const  value = e.target.value;
    const key = e.target.id;
    setValues({...values , [key] : value });
  }

  const [openSuccess, setOpenSuccess] = useState(false);

  return (
    <div className="my-5">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="User Created Successfully"
      />
      <form className="flex flex-col gap-4">
        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <FileInput id="dropzone-file" className="hidden" />
          </Label>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required
            rightIcon={MdOutlineMarkEmailUnread}
          />
        </div>

        <div className="w-full flex flex-col lg:md:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label value="Password" />
            </div>
            <TextInput id="password" type="password" rightIcon={MdLockOpen} required />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label value="Password Confirmation" />
            </div>
            <TextInput id="password_confrimation" rightIcon={MdLockOpen} type="password" required />
          </div>
        </div>

        <div>
            <div className="mb-2 block">
              <Label value="Role" />
            </div>  
          <Select id="role" required>
            <option>Role</option>
            <option>Admin</option>
            <option>Stock Controller</option>
            <option>Saler</option>
          </Select>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CreateForm;
