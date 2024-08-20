import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layouts/Layout";
import Product from "./pages/inventory/product/Product";
import Order from "./pages/order/Order";
import Test from "./components/Test";
import Login from "./pages/auth/Login";
import { useState } from "react";
import Users from "./pages/users/Users";
import Create from "./pages/users/Create";
import Profile from "./pages/profile/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users/>} />
            <Route path="/users/create" element={<Create/>} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Order />} />
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
