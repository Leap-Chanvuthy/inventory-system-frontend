import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layouts/Layout";
import Product from "./pages/product/Product";
import Order from "./pages/order/Order";
import Test from "./components/Test";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/orders" element={<Order/>} />
        </Routes>
      </Layout>
      <Routes>
        <Route path="/test" element={<Test/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
