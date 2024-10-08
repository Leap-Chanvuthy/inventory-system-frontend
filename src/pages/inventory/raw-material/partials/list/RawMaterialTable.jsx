// import { useEffect, useState } from "react";
// import { Table } from "flowbite-react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GlobalPagination from "../../../../../components/Pagination";
// import { BASE_URL } from "../../../../../components/const/constant";
// import LoadingState from "./LoadingState";

// const RawMaterialTable = ({ filters }) => {
//   const [rawMaterials, setRawMaterials] = useState([]);
//   const [status, setStatus] = useState("idle");
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalItems, setTotalItems] = useState(0); 

//   const fetchRawMaterials = async (page = 1) => {
//     setStatus("loading");
//     try {
//       const response = await axios.get(`${BASE_URL}/raw-materials`, {
//         params: {
//           page,
//           "filter[search]": filters.query,
//         },
//       });
//       setRawMaterials(response.data.data);
//       setCurrentPage(response.data.current_page);
//       setTotalPages(response.data.last_page);
//       setTotalItems(response.data.total);
//       setStatus("succeeded");
//     } catch (err) {
//       setError("Failed to fetch raw materials: " + err.message);
//       setStatus("failed");
//     }
//   };

//   // Fetch data when filters or page changes
//   useEffect(() => {
//     fetchRawMaterials(currentPage);
//   }, [filters, currentPage]);

//   const handlePageChange = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   if (status === "loading") return (
//     <div>
//       <LoadingState />
//       <GlobalPagination
//           current_page={currentPage}
//           last_page={totalPages}
//           from={(currentPage - 1) * 10 + 1} // Assuming 10 items per page
//           to={Math.min(currentPage * 10, totalItems)}
//           total={totalItems}
//           onPageChange={handlePageChange}
//        />
//     </div>
//   );
//   if (status === "failed") return <div className="text-center py-5 text-red-500">{error}</div>;

//   return (
//     <div>
//       <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
//         <Table striped>
//           <Table.Head>
//             <Table.HeadCell>Product Name</Table.HeadCell>
//             <Table.HeadCell>Quantity</Table.HeadCell>
//             <Table.HeadCell>Unit Price</Table.HeadCell>
//             <Table.HeadCell>Total Value</Table.HeadCell>
//             <Table.HeadCell>Supplier</Table.HeadCell>
//             <Table.HeadCell>Supplier</Table.HeadCell>
//           </Table.Head>
//           <Table.Body className="divide-y">
//             {rawMaterials.length > 0 ? (
//               rawMaterials.map((material) => (
//                 <Table.Row
//                   key={material.id}
//                   className="bg-white dark:border-gray-700 dark:bg-gray-800"
//                 >
//                   <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
//                     {material.name}
//                   </Table.Cell>
//                   <Table.Cell>
//                     {material.quantity} {material.unit}
//                   </Table.Cell>
//                   <Table.Cell>{material.unit_price}</Table.Cell>
//                   <Table.Cell>{material.total_value}</Table.Cell>
//                   <Table.Cell>{material.supplier?.name || "N/A"}</Table.Cell>
//                   <Table.Cell>
//                     <Link
//                       to={`/raw-materials/edit/${material.id}`}
//                       className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
//                     >
//                       Edit
//                     </Link>
//                   </Table.Cell>
//                 </Table.Row>
//               ))
//             ) : (
//               <Table.Row>
//                 <Table.Cell colSpan="6" className="text-center py-4">
//                   No raw materials found.
//                 </Table.Cell>
//               </Table.Row>
//             )}
//           </Table.Body>
//         </Table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="my-5">
//         <GlobalPagination
//           current_page={currentPage}
//           last_page={totalPages}
//           from={(currentPage - 1) * 10 + 1} // Assuming 10 items per page
//           to={Math.min(currentPage * 10, totalItems)}
//           total={totalItems}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default RawMaterialTable;



import { useEffect, useState } from "react";
import { Avatar, Badge, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import GlobalPagination from "../../../../../components/Pagination";
import { BASE_URL , BASE_IMAGE_URL } from "../../../../../components/const/constant";
import LoadingState from "./LoadingState";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const RawMaterialTable = ({ filters }) => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0); 

  const fetchRawMaterials = async (page = 1) => {
    setStatus("loading");
    try {
      const response = await axios.get(`${BASE_URL}/raw-materials`, {
        params: {
          page,
          "filter[search]": filters.query,
          "filter[status]" : filters.status,
          "filter[raw_material_category]" : filters.category ,
          "sort" : filters.sort
        },
      });
      setRawMaterials(response.data.data);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
      setStatus("succeeded");
    } catch (err) {
      setError("Failed to fetch raw materials: " + err.message);
      setStatus("failed");
    }
  };

  // Fetch data when filters or page changes
  useEffect(() => {
    fetchRawMaterials(currentPage);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (status === "loading") return (
    <div>
      <LoadingState />
      <GlobalPagination
          current_page={currentPage}
          last_page={totalPages}
          from={(currentPage - 1) * 10 + 1} // Assuming 10 items per page
          to={Math.min(currentPage * 10, totalItems)}
          total={totalItems}
          onPageChange={handlePageChange}
       />
    </div>
  );
  if (status === "failed") return <div className="text-center py-5 text-red-500">{error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Code</Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Unit Price</Table.HeadCell>
            <Table.HeadCell>Total Value</Table.HeadCell>
            <Table.HeadCell>Minimum Stock</Table.HeadCell>
            <Table.HeadCell>location</Table.HeadCell>
            <Table.HeadCell>Created</Table.HeadCell>
            <Table.HeadCell>Updated</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {rawMaterials.length > 0 ? (
              rawMaterials.map((material) => (
                <Table.Row
                  key={material.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap">
                    {material.raw_material_images.length > 0 ? (
                      <Avatar
                        img={`${BASE_IMAGE_URL}/${material.raw_material_images[0].image}`}
                        alt={material.name}
                        className="w-16 h-16 object-cover"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.material_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {material.name}
                  </Table.Cell>
                  <Table.Cell>
                    {material.status === 'IN_STOCK' && (
                      <Badge color="success">{material.status}</Badge>
                    )}
                    {material.status === 'OUT_OF_STOCK' && (
                      <Badge color="warning">{material.status}</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {material.quantity} {material.unit}
                  </Table.Cell>
                  <Table.Cell>{material.unit_price}</Table.Cell>
                  <Table.Cell>{material.total_value}</Table.Cell>
                  <Table.Cell>{material.minimum_stock_level}</Table.Cell>
                  <Table.Cell>{material.location}</Table.Cell>
                  <Table.Cell>{formatDistanceToNow(new Date(material.created_at))}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/raw-materials/edit/${material.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="8" className="text-center py-4">
                  No raw materials found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="my-5">
        <GlobalPagination
          current_page={currentPage}
          last_page={totalPages}
          from={(currentPage - 1) * 10 + 1} // Assuming 10 items per page
          to={Math.min(currentPage * 10, totalItems)}
          total={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RawMaterialTable;
