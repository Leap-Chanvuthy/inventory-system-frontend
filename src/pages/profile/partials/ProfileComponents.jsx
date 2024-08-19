import { Button, TextInput } from "flowbite-react";

export const UpdateProfileForm = () => {
  return (
    <div className="sm:col-span-6">
      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Update Profile</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Change your username, email, and phone number.</p>

      <form className="mt-10 space-y-8">
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Username</label>
          <div className="mt-2">
            <TextInput type="text" name="username" id="username" autoComplete="username"  placeholder="janesmith" />
          </div>
        </div>

        <div className="flex flex-col lg:md:flex-row items-center gap-3">
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Email Address</label>
              <div className="mt-2">
                <TextInput id="email" name="email" type="email" autoComplete="email"  />
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Phone Number</label>
              <div className="mt-2">
                <TextInput type="text" name="phone" id="phone" autoComplete="tel"  />
              </div>
            </div>
        </div>
        <Button>Save</Button>
      </form>
    </div>
  );
};

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
