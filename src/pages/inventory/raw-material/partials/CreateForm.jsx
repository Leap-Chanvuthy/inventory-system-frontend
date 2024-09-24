// import { Button, FileInput, Label, TextInput , Select, Dropdown, List, Avatar } from "flowbite-react";
// import { useState, useEffect } from "react";
// import { SuccessToast } from "../../../../components/ToastNotification";
// import { MdCancel } from "react-icons/md";
// import axios from "axios";
// import { BASE_URL } from "../../../../components/const/constant";
// import { addRawMaterialStart, addRawMaterialSuccess, addRawMaterialFailure } from "../../../../redux/slices/rawMaterialSlice";
// import { getSuppliersStart , getSupplierSuccess , getSuppliersFailed } from "../../../../redux/slices/supplierSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Spinner } from "flowbite-react";
// import { IoSearchOutline } from "react-icons/io5";

// const CreateForm = () => {
//   const [values, setValues] = useState({
//     raw_materials: [
//       {
//         product_images: [],
//         name: "",
//         quantity: "",
//         unit_price: "",
//         total_value: "",
//         minimum_stock_level: "",
//         unit: "",
//         package_size: "",
//         supplier_id: "",
//       },
//     ],
//     payment_method: "",
//     status: "",
//     discount_percentage: 0,
//     tax_percentage: 0,
//     clearing_payable: 0,
//     indebted: 0,
//   });

//   console.log(values);
//   const [openSuccess, setOpenSuccess] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0); 

//   const handleChange = (index, e) => {
//     const { id, value } = e.target;
//     if (index === null) {
//       setValues((prevValues) => ({ ...prevValues, [id]: value }));
//     } else {
//       const updatedMaterials = [...values.raw_materials];
//       updatedMaterials[index][id] = value;
//       setValues({ ...values, raw_materials: updatedMaterials });
//     }
//   };

//   const handleFileChange = (index, e) => {
//     const files = Array.from(e.target.files);
//     const validImages = files.filter((file) => file.type.startsWith("image/"));

//     if (validImages.length) {
//       const newImagePreviews = validImages.map((file) =>
//         URL.createObjectURL(file)
//       );

//       const updatedMaterials = [...values.raw_materials];
//       updatedMaterials[index].product_images = [
//         ...updatedMaterials[index].product_images,
//         ...validImages,
//       ];
//       setValues({ ...values, raw_materials: updatedMaterials });
//     } else {
//       alert("Please upload valid image files.");
//     }
//   };

//   const handleAddProduct = () => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       raw_materials: [
//         ...prevValues.raw_materials,
//         {
//           product_images: [],
//           name: "",
//           quantity: "",
//           unit_price: "",
//           total_value: "",
//           minimum_stock_level: "",
//           unit: "",
//           package_size: "",
//           supplier_id: "",
//         },
//       ],
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedMaterials = [...values.raw_materials];
//     updatedMaterials.splice(index, 1);
//     setValues({ ...values, raw_materials: updatedMaterials });
//   };

//   const handleRemoveImage = (productIndex, imageIndex) => {
//     const updatedMaterials = [...values.raw_materials];
//     updatedMaterials[productIndex].product_images.splice(imageIndex, 1);
//     setValues({ ...values, raw_materials: updatedMaterials });
//   };

//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.rawMaterials);

//   const calculateTotalAmount = () => {
//     const rawMaterialTotal = values.raw_materials.reduce(
//       (acc, material) => acc + Number(material.total_value || 0),
//       0
//     );

//     const discountAmount = (rawMaterialTotal * Number(values.discount_percentage)) / 100;
//     const taxAmount = ((rawMaterialTotal - discountAmount) * Number(values.tax_percentage)) / 100;

//     const finalTotal = rawMaterialTotal - discountAmount + taxAmount;
//     setTotalAmount(finalTotal);
//   };

//   useEffect(() => {
//     calculateTotalAmount();
//   }, [values.raw_materials, values.discount_percentage, values.tax_percentage]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(addRawMaterialStart());
//     try {
//       const response = await axios.post(`${BASE_URL}/raw-materials`, values , {
//         headers : {"Content-Type" : 'multipart/form-data'}
//       });
//       console.log(response);
//       dispatch(addRawMaterialSuccess(response.data));
//       setOpenSuccess(true);
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       dispatch(addRawMaterialFailure(error));
//     }
//   };



//   // fetch suppliers
//   const {suppliers , loading} = useSelector((state) => state.suppliers);
//   const [filter , setFilter] = useState({
//     search : ""
//   });
//   console.log('Suppliers Values :' ,suppliers.data)
//   useEffect(() => {
//     const getSuppliers = async () => {
//       dispatch(getSuppliersStart());
//       try {
//         const response = await axios.get(`${BASE_URL}/suppliers`, {
//           params: {
//             "filter[search]": values.supplier_id
//           }
//         });
//         console.log('API Response' , response.data);
//         dispatch(getSupplierSuccess(response.data));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getSuppliers();
//   }, [ dispatch]);
  



//   return (
//     <div className="my-5">
//       <SuccessToast
//         open={openSuccess}
//         onClose={() => setOpenSuccess(false)}
//         message="Products Created Successfully"
//       />
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="payment_method" value="Payment Method" />
//             <Select
//               id="payment_method"
//               required
//               value={values.payment_method}
//               onChange={(e) => handleChange(null, e)}
//             >
//               <option value="">Select a payment method</option>
//               <option value="credit_card">Credit Card</option>
//               <option value="paypal">PayPal</option>
//               <option value="bank_transfer">Bank Transfer</option>
//               <option value="cash">Cash</option>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="status" value="Status" />
//             <TextInput
//               id="status"
//               placeholder="Enter status"
//               required
//               value={values.status}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="discount_percentage" value="Discount Percentage" />
//             <TextInput
//               id="discount_percentage"
//               type="number"
//               placeholder="Enter discount percentage"
//               required
//               value={values.discount_percentage}
//               onChange={(e) => handleChange(null, e)}
//               min="0"
//               max="100"
//             />
//           </div>

//           <div>
//             <Label htmlFor="tax_percentage" value="Tax Percentage" />
//             <TextInput
//               id="tax_percentage"
//               type="number"
//               placeholder="Enter tax percentage"
//               required
//               value={values.tax_percentage}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="clearing_payable" value="Clearing Payable" />
//             <TextInput
//               id="clearing_payable"
//               type="number"
//               placeholder="Enter clearing payable amount"
//               required
//               value={values.clearing_payable}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="indebted" value="Indebted" />
//             <TextInput
//               id="indebted"
//               type="number"
//               placeholder="Enter indebted amount"
//               required
//               value={values.indebted}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="totalAmount" value="Total Amount" />
//           <TextInput
//             id="totalAmount"
//             type="number"
//             value={totalAmount.toFixed(2)}
//             readOnly
//             disabled
//           />
//         </div>

//         {values.raw_materials.map((material, index) => (
//           <div
//             key={index}
//             className="border border-dashed border-slate-600 p-4 rounded-md mb-4"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold">
//                 Raw Material {index + 1}
//               </h3>
//               {values.raw_materials.length > 1 && (
//                 <button
//                   type="button"
//                   className="text-red-500"
//                   onClick={() => handleRemoveProduct(index)}
//                 >
//                   <MdCancel className="text-red text-xl" />
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name" value="Material Name" />
//                 <TextInput
//                   id="name"
//                   placeholder="Enter material name"
//                   required
//                   value={material.name}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="quantity" value="Quantity" />
//                 <TextInput
//                   id="quantity"
//                   type="number"
//                   placeholder="Enter quantity"
//                   required
//                   value={material.quantity}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="unit_price" value="Unit Price" />
//                 <TextInput
//                   id="unit_price"
//                   type="text"
//                   placeholder="Enter unit price"
//                   required
//                   value={material.unit_price}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="total_value" value="Total Value" />
//                 <TextInput
//                   id="total_value"
//                   type="text"
//                   placeholder="Enter total value"
//                   required
//                   value={material.total_value}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="minimum_stock_level"
//                   value="Minimum Stock Level"
//                 />
//                 <TextInput
//                   id="minimum_stock_level"
//                   type="text"
//                   placeholder="Enter minimum stock level"
//                   required
//                   value={material.minimum_stock_level}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="unit" value="Unit" />
//                 <TextInput
//                   id="unit"
//                   type="text"
//                   placeholder="Enter unit"
//                   required
//                   value={material.unit}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="package_size" value="Package Size" />
//                 <TextInput
//                   id="package_size"
//                   type="text"
//                   placeholder="Enter package size"
//                   required
//                   value={material.package_size}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="supplier_id" value="Supplier" />
//                 <TextInput
//                   id="supplier_id"
//                   type="text"
//                   placeholder="Select supplier"
//                   required
//                   value={material.supplier_id}
//                   onChange={(e) => handleChange(index, e)}
//                   rightIcon={IoSearchOutline}
//                 />
//                 <div>
//                   {loading ? (
//                     <p>Loading suppliers...</p>
//                   ) : (
//                     <List unstyled className=" divide-y my-5 px-3 h-[10rem] overflow-y-scroll divide-gray-200 dark:divide-gray-700">
//                       {suppliers?.data && suppliers.data.map((supplier) => (
//                         <List.Item key={supplier.id} className="pb-3 sm:pb-4">
//                           <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                             <Avatar img="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png" alt="Neil image" rounded size="sm" />
//                             <div className="min-w-0 flex-1">
//                               <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{supplier.contact_person}</p>
//                               <p className="truncate text-sm text-gray-500 dark:text-gray-400">{supplier.email}</p>
//                             </div>
//                             <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
//                           </div>
//                         </List.Item>
//                       ))}
//                     </List>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-center mt-4 mb-4">
//               <Label
//                 htmlFor={`image_${index}`}
//                 className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-4 w-full"
//               >
//                 <div className="flex flex-col items-center justify-center">
//                   <svg
//                     className="h-8 w-8 text-gray-500 mb-2"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                   <span>Upload Image</span>
//                 </div>
//                 <FileInput
//                   id={`image_${index}`}
//                   className="hidden"
//                   onChange={(e) => handleFileChange(index, e)}
//                 />
//               </Label>
//             </div>

//             <div className="grid grid-cols-4 gap-4">
//               {material.product_images.map((file, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`Preview ${imgIndex}`}
//                     className="w-full h-[8rem] object-cover rounded-md border-2 border-slate-800 dark:bg-slate-300"
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-1 right-1 bg-red-600 h-8 w-8 rounded-full bg-slate-800 text-white p-1"
//                     onClick={() => handleRemoveImage(index, imgIndex)}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-between">
//           <Button type="button" onClick={handleAddProduct}>
//             Add Raw Material
//           </Button>

//           <Button type="submit" disabled={status === "loading"}>
//             {status === "loading" ? <Spinner size="sm" /> : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateForm;



// ---------- Work 1 ---------------------- //

// import { Button, FileInput, Label, TextInput , Select, Dropdown, List, Avatar } from "flowbite-react";
// import { useState, useEffect } from "react";
// import { SuccessToast } from "../../../../components/ToastNotification";
// import { MdCancel } from "react-icons/md";
// import axios from "axios";
// import { BASE_URL } from "../../../../components/const/constant";
// import { addRawMaterialStart, addRawMaterialSuccess, addRawMaterialFailure } from "../../../../redux/slices/rawMaterialSlice";
// import { getSuppliersStart , getSupplierSuccess , getSuppliersFailed } from "../../../../redux/slices/supplierSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { Spinner } from "flowbite-react";
// import { IoSearchOutline } from "react-icons/io5";

// const CreateForm = () => {
//   const [values, setValues] = useState({
//     raw_materials: [
//       {
//         product_images: [],
//         name: "",
//         quantity: "",
//         unit_price: "",
//         total_value: "",
//         minimum_stock_level: "",
//         unit: "",
//         package_size: "",
//         supplier_id: "",
//       },
//     ],
//     payment_method: "",
//     status: "",
//     discount_percentage: 0,
//     tax_percentage: 0,
//     clearing_payable: 0,
//     indebted: 0,
//   });

//   console.log(values);
//   const [openSuccess, setOpenSuccess] = useState(false);
//   const [totalAmount, setTotalAmount] = useState(0); 

//   const handleChange = (index, e) => {
//     const { id, value } = e.target;
//     if (id === "supplier_id") {
//       setFilter((prev) => ({ ...prev, search: value }));
//     }
//     if (index === null) {
//       setValues((prevValues) => ({ ...prevValues, [id]: value }));
//     } else {
//       const updatedMaterials = [...values.raw_materials];
//       updatedMaterials[index][id] = value;
//       setValues({ ...values, raw_materials: updatedMaterials });
//     }
//   };

//   const handleFileChange = (index, e) => {
//     const files = Array.from(e.target.files);
//     const validImages = files.filter((file) => file.type.startsWith("image/"));

//     if (validImages.length) {
//       const newImagePreviews = validImages.map((file) =>
//         URL.createObjectURL(file)
//       );

//       const updatedMaterials = [...values.raw_materials];
//       updatedMaterials[index].product_images = [
//         ...updatedMaterials[index].product_images,
//         ...validImages,
//       ];
//       setValues({ ...values, raw_materials: updatedMaterials });
//     } else {
//       alert("Please upload valid image files.");
//     }
//   };

//   const handleAddProduct = () => {
//     setValues((prevValues) => ({
//       ...prevValues,
//       raw_materials: [
//         ...prevValues.raw_materials,
//         {
//           product_images: [],
//           name: "",
//           quantity: "",
//           unit_price: "",
//           total_value: "",
//           minimum_stock_level: "",
//           unit: "",
//           package_size: "",
//           supplier_id: "",
//         },
//       ],
//     }));
//   };

//   const handleRemoveProduct = (index) => {
//     const updatedMaterials = [...values.raw_materials];
//     updatedMaterials.splice(index, 1);
//     setValues({ ...values, raw_materials: updatedMaterials });
//   };

//   const handleRemoveImage = (productIndex, imageIndex) => {
//     const updatedMaterials = [...values.raw_materials];
//     updatedMaterials[productIndex].product_images.splice(imageIndex, 1);
//     setValues({ ...values, raw_materials: updatedMaterials });
//   };

//   const dispatch = useDispatch();
//   const { status, error } = useSelector((state) => state.rawMaterials);

//   const calculateTotalAmount = () => {
//     const rawMaterialTotal = values.raw_materials.reduce(
//       (acc, material) => acc + Number(material.total_value || 0),
//       0
//     );

//     const discountAmount = (rawMaterialTotal * Number(values.discount_percentage)) / 100;
//     const taxAmount = ((rawMaterialTotal - discountAmount) * Number(values.tax_percentage)) / 100;

//     const finalTotal = rawMaterialTotal - discountAmount + taxAmount;
//     setTotalAmount(finalTotal);
//   };

//   useEffect(() => {
//     calculateTotalAmount();
//   }, [values.raw_materials, values.discount_percentage, values.tax_percentage]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     dispatch(addRawMaterialStart());
//     try {
//       const response = await axios.post(`${BASE_URL}/raw-materials`, values , {
//         headers : {"Content-Type" : 'multipart/form-data'}
//       });
//       console.log(response);
//       dispatch(addRawMaterialSuccess(response.data));
//       setOpenSuccess(true);
//     } catch (error) {
//       console.error("Error submitting the form:", error);
//       dispatch(addRawMaterialFailure(error));
//     }
//   };



//   // fetch suppliers
//   const {suppliers , loading} = useSelector((state) => state.suppliers);
//   const [filter, setFilter] = useState({ search: "" });

//   console.log('Suppliers Values :' ,suppliers.data)
//   useEffect(() => {
//     const getSuppliers = async () => {
//       if (filter.search) { 
//         dispatch(getSuppliersStart());
//         try {
//           const response = await axios.get(`${BASE_URL}/suppliers`, {
//             params: {
//               "filter[search]": filter.search
//             }
//           });
//           dispatch(getSupplierSuccess(response.data));
//         } catch (err) {
//           console.log(err);
//           dispatch(getSuppliersFailed(err));
//         }
//       }
//     };
//     getSuppliers();
//   }, [filter.search, dispatch]);
  
  



//   return (
//     <div className="my-5">
//       <SuccessToast
//         open={openSuccess}
//         onClose={() => setOpenSuccess(false)}
//         message="Products Created Successfully"
//       />
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="payment_method" value="Payment Method" />
//             <Select
//               id="payment_method"
//               required
//               value={values.payment_method}
//               onChange={(e) => handleChange(null, e)}
//             >
//               <option value="">Select a payment method</option>
//               <option value="credit_card">Credit Card</option>
//               <option value="paypal">PayPal</option>
//               <option value="bank_transfer">Bank Transfer</option>
//               <option value="cash">Cash</option>
//             </Select>
//           </div>

//           <div>
//             <Label htmlFor="status" value="Status" />
//             <TextInput
//               id="status"
//               placeholder="Enter status"
//               required
//               value={values.status}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="discount_percentage" value="Discount Percentage" />
//             <TextInput
//               id="discount_percentage"
//               type="number"
//               placeholder="Enter discount percentage"
//               required
//               value={values.discount_percentage}
//               onChange={(e) => handleChange(null, e)}
//               min="0"
//               max="100"
//             />
//           </div>

//           <div>
//             <Label htmlFor="tax_percentage" value="Tax Percentage" />
//             <TextInput
//               id="tax_percentage"
//               type="number"
//               placeholder="Enter tax percentage"
//               required
//               value={values.tax_percentage}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="clearing_payable" value="Clearing Payable" />
//             <TextInput
//               id="clearing_payable"
//               type="number"
//               placeholder="Enter clearing payable amount"
//               required
//               value={values.clearing_payable}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="indebted" value="Indebted" />
//             <TextInput
//               id="indebted"
//               type="number"
//               placeholder="Enter indebted amount"
//               required
//               value={values.indebted}
//               onChange={(e) => handleChange(null, e)}
//             />
//           </div>
//         </div>

//         <div>
//           <Label htmlFor="totalAmount" value="Total Amount" />
//           <TextInput
//             id="totalAmount"
//             type="number"
//             value={totalAmount.toFixed(2)}
//             readOnly
//             disabled
//           />
//         </div>

//         {values.raw_materials.map((material, index) => (
//           <div
//             key={index}
//             className="border border-dashed border-slate-600 p-4 rounded-md mb-4"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold">
//                 Raw Material {index + 1}
//               </h3>
//               {values.raw_materials.length > 1 && (
//                 <button
//                   type="button"
//                   className="text-red-500"
//                   onClick={() => handleRemoveProduct(index)}
//                 >
//                   <MdCancel className="text-red text-xl" />
//                 </button>
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name" value="Material Name" />
//                 <TextInput
//                   id="name"
//                   placeholder="Enter material name"
//                   required
//                   value={material.name}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="quantity" value="Quantity" />
//                 <TextInput
//                   id="quantity"
//                   type="number"
//                   placeholder="Enter quantity"
//                   required
//                   value={material.quantity}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="unit_price" value="Unit Price" />
//                 <TextInput
//                   id="unit_price"
//                   type="text"
//                   placeholder="Enter unit price"
//                   required
//                   value={material.unit_price}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="total_value" value="Total Value" />
//                 <TextInput
//                   id="total_value"
//                   type="text"
//                   placeholder="Enter total value"
//                   required
//                   value={material.total_value}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label
//                   htmlFor="minimum_stock_level"
//                   value="Minimum Stock Level"
//                 />
//                 <TextInput
//                   id="minimum_stock_level"
//                   type="text"
//                   placeholder="Enter minimum stock level"
//                   required
//                   value={material.minimum_stock_level}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="unit" value="Unit" />
//                 <TextInput
//                   id="unit"
//                   type="text"
//                   placeholder="Enter unit"
//                   required
//                   value={material.unit}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="package_size" value="Package Size" />
//                 <TextInput
//                   id="package_size"
//                   type="text"
//                   placeholder="Enter package size"
//                   required
//                   value={material.package_size}
//                   onChange={(e) => handleChange(index, e)}
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="supplier_id" value="Supplier" />
//                 <TextInput
//                   id="supplier_id"
//                   type="text"
//                   placeholder="Select supplier"
//                   required
//                   value={material.supplier_id}
//                   onChange={(e) => handleChange(index, e)}
//                   rightIcon={IoSearchOutline}
//                 />
//                 <div>
//                   {loading ? (
//                     <p>Loading suppliers...</p>
//                   ) : (
//                     <List unstyled className=" divide-y my-5 px-3 h-[10rem] overflow-y-scroll divide-gray-200 dark:divide-gray-700">
//                       {suppliers?.data && suppliers.data.map((supplier) => (
//                         <List.Item key={supplier.id} className="pb-3 sm:pb-4">
//                           <div className="flex items-center space-x-4 rtl:space-x-reverse">
//                             <Avatar img="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png" alt="Neil image" rounded size="sm" />
//                             <div className="min-w-0 flex-1">
//                               <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{supplier.contact_person}</p>
//                               <p className="truncate text-sm text-gray-500 dark:text-gray-400">{supplier.email}</p>
//                             </div>
//                             <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
//                           </div>
//                         </List.Item>
//                       ))}
//                     </List>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-center mt-4 mb-4">
//               <Label
//                 htmlFor={`image_${index}`}
//                 className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-4 w-full"
//               >
//                 <div className="flex flex-col items-center justify-center">
//                   <svg
//                     className="h-8 w-8 text-gray-500 mb-2"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                   <span>Upload Image</span>
//                 </div>
//                 <FileInput
//                   id={`image_${index}`}
//                   className="hidden"
//                   onChange={(e) => handleFileChange(index, e)}
//                 />
//               </Label>
//             </div>

//             <div className="grid grid-cols-4 gap-4">
//               {material.product_images.map((file, imgIndex) => (
//                 <div key={imgIndex} className="relative">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`Preview ${imgIndex}`}
//                     className="w-full h-[8rem] object-cover rounded-md border-2 border-slate-800 dark:bg-slate-300"
//                   />
//                   <button
//                     type="button"
//                     className="absolute top-1 right-1 bg-red-600 h-8 w-8 rounded-full bg-slate-800 text-white p-1"
//                     onClick={() => handleRemoveImage(index, imgIndex)}
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//         <div className="flex justify-between">
//           <Button type="button" onClick={handleAddProduct}>
//             Add Raw Material
//           </Button>

//           <Button type="submit" disabled={status === "loading"}>
//             {status === "loading" ? <Spinner size="sm" /> : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateForm;




// ------------- work 2 ---------- //




import { Button, FileInput, Label, TextInput , Select, Dropdown, List, Avatar } from "flowbite-react";
import { useState, useEffect } from "react";
import { SuccessToast } from "../../../../components/ToastNotification";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import { addRawMaterialStart, addRawMaterialSuccess, addRawMaterialFailure } from "../../../../redux/slices/rawMaterialSlice";
import { getSuppliersStart , getSupplierSuccess , getSuppliersFailed } from "../../../../redux/slices/supplierSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";

const CreateForm = () => {
  const [values, setValues] = useState({
    raw_materials: [
      {
        product_images: [],
        name: "",
        quantity: "",
        unit_price: "",
        total_value: "",
        minimum_stock_level: "",
        unit: "",
        package_size: "",
        supplier_id: "",
      },
    ],
    payment_method: "",
    status: "",
    discount_percentage: 0,
    tax_percentage: 0,
    clearing_payable: 0,
    indebted: 0,
  });

  console.log(values);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0); 

  const handleChange = (index, e) => {
    const { id, value } = e.target;
    if (id === "supplier_id") {
      setFilter((prev) => ({ ...prev, search: value }));
    }
    if (index === null) {
      setValues((prevValues) => ({ ...prevValues, [id]: value }));
    } else {
      const updatedMaterials = [...values.raw_materials];
      updatedMaterials[index][id] = value;
      setValues({ ...values, raw_materials: updatedMaterials });
    }
  };

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));

    if (validImages.length) {
      const newImagePreviews = validImages.map((file) =>
        URL.createObjectURL(file)
      );

      const updatedMaterials = [...values.raw_materials];
      updatedMaterials[index].product_images = [
        ...updatedMaterials[index].product_images,
        ...validImages,
      ];
      setValues({ ...values, raw_materials: updatedMaterials });
    } else {
      alert("Please upload valid image files.");
    }
  };

  const handleAddProduct = () => {
    setValues((prevValues) => ({
      ...prevValues,
      raw_materials: [
        ...prevValues.raw_materials,
        {
          product_images: [],
          name: "",
          quantity: "",
          unit_price: "",
          total_value: "",
          minimum_stock_level: "",
          unit: "",
          package_size: "",
          supplier_id: "",
        },
      ],
    }));
  };

  const handleRemoveProduct = (index) => {
    const updatedMaterials = [...values.raw_materials];
    updatedMaterials.splice(index, 1);
    setValues({ ...values, raw_materials: updatedMaterials });
  };

  const handleRemoveImage = (productIndex, imageIndex) => {
    const updatedMaterials = [...values.raw_materials];
    updatedMaterials[productIndex].product_images.splice(imageIndex, 1);
    setValues({ ...values, raw_materials: updatedMaterials });
  };

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.rawMaterials);

  const calculateTotalAmount = () => {
    const rawMaterialTotal = values.raw_materials.reduce(
      (acc, material) => acc + Number(material.total_value || 0),
      0
    );

    const discountAmount = (rawMaterialTotal * Number(values.discount_percentage)) / 100;
    const taxAmount = ((rawMaterialTotal - discountAmount) * Number(values.tax_percentage)) / 100;

    const finalTotal = rawMaterialTotal - discountAmount + taxAmount;
    setTotalAmount(finalTotal);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [values.raw_materials, values.discount_percentage, values.tax_percentage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addRawMaterialStart());
    try {
      const response = await axios.post(`${BASE_URL}/raw-materials`, values , {
        headers : {"Content-Type" : 'multipart/form-data'}
      });
      console.log(response);
      dispatch(addRawMaterialSuccess(response.data));
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
      dispatch(addRawMaterialFailure(error));
    }
  };



  // fetch suppliers
  const {suppliers , loading} = useSelector((state) => state.suppliers);
  const [filter, setFilter] = useState({ search: "" });
  

  console.log('Suppliers Values :' ,suppliers.data)
  useEffect(() => {
    const getSuppliers = async () => {
      if (filter.search) { 
        dispatch(getSuppliersStart());
        try {
          const response = await axios.get(`${BASE_URL}/suppliers`, {
            params: {
              "filter[search]": filter.search
            }
          });
          dispatch(getSupplierSuccess(response.data));
        } catch (err) {
          console.log(err);
          dispatch(getSuppliersFailed(err));
        }
      }
    };
    getSuppliers();
  }, [filter.search, dispatch]);

  const selectSupplier = (index, supplier) => {
    const updatedMaterials = [...values.raw_materials];
    updatedMaterials[index].supplier_id = supplier.id; // Set selected supplier ID
    updatedMaterials[index].supplier_name = supplier.contact_person; // Set supplier name for display
    setValues({ ...values, raw_materials: updatedMaterials });
    setFilter({ search: supplier.contact_person }); // Update search input to show selected supplier
  };
  
  



  return (
    <div className="my-5">
      <SuccessToast
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        message="Products Created Successfully"
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="payment_method" value="Payment Method" />
            <Select
              id="payment_method"
              required
              value={values.payment_method}
              onChange={(e) => handleChange(null, e)}
            >
              <option value="">Select a payment method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" value="Status" />
            <TextInput
              id="status"
              placeholder="Enter status"
              required
              value={values.status}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="discount_percentage" value="Discount Percentage" />
            <TextInput
              id="discount_percentage"
              type="number"
              placeholder="Enter discount percentage"
              required
              value={values.discount_percentage}
              onChange={(e) => handleChange(null, e)}
              min="0"
              max="100"
            />
          </div>

          <div>
            <Label htmlFor="tax_percentage" value="Tax Percentage" />
            <TextInput
              id="tax_percentage"
              type="number"
              placeholder="Enter tax percentage"
              required
              value={values.tax_percentage}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="clearing_payable" value="Clearing Payable" />
            <TextInput
              id="clearing_payable"
              type="number"
              placeholder="Enter clearing payable amount"
              required
              value={values.clearing_payable}
              onChange={(e) => handleChange(null, e)}
            />
          </div>

          <div>
            <Label htmlFor="indebted" value="Indebted" />
            <TextInput
              id="indebted"
              type="number"
              placeholder="Enter indebted amount"
              required
              value={values.indebted}
              onChange={(e) => handleChange(null, e)}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="totalAmount" value="Total Amount" />
          <TextInput
            id="totalAmount"
            type="number"
            value={totalAmount.toFixed(2)}
            readOnly
            disabled
          />
        </div>

        {values.raw_materials.map((material, index) => (
          <div
            key={index}
            className="border border-dashed border-slate-600 p-4 rounded-md mb-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">
                Raw Material {index + 1}
              </h3>
              {values.raw_materials.length > 1 && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveProduct(index)}
                >
                  <MdCancel className="text-red text-xl" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" value="Material Name" />
                <TextInput
                  id="name"
                  placeholder="Enter material name"
                  required
                  value={material.name}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="quantity" value="Quantity" />
                <TextInput
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  required
                  value={material.quantity}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="unit_price" value="Unit Price" />
                <TextInput
                  id="unit_price"
                  type="text"
                  placeholder="Enter unit price"
                  required
                  value={material.unit_price}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="total_value" value="Total Value" />
                <TextInput
                  id="total_value"
                  type="text"
                  placeholder="Enter total value"
                  required
                  value={material.total_value}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label
                  htmlFor="minimum_stock_level"
                  value="Minimum Stock Level"
                />
                <TextInput
                  id="minimum_stock_level"
                  type="text"
                  placeholder="Enter minimum stock level"
                  required
                  value={material.minimum_stock_level}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="unit" value="Unit" />
                <TextInput
                  id="unit"
                  type="text"
                  placeholder="Enter unit"
                  required
                  value={material.unit}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="package_size" value="Package Size" />
                <TextInput
                  id="package_size"
                  type="text"
                  placeholder="Enter package size"
                  required
                  value={material.package_size}
                  onChange={(e) => handleChange(index, e)}
                />
              </div>

              <div>
                <Label htmlFor="supplier_id" value="Supplier" />
                <TextInput
                  id="supplier_id"
                  type="text"
                  placeholder="Select supplier"
                  required
                  value={material.supplier_id}
                  onChange={(e) => handleChange(index, e)}
                  rightIcon={IoSearchOutline}
                />
                <div>
                  {loading ? (
                    <p>Loading suppliers...</p>
                  ) : (
                    <List unstyled className=" divide-y my-5 px-3 h-[10rem] overflow-y-scroll divide-gray-200 dark:divide-gray-700">
                      {suppliers?.data && suppliers.data.map((supplier) => (
                        <List.Item key={supplier.id} className="pb-3 sm:pb-4 cursor-pointer" onClick={() => selectSupplier(index, supplier)}>
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <Avatar img="https://www.leapchanvuthy.dev/images/Leapchanvuthy.png" alt="Neil image" rounded size="sm" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{supplier.contact_person}</p>
                              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{supplier.email}</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">$320</div>
                          </div>
                        </List.Item>
                      ))}
                    </List>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4 mb-4">
              <Label
                htmlFor={`image_${index}`}
                className="flex items-center justify-center cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 p-4 w-full"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="h-8 w-8 text-gray-500 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Upload Image</span>
                </div>
                <FileInput
                  id={`image_${index}`}
                  className="hidden"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </Label>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {material.product_images.map((file, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${imgIndex}`}
                    className="w-full h-[8rem] object-cover rounded-md border-2 border-slate-800 dark:bg-slate-300"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-600 h-8 w-8 rounded-full bg-slate-800 text-white p-1"
                    onClick={() => handleRemoveImage(index, imgIndex)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between">
          <Button type="button" onClick={handleAddProduct}>
            Add Raw Material
          </Button>

          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;

