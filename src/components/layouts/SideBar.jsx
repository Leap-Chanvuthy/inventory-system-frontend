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
import { useSelector } from "react-redux";

const SideBar = ({ isOpen, toggleSidebar }) => {
  const pathname = useLocation().pathname;
  const {currentUser} = useSelector((state) => state.auth);
  const userRole = currentUser?.user?.role;

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
            <Sidebar.Item active={pathname === "/"}  icon={GoHome}>
              <Link to='/'><span className="font-bold">Dashboard</span></Link>
            </Sidebar.Item>

            {/* Only allow Admin user */}
            {userRole == 'ADMIN' ?
            <Sidebar.Item
              active={pathname === "/users"}
              icon={FiUsers}
            >
              <Link to='/users'><span className="font-bold">Users</span></Link>
            </Sidebar.Item>
            : <></>
            }

            {/* Only allow Admin & Stock Controller user */}
            {userRole == 'ADMIN' || userRole == 'STOCK_CONTROLLER' ?
            <Sidebar.Collapse icon={MdOutlineInventory2} label="Inventory" className="font-bold">
              <Sidebar.Item active={pathname === "/products"}>
                <Link to='/products'>Products</Link>
              </Sidebar.Item>
              <Sidebar.Item active={pathname === "/raw-materials"}>
                <Link to='/raw-materials'>Raw Materials</Link>
              </Sidebar.Item>
              <Sidebar.Item >
                <Link to='/purchase-invoices'>Purchase Invoices</Link>
              </Sidebar.Item>
              <Sidebar.Item >
                <Link to='/suppliers'>Suppliers</Link>
              </Sidebar.Item>
              <Sidebar.Item >
                <Link to='/settings'>Categories</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            : <></>
            }

            {/* Only allow Admin & Vender user */}
            {userRole == 'ADMIN' || userRole == 'VENDER' ?
            <Sidebar.Collapse href="#" icon={BsCart3} label="Sale" className="font-bold">
              <Sidebar.Item active={pathname === "sale-orders"} >
                <Link to='/sale-orders'>Sale Order</Link>
              </Sidebar.Item>
              <Sidebar.Item>
                 <Link to='/sale-invoices'>Sale Invoices</Link>
              </Sidebar.Item>
              <Sidebar.Item active={pathname === "/customers"}>
                <Link to='/customers'>Customers</Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            : <></>
            }


            {userRole == 'ADMIN' || userRole == 'VENDER' ?
              <Sidebar.Collapse
              href="#"
              icon={TbBrandGoogleAnalytics}
              label="Accounting"
              className="font-bold"
            >
              <Sidebar.Item href="#">Incomes</Sidebar.Item>
              <Sidebar.Item href="#">Expenses</Sidebar.Item>
            </Sidebar.Collapse>
            : <></>
            }
            <Sidebar.Item
              active={pathname === "/reports-analytics"}
              icon={TbBrandGoogleAnalytics}
            >
              <Link to='/report-analytics'><span className="font-bold">Report Analytics</span></Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SideBar;
