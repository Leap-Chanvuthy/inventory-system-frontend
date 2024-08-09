import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layouts/Layout";
import Product from "./pages/product/Product";
import Statistic from "./pages/statistic/Statistic";
import Order from "./pages/order/Order";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/orders" element={<Order/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
