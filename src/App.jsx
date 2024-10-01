// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Layout from "./components/layouts/Layout";
// import Product from "./pages/inventory/product/Product";
// import Order from "./pages/order/Order";
// import Test from "./components/Test";
// import Login from "./pages/auth/Login";
// import { useState } from "react";
// import Users from "./pages/users/Users";
// import CreateUser from "./pages/users/Create";
// import UpdateUser from "./pages/users/Update";
// import Profile from "./pages/profile/Profile";
// import Customer from "./pages/sale/customer/Customer";
// import CreateProduct from "./pages/inventory/product/Create";
// import CreateCustomer from "./pages/sale/customer/Create";
// import RawMaterial from "./pages/inventory/raw-material/RawMaterial";
// import CreateRawMaterial from "./pages/inventory/raw-material/Create";
// import Supplier from "./pages/inventory/supplier/Supplier";
// import CreateSupplier from "./pages/inventory/supplier/Create";
// import UpdateSupplier from "./pages/inventory/supplier/Update";

// function App() {

//   return (
//     <BrowserRouter>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/users/create" element={<CreateUser />} />
//             <Route path="/users/update/:id" element={<UpdateUser/>} />
//             <Route path="/products" element={<Product />} />
//             <Route path="/products/create" element={<CreateProduct />} />
//             <Route path="/raw-materials" element={<RawMaterial/>} />
//             <Route path="/raw-materials/create" element={<CreateRawMaterial/>} />
//             <Route path="/suppliers"  element={<Supplier />} />
//             <Route path="/suppliers/create" element={<CreateSupplier/>}/>
//             <Route path="/supplier/update/:id" element={<UpdateSupplier />}/>
//             <Route path="/orders" element={<Order />} />
//             <Route path="/customer" element={<Customer />} />
//             <Route path="/customer/create" element={<CreateCustomer />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/test" element={<Test />} />
//           </Routes>
//         </Layout>
//     </BrowserRouter>
//   );
// }

// export default App;


import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layouts/Layout";
import Product from "./pages/inventory/product/Product";
import Order from "./pages/order/Order";
import Test from "./components/Test";
import Login from "./pages/auth/Login";
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
import AdminRoute from "./components/privilege/AdminRoute";


import { useSelector } from "react-redux";
import UnauthicatedRoute from "./components/privilege/UnauthenticatedRoute";

function App() {
  const {currentUser} = useSelector((state) => state.auth);
  console.log(currentUser)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminRoute/>}>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/users/create" element={<Layout><CreateUser /></Layout>} />
          <Route path="/users/update/:id" element={<Layout><UpdateUser /></Layout>} />
          <Route path="/products" element={<Layout><Product /></Layout>} />
          <Route path="/products/create" element={<Layout><CreateProduct /></Layout>} />
          <Route path="/raw-materials" element={<Layout><RawMaterial /></Layout>} />
          <Route path="/raw-materials/create" element={<Layout><CreateRawMaterial /></Layout>} />
          <Route path="/suppliers" element={<Layout><Supplier /></Layout>} />
          <Route path="/suppliers/create" element={<Layout><CreateSupplier /></Layout>} />
          <Route path="/supplier/update/:id" element={<Layout><UpdateSupplier /></Layout>} />
          <Route path="/orders" element={<Layout><Order /></Layout>} />
          <Route path="/customer" element={<Layout><Customer /></Layout>} />
          <Route path="/customer/create" element={<Layout><CreateCustomer /></Layout>} />
        </Route>

        {/* Unauthenticated Routes */}
        <Route element={<UnauthicatedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
