// import { HiMenu } from "react-icons/hi";
// import { Avatar } from "flowbite-react";

// const Header = ({ toggleSidebar }) => {
//   return (
//     <header className="w-full h-14 p-4 flex items-center justify-between">
//       <button
//         onClick={toggleSidebar}
//         className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none md:hidden"
//       >
//         <HiMenu size={24} />
//       </button>
//       <div className="flex justify-between">
//         <h1>Hello</h1>
//         <Avatar img="/images/people/profile-picture-5.jpg" status="online" />
//       </div>
//     </header>
//   );
// };

// export default Header;

import { HiMenu } from "react-icons/hi";
import { Avatar } from "flowbite-react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="w-full h-14 p-4 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none md:hidden"
      >
        <HiMenu size={24} />
      </button>
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="">Hello</h1>
        <Avatar img="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png" rounded status="online" />
      </div>
    </header>
  );
};

export default Header;

