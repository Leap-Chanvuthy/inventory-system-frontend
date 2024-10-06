import ChangePassword from "./partials/ChangePassword";
import UpdateProfile from "./partials/UpdateProfile";

const Profile = () => {
  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Profile</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Update your profile details below.</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <UpdateProfile />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Profile;
