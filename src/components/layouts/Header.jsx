import { MdLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import { Avatar, Dropdown} from "flowbite-react";
import { useSelector , useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from '../../redux/store';
import { logout } from "../../redux/slices/authSlice";

const Header = ({ toggleSidebar }) => {

  const dispatch =  useDispatch();
  const {theme} = useSelector((state) => state.theme);
  const toggle = () =>{
    dispatch(toggleTheme());
  }

  // Logout Function 
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    navigate('/login');
  };

  return (
    <header className="w-full h-14 p-4 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none md:hidden"
      >
        <HiMenu size={24} />
      </button>
      <div className="flex w-full items-center justify-between px-4">
        <h1 className=""></h1>
        <div className="flex justify-between  gap-3 items-center">
          <div>
          {theme == 'dark' ?
            <div className="border-2 border-gray-200 p-2 rounded-md cursor-pointer" onClick={toggle}>
              <MdLightMode className="text-gray-500"/>
            </div>
            :
            <div className="border-2 border-gray-200 p-2 rounded-md cursor-pointer" onClick={toggle}>
              <MdNightlight className="text-gray-500" />
            </div>
          }
          </div>
          <Avatar img="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png" status="online" statusPosition="top-right" bordered color='success' rounded />
          <Dropdown size='sm' inline>
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
            </Dropdown.Header>
            <Link to='/profile'><Dropdown.Item>Profile</Dropdown.Item></Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;

