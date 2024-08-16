import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Avatar } from "flowbite-react";
import { useState } from "react";

const Header = ({ toggleSidebar }) => {
  
  const [darkMode , setDarkMode] = useState(false);

  const toggle = () =>{
    setDarkMode(!darkMode);
  }

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
        <div className="flex justify-between  gap-3 items-center">
          <div>
          {darkMode ?
            <div className="border-2 border-gray-200 p-2 rounded-md cursor-pointer" onClick={toggle}>
              <MdLightMode className="text-gray-500"/>
            </div>
            :
            <div className="border-2 border-gray-200 p-2 rounded-md cursor-pointer" onClick={toggle}>
              <MdNightlight className="text-gray-500" />
            </div>
          }
          </div>
          <Avatar img="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png" rounded />
        </div>
      </div>
    </header>
  );
};

export default Header;

