// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { toggleSingleSelection, toggleMultipleSelection } from "../redux/slices/selectionSlice";

// const books = [
//   { id: 1, book: "To Kill a Mockingbird", author: "Harper Lee" },
//   { id: 2, book: "1984", author: "George Orwell" },
//   { id: 3, book: "The Great Gatsby", author: "F. Scott Fitzgerald" },
//   { id: 4, book: "The Catcher in the Rye", author: "J.D. Salinger" },
// ];

// const Test = () => {
//   const dispatch = useDispatch();
//   const ids = books.map((book) => book.id);
//   console.log(ids);
//   useEffect(() =>{
//     dispatch(toggleMultipleSelection(ids));
//   },[]);

//   const {singleSelection} = useSelector((state) => state.selections);
//   const {multipleSelection} = useSelector((state) => state.selections);

//   console.log('Single selection :' , singleSelection);
//   console.log('Multiple selection :' , multipleSelection);

//   const handleSingleSelect = (id) => {
//     dispatch(toggleSingleSelection(id));
//   };

//   const handleMultipleSelect = (id) => {
//     dispatch(toggleMultipleSelection(id));
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Book Selection Test</h2>

//       {/* Single Selection */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold">Single Selection</h3>
//         <p>Selected Book ID: {singleSelection || "None"}</p>
//         <ul className="mt-2">
//           {books.map((book) => (
//             <li key={book.id} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={singleSelection === book.id}
//                 onChange={() => handleSingleSelect(book.id)}
//               />
//               <span>{book.book} by {book.author}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Multiple Selection */}
//       <div>
//         <h3 className="text-xl font-semibold">Multiple Selection</h3>
//         <p>Selected Book IDs: {multipleSelection.length ? multipleSelection.join(", ") : "None"}</p>
//         <ul className="mt-2">
//           {books.map((book) => (
//             <li key={book.id} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={multipleSelection.includes(book.id)}
//                 onChange={() => handleMultipleSelect(book.id)}
//               />
//               <span>{book.book} by {book.author}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Test;




import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSingleSelection,
  toggleMultipleSelection,
  setSingleSelection,
  setMultipleSelection,
} from "../redux/slices/selectionSlice";
import TestMaterialStaging from "./TestMaterialStaging";
import RawMaterialByCategory from "./charts/raw-meterial/RawMaterialByCategory";
import RawMaterialByStatus from "./charts/raw-meterial/RawMaterialByStatus";
import RawMaterialCount from "./charts/raw-meterial/RawMaterialCount";
import TopValuedRawMaterials from "./charts/raw-meterial/TopValuedRawMaterials";
import ProductCount from "./charts/product/ProductCount";
import ProductByCategory from "./charts/product/ProductByCategory";
import ProductByStatus from "./charts/product/ProductByStatus";
import TopValuedProducts from "./charts/product/TopValuedProducts";
import CustomerByCategory from "./charts/customer/CustomerByCategory";
import TopSpentCustomer from "./charts/customer/TopSpentCustomer";
import SupplierByStatus from "./charts/supplier/SupplierByStatus";
import SupplierByCategory from "./charts/supplier/SupplierByCategory";
import TopSupplier from "./charts/supplier/TopSupplier";

const books = [
  { id: 1, book: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, book: "1984", author: "George Orwell" },
  { id: 3, book: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 4, book: "The Catcher in the Rye", author: "J.D. Salinger" },
];

const Test = () => {
  const dispatch = useDispatch();

  const { singleSelection, multipleSelection } = useSelector((state) => state.selections);

  // Set initial values dynamically (e.g., from API or form state)
  useEffect(() => {
    // Example: Single selection starts with ID 2
    dispatch(setSingleSelection(2));
    // Example: Multiple selection starts with IDs 1 and 3
    dispatch(setMultipleSelection([1, 3]));
  }, [dispatch]);

  const handleSingleSelect = (id) => {
    dispatch(toggleSingleSelection(id));
  };

  const handleMultipleSelect = (id) => {
    dispatch(toggleMultipleSelection(id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold my-5">Book Selection Test</h2>

      {/* Single Selection */}
      <div className="my-5">
        <h3 className="text-xl font-semibold">Single Selection</h3>
        <p>Selected Book ID: {singleSelection || "None"}</p>
        <ul className="mt-2">
          {books.map((book) => (
            <li key={book.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={singleSelection === book.id}
                onChange={() => handleSingleSelect(book.id)}
              />
              <span>
                {book.book} by {book.author}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Multiple Selection */}
      <div className="my-5">
        <h3 className="text-xl font-semibold">Multiple Selection</h3>
        <p>
          Selected Book IDs: {multipleSelection.length ? multipleSelection.join(", ") : "None"}
        </p>
        <ul className="mt-2">
          {books.map((book) => (
            <li key={book.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={multipleSelection.includes(book.id)}
                onChange={() => handleMultipleSelect(book.id)}
              />
              <span>
                {book.book} by {book.author}
              </span>
            </li>
          ))}
        </ul>
      </div>

      
      <hr/>
      {/* Test Material Staging    */}

      <TestMaterialStaging />    
      {/* Test Material KPI    */}
      <RawMaterialByCategory/>
      <RawMaterialByStatus/>
      <RawMaterialCount/>
      <TopValuedRawMaterials/>


       {/* Product KPI */}
      <ProductByCategory/>
      <ProductByStatus/>
      <ProductCount/>
      <TopValuedProducts />


      {/* Customer KPI */}
      <CustomerByCategory />
      <TopSpentCustomer />


      {/* Supplier KPI */}
      <SupplierByStatus />
      <SupplierByCategory />
      <TopSupplier />

    </div>
  );
};

export default Test;
