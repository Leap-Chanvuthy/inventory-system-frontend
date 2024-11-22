// import { Routes, Route, BrowserRouter } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";
// import Layout from "./components/layouts/Layout";
// import Product from "./pages/inventory/product/Product";
// import Order from "./pages/order/Order";
// import Test from "./components/Test";
// import Login from "./pages/auth/Login";
// import Users from "./pages/users/Users";
// import CreateUser from "./pages/users/Create";
// import UpdateUser from "./pages/users/Update";
// import Profile from "./pages/profile/Profile";
// import Customer from "./pages/sale/customer/Customer";
// import CreateProduct from "./pages/inventory/product/Create";
// import CreateCustomer from "./pages/sale/customer/Create";
// import RawMaterial from "./pages/inventory/raw-material/RawMaterial";
// import CreateRawMaterial from "./pages/inventory/raw-material/Create";
// import UpdateRawMaterial from "./pages/inventory/raw-material/Update";
// import Supplier from "./pages/inventory/supplier/Supplier";
// import CreateSupplier from "./pages/inventory/supplier/Create";
// import UpdateSupplier from "./pages/inventory/supplier/Update";
// import AdminRoute from "./components/privilege/AdminRoute";


// import { useSelector } from "react-redux";
// import UnauthicatedRoute from "./components/privilege/UnauthenticatedRoute";
// import RecoverRawMaterial from "./pages/inventory/raw-material/RecoverRawMaterial";

// function App() {
//   const {currentUser} = useSelector((state) => state.auth);
//   console.log(currentUser)
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<AdminRoute/>}>
//           <Route path="/" element={<Layout><Dashboard /></Layout>} />
//           <Route path="/profile" element={<Layout><Profile /></Layout>} />
//           <Route path="/users" element={<Layout><Users /></Layout>} />
//           <Route path="/users/create" element={<Layout><CreateUser /></Layout>} />
//           <Route path="/users/update/:id" element={<Layout><UpdateUser /></Layout>} />
//           <Route path="/products" element={<Layout><Product /></Layout>} />
//           <Route path="/products/create" element={<Layout><CreateProduct /></Layout>} />
//           <Route path="/raw-materials" element={<Layout><RawMaterial /></Layout>} />
//           <Route path="/raw-materials/recover" element={<Layout><RecoverRawMaterial /></Layout>} />
//           <Route path="/raw-materials/create" element={<Layout><CreateRawMaterial /></Layout>} />
//           <Route path="/raw-material/update/:id" element={<Layout><UpdateRawMaterial/></Layout>} />
//           <Route path="/suppliers" element={<Layout><Supplier /></Layout>} />
//           <Route path="/suppliers/create" element={<Layout><CreateSupplier /></Layout>} />
//           <Route path="/supplier/update/:id" element={<Layout><UpdateSupplier /></Layout>} />
//           <Route path="/orders" element={<Layout><Order /></Layout>} />
//           <Route path="/customer" element={<Layout><Customer /></Layout>} />
//           <Route path="/customer/create" element={<Layout><CreateCustomer /></Layout>} />
//         </Route>

//         {/* Unauthenticated Routes */}
//         <Route element={<UnauthicatedRoute />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/test" element={<Test />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./components/layouts/Layout";
import Product from "./pages/inventory/product/Product";
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
import UpdateRawMaterial from "./pages/inventory/raw-material/Update";
import Supplier from "./pages/inventory/supplier/Supplier";
import CreateSupplier from "./pages/inventory/supplier/Create";
import UpdateSupplier from "./pages/inventory/supplier/Update";
import RecoverRawMaterial from "./pages/inventory/raw-material/RecoverRawMaterial";
import ProtectedRoute from "./components/privilege/ProtectedRoute";
import UnauthenticatedRoute from "./components/privilege/UnauthenticatedRoute";
import PublicRoute from "./components/privilege/PublicRoute";
import PurchaseInvoice from "./pages/inventory/purchase-invoice/PurchaseInvoice";
import CreatePurchaseInvoice from "./pages/inventory/purchase-invoice/Create";
import UpdatePurchaseInvoice from "./pages/inventory/purchase-invoice/Update";
import RecoverPurchaseInvoice from "./pages/inventory/purchase-invoice/RecoverPurchaseInvoice";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./components/NotFound";

function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Public route that every roles can access */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Route>

        {/* Admin and Vendor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['VENDOR']} />}>
          <Route path="/products" element={<Layout><Product /></Layout>} />
          <Route path="/products/create" element={<Layout><CreateProduct /></Layout>} />

        </Route>

        {/* Admin and Stock Controller Routes */}
        <Route element={<ProtectedRoute allowedRoles={['STOCK_CONTROLLER']} />}>
          <Route path="/raw-materials" element={<Layout><RawMaterial /></Layout>} />
          <Route path="/raw-materials/recover" element={<Layout><RecoverRawMaterial /></Layout>} />
          <Route path="/raw-materials/create" element={<Layout><CreateRawMaterial /></Layout>} />
          <Route path="/raw-material/update/:id" element={<Layout><UpdateRawMaterial/></Layout>} />
          <Route path="/suppliers" element={<Layout><Supplier /></Layout>} />
          <Route path="/suppliers/create" element={<Layout><CreateSupplier /></Layout>} />
          <Route path="/supplier/update/:id" element={<Layout><UpdateSupplier /></Layout>} />
          <Route path="/purchase-invoice" element={<Layout><PurchaseInvoice /></Layout>} />
          <Route path="/purchase-invoices/recover" element={<Layout><RecoverPurchaseInvoice /></Layout>} />
          <Route path="/purchase-invoice/create" element={<Layout><CreatePurchaseInvoice /></Layout>} />
          <Route path="/purchase-invoice/update/:id" element={<Layout><UpdatePurchaseInvoice /></Layout>} />

        </Route>

        {/* Admin Only Routes */}
        {/* element={<ProtectedRoute allowedRoles={['ADMIN']} />} */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />} >
          <Route path="/users" element={<Layout><Users /></Layout>} />
          <Route path="/users/create" element={<Layout><CreateUser /></Layout>} />
          <Route path="/users/update/:id" element={<Layout><UpdateUser /></Layout>} />
    
        </Route>

        {/* Unauthenticated Routes */}
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
        </Route>

        {/* Public Route That not Required Login */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
