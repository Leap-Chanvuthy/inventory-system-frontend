import { Button, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileFailure, updateUserProfileStart, updateUserProfileSuccess } from "../../../redux/slices/authSlice";
import axios from "axios";
import { BASE_URL } from "../../../components/const/constant";
import { DangerToast, SuccessToast } from "../../../components/ToastNotification";

// Update personal info
export const UpdateProfileForm = () => {
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.auth);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailure, setOpenFailure] = useState(false);

  const [values, setValues] = useState({
    name: currentUser?.user.name,
    email: currentUser?.user?.email,
    phone_number: currentUser?.user?.phone_number,
  });

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value; 
    setValues({ ...values, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfileStart());

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/update`,
        values,
        {
          headers: { Authorization: `Bearer ${currentUser.authorisation.token}` }, 
        }
      );

      console.log('Response :' , response);

      const updatedCredentials = { ...currentUser, user: response.data.data };
      dispatch(updateUserProfileSuccess(updatedCredentials));
      setOpenSuccess(true);
    } catch (err) {
      console.log(err);
      dispatch(updateUserProfileFailure(err.response?.data?.message || 'Something went wrong.'));
      setOpenFailure(true);
    }
  };

  return (
    <div className="sm:col-span-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Update Profile</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Change your username, email, and phone number.</p>
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Profile updated successfully"
      />
      <DangerToast
        open={openFailure}
        onClose={() => setOpenFailure(false)}
        message={error || "Something went wrong."}
      />

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Username</label>
          <div className="mt-2">
            <TextInput type="text" id="name" value={values.name} onChange={handleChange} />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row items-center gap-3">
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Email Address</label>
            <div className="mt-2">
              <TextInput id="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Phone Number</label>
            <div className="mt-2">
              <TextInput type="text" id="phone_number" value={values.phone_number} onChange={handleChange} autoComplete="tel" />
            </div>
          </div>
        </div>
        <Button type="submit">
          {status === 'loading' ? <Spinner /> : 'Save'}
        </Button>
      </form>
    </div>
  );
};



// update password

export const ChangePasswordForm = () => {
  return (
    <div className="sm:col-span-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Change Password</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Use this section to change your current password.</p>

      <form className="mt-10 space-y-8">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Current Password</label>
          <div className="mt-2">
            <TextInput type="password" name="current-password" id="current-password" autoComplete="current-password" />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row items-center gap-3">
            <div className="w-full">
              <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">New Password</label>
              <div className="mt-2">
                <TextInput type="password" name="new-password" id="new-password" autoComplete="new-password"  />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Confirm New Password</label>
              <div className="mt-2">
                <TextInput type="password" name="confirm-password" id="confirm-password" autoComplete="new-password"  />
              </div>
            </div>
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
};


// update contact

export const UpdateContactForm = () => {
  return (
    <div className="sm:col-span-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Contact Information</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Update your contact information.</p>

      <div className="mt-10 space-y-8">
        <div>
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Address</label>
          <div className="mt-2">
            <TextInput type="text" name="address" id="address" autoComplete="street-address" placeholder="123 Main St" />
          </div>
        </div>
      </div>
    </div>
  );
};
