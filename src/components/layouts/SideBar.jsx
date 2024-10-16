import { Sidebar } from "flowbite-react";
import { GoHome } from "react-icons/go";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { PiSignOut } from "react-icons/pi";
import { HiMenu } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const pathname = useLocation().pathname;

  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 z-50" : "hidden"
      } md:flex md:flex-col md:w-64`}
    >
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none md:hidden"
        >
          <HiMenu size={24} />
        </button>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" active={pathname === "/"} icon={GoHome}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              active={pathname === "/users"}
              icon={FiUsers}
            >
              <Link to='/users'>Users</Link>
            </Sidebar.Item>
            <Sidebar.Collapse icon={MdOutlineInventory2} label="Inventory">
              <Sidebar.Item href="/products" active={pathname === "/products"}>
                Products
              </Sidebar.Item>
              <Sidebar.Item href="/raw-materials" active={pathname === "/raw-materials"}>
                Raw Materials
              </Sidebar.Item>
              <Sidebar.Item href="#">Purchase</Sidebar.Item>
              <Sidebar.Item >
                <Link to='/suppliers'>Suppliers</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse href="#" icon={BsCart3} label="Sale">
              <Sidebar.Item href="#">Sale Order</Sidebar.Item>
              <Sidebar.Item href="#">Invoice</Sidebar.Item>
              <Sidebar.Item href="/customer" active={pathname === "/customer"}>
                Customer
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse
              href="#"
              icon={RiMoneyPoundCircleLine}
              label="Accounting"
            >
              <Sidebar.Item href="#">Currency</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse
              href="#"
              icon={TbBrandGoogleAnalytics}
              label="Report Analytics"
            >
              <Sidebar.Item href="#">Sale Order</Sidebar.Item>
              <Sidebar.Item href="#">Invoice</Sidebar.Item>
              <Sidebar.Item href="#">Customer</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item href="#" icon={PiSignOut}>
              <span className="text-red font-medium">Sign Out</span>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideBar;
