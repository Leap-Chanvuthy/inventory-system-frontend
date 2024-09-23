import {
  Button,
  FileInput,
  Label,
  TextInput,
  Select,
  Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { MdOutlineMarkEmailUnread, MdLockOpen } from "react-icons/md";
import {
  DangerToast,
  SuccessToast,
} from "../../../components/ToastNotification";
import {
  addUserStart,
  addUserSuccess,
  addUserFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../components/const/constant";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const dispatch = useDispatch();
  const { error, loading, status, users } = useSelector((state) => state.users);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);
  const { id } = useParams();

  console.log(users);

  // query specific user
  useEffect(() => {
    const getUserbyId = async () => {
      dispatch(fetchUsersStart());
      try {
        const response = await axios.get(`${BASE_URL}/users/${id}`);
        console.log(response);
        dispatch(fetchUsersSuccess(response.data));
      } catch (err) {
        console.log(err);
        dispatch(fetchUsersFailure(err?.response?.data));
      }
    };

    getUserbyId();
  }, [id, dispatch]);

  const [values, setValues] = useState({
    profile_picture: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  useEffect(() =>{
    if (users){
        setValues({
            profile_picture: users?.profile_picture,
            name: users?.name,
            email: users?.email,
            role: users?.role,
        })
    }
  }, [users]);


  // image preview handler
  const [imagePreview, setImagePreview] = useState(null);
  const handleChange = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    setValues({ ...values, [key]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValues({ ...values, profile_picture: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // update function
  const hanleUpdateUser = async (e) => {
    e.preventDefault();
    dispatch(addUserStart());
    try {
      const response = await axios.post(`${BASE_URL}/user/${id}`, values, {
        params: {
          _method: "PATCH",
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(addUserSuccess(response.data));
      setOpenSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch(addUserFailure(error?.response?.data?.errors));
      setOpenFailure(true);
    }
  };

  return (
    <div className="my-5">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="User Updated Successfully"
      />

      {error && (
        <DangerToast
          open={openFailure}
          onClose={() => setOpenFailure(false)}
          message="Something went wrong."
        />
      )}

      <form onSubmit={hanleUpdateUser} className="flex flex-col gap-4">
        <div className="relative flex items-center justify-center">
          <Label
            htmlFor="profile_picture"
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
              </>
            )}
            <FileInput
              id="profile_picture"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={values.email}
            placeholder="name@flowbite.com"
            rightIcon={MdOutlineMarkEmailUnread}
            onChange={handleChange}
            className={`${
              error?.email ? "border-[1.5px] border-red rounded-md" : ""
            } `}
            helperText={
              error?.email && (
                <>
                  <span className="font-medium text-red">{error.email}</span>
                </>
              )
            }
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Username" />
          </div>
          <TextInput
            id="name"
            type="text"
            value={values.name}
            placeholder="John Doe"
            rightIcon={MdOutlineMarkEmailUnread}
            onChange={handleChange}
            className={`${
              error?.name ? "border-[1.5px] border-red rounded-md" : ""
            } `}
            helperText={
              error?.name && (
                <>
                  <span className="font-medium text-red">{error.name}</span>
                </>
              )
            }
          />
        </div>

        <div className="w-full flex flex-col lg:md:flex-row gap-3">
          <div className="w-full">
            <div className="mb-2 block">
              <Label value="Password" />
            </div>
            <TextInput
              id="password"
              type="password"
              value={values.password}
              rightIcon={MdLockOpen}
              onChange={handleChange}
              className={`${
                error?.password ? "border-[1.5px] border-red rounded-md" : ""
              } `}
              helperText={
                error?.password && (
                  <>
                    <span className="font-medium text-red">
                      {error.password}
                    </span>
                  </>
                )
              }
            />
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label value="Password Confirmation" />
            </div>
            <TextInput
              id="password_confirmation"
              value={values.password_confirmation}
              rightIcon={MdLockOpen}
              type="password"
              onChange={handleChange}
              className={`${
                error?.password_confirmation
                  ? "border-[1.5px] border-red rounded-md"
                  : ""
              } `}
              helperText={
                error?.password_confirmation && (
                  <>
                    <span className="font-medium text-red">
                      {error.password_confirmation}
                    </span>
                  </>
                )
              }
            />
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label value="Role" />
          </div>
          <Select
            id="role"
            value={values.role}
            required
            onChange={handleChange}
            className={`${
              error?.role ? "border-[1.5px] border-red rounded-md" : ""
            } `}
            helperText={
              error?.role && (
                <>
                  <span className="font-medium text-red">{error.role}</span>
                </>
              )
            }
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="STOCK_CONTROLLER">Stock Controller</option>
            <option value="VENDOR">Vendor</option>
            <option value="USER">User</option>
          </Select>
        </div>

        <Button type="submit">
          {status === "loading" ? (
            <div>
              <Spinner /> Saving
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </div>
  );
};

export default UpdateForm;
