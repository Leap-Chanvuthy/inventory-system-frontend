import { Button, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordFailure,
  changePasswordSuccess,
  changePasswordStart,
} from "../../../redux/slices/passwordSlice";
import axios from "axios";
import { BASE_URL } from "../../../components/const/constant";
import {
  DangerToast,
  SuccessToast,
} from "../../../components/ToastNotification";
import useToken from "../../../hooks/useToken";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const { status, error } = useSelector((state) => state.password);
  const { currentUser } = useSelector((state) => state.auth);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);

  const [values, setValues] = useState({
    current_password: "",
    new_password: "",
    password_confirmation: "",
  });

  console.log(values);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePasswordStart());
    try {
      const response = await axios.post(`${BASE_URL}/change-password`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Response:", response);
      dispatch(changePasswordSuccess(response.data));
      setOpenSuccess(true);
      setValues({
        current_password: "",
        new_password: "",
        password_confirmation: "",
      })
    } catch (error) {
      console.log(error);
      dispatch(changePasswordFailure(error?.response?.data?.errors));
      setOpenFailure(true);
    }
  };

  return (
    <div className="sm:col-span-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
        Change Password
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
        Use this section to change your current password.
      </p>

      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Password changed successfully"
      />
      <DangerToast
        open={openFailure}
        onClose={() => setOpenFailure(false)}
        message={"Something went wrong."}
      />

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
            Current Password
          </label>
          <div className="mt-2">
            <TextInput
              value={values.current_password}
              onChange={handleChange}
              id="current_password"
              className={`${
                error?.current_password
                  ? "border-[1.5px] border-red-400 rounded-md"
                  : ""
              } `}
              helperText={
                error?.current_password && (
                  <>
                    <span className="font-medium text-red-400">
                      {error.current_password}
                    </span>
                  </>
                )
              }
            />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row items-center gap-3">
          <div className="w-full">
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              New Password
            </label>
            <div className="mt-2">
              <TextInput
                value={values.new_password}
                onChange={handleChange}
                id="new_password"
                className={`${
                error?.new_password
                  ? "border-[1.5px] border-red-400 rounded-md"
                  : ""
              } `}
              helperText={
                error?.new_password && (
                  <>
                    <span className="font-medium text-red-400">
                      {error.new_password}
                    </span>
                  </>
                )
              }
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Confirm New Password
            </label>
            <div className="mt-2">
              <TextInput
                value={values.password_confirmation}
                onChange={handleChange}
                id="password_confirmation"
                className={`${
                error?.password_confirmation
                  ? "border-[1.5px] border-red-400 rounded-md"
                  : ""
              } `}
              helperText={
                error?.password_confirmation && (
                  <>
                    <span className="font-medium text-red-400">
                      {error.password_confirmation}
                    </span>
                  </>
                )
              }
              />
            </div>
          </div>
        </div>
        <Button type="submit">
          {status == "loading" ? <Spinner /> : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
