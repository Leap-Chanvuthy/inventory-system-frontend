import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layouts/Layout";
import Product from "./pages/inventory/product/Product";
import Order from "./pages/order/Order";
import Test from "./components/Test";
import Login from "./pages/auth/Login";
import { useState } from "react";
import Users from "./pages/users/Users";
import CreateUser from "./pages/users/Create";
import UpdateUser from "./pages/users/Update";
import Profile from "./pages/profile/Profile";
import Customer from "./pages/sale/customer/Customer";
import CreateProduct from "./pages/inventory/product/Create";
import CreateCustomer from "./pages/sale/customer/Create";
import RawMaterial from "./pages/inventory/raw-material/RawMaterial";
import CreateRawMaterial from "./pages/inventory/raw-material/Create";
import Supplier from "./pages/inventory/supplier/Supplier";
import CreateSupplier from "./pages/inventory/supplier/Create";
import UpdateSupplier from "./pages/inventory/supplier/Update";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/update/:id" element={<UpdateUser/>} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/raw-materials" element={<RawMaterial/>} />
            <Route path="/raw-materials/create" element={<CreateRawMaterial/>} />
            <Route path="/suppliers"  element={<Supplier />} />
            <Route path="/suppliers/create" element={<CreateSupplier/>}/>
            <Route path="/supplier/update/:id" element={<UpdateSupplier />}/>
            <Route path="/orders" element={<Order />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/customer/create" element={<CreateCustomer />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
