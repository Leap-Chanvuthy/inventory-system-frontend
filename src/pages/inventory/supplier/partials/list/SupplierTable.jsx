import { useEffect, useState } from "react";
import { Avatar, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliersStart, getSuppliersFailed, getSupplierSuccess } from "../../../../../redux/slices/supplierSlice";
import GlobalPagination from '../../../../../components/Pagination';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import LoadingState from "./LoadingState";
import SupplierMap from "../map/SupplierMap";

const SupplierTable = ({ filters }) => {
  const { suppliers, error, status } = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchRawMaterials = async (page = 1) => {
    dispatch(getSuppliersStart());
    try {
      const response = await axios.get(`${BASE_URL}/suppliers`, {
        params: {
          page,
          "filter[search]" : filters.search,
        },
      });
      dispatch(getSupplierSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err); // Log the error
      dispatch(getSuppliersFailed(err.message || "Failed to fetch data from the server."));
    }
  };

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
        from={(currentPage - 1) * 10 + 1}
        to={Math.min(currentPage * 10, totalItems)}
        total={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );

  if (status === "failed") return <div className="text-center py-5 text-red-500">Opps! {error}</div>;

  const locations = suppliers.map(supplier => ({
    id: supplier.id,
    name: supplier.name,
    latitude: parseFloat(supplier.latitude),
    longitude: parseFloat(supplier.longitude),
  }));

  console.log(locations)



  return (
    <div>
      <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name / Company</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Contact Person</Table.HeadCell>
            <Table.HeadCell>Business Reg. No.</Table.HeadCell>
            <Table.HeadCell>Bank Account No.</Table.HeadCell>
            <Table.HeadCell>Bank Name</Table.HeadCell>
            <Table.HeadCell className="w-5">No. Material</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <Table.Row
                  key={supplier.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Avatar img='https://www.leapchanvuthy.dev/images/Leapchanvuthy.png' />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.phone_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.location}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.contact_person}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.business_registration_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.bank_account_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.bank_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.products.length} {/* Assuming products array exists */}
                  </Table.Cell>
                  <Table.Cell className="flex items-center gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <FiEdit />
                    <MdDelete className="text-red text-lg" />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="18" className="text-center py-4">
                  No suppliers found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      <div className="my-5">
        <GlobalPagination
          current_page={currentPage}
          last_page={totalPages}
          from={(currentPage - 1) * 10 + 1}
          to={Math.min(currentPage * 10, totalItems)}
          total={totalItems}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="my-5 flex flex-col gap-3">
        <SupplierMap locations={locations} />
      </div>


    </div>
  );
};

export default SupplierTable;
