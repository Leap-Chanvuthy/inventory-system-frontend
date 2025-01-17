import { useCallback, useEffect, useState } from "react";
import { Avatar, Badge, Checkbox, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL , BASE_IMAGE_URL } from "../../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import {
  getSuppliersStart,
  getSuppliersFailed,
  getSupplierSuccess,
} from "../../../../../../redux/slices/supplierSlice";
import { toggleSingleSelection } from "../../../../../../redux/slices/selectionSlice";
import GlobalPagination from "../../../../../../components/Pagination";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {
  deleteSupplierStart,
  deleteSupplierSuccess,
  deleteSupplierFailed,
} from "../../../../../../redux/slices/supplierSlice";
import LoadingState from '../../list/LoadingState';
import { Button, Modal } from "flowbite-react";
import { SuccessToast } from "../../../../../../components/ToastNotification";
import { ImWarning } from "react-icons/im";
import useDebounce from "../../../../../../hooks/useDebounce";
import useToken from "../../../../../../hooks/useToken";

const SupplierRelationshipTable = ({ filters }) => {
  const token = useToken();
  const { suppliers, error, status } = useSelector((state) => state.suppliers);
  const {singleSelection} = useSelector((state) => state.selections);
  const dispatch = useDispatch();

  // select supplier id
  const handleSingleSelect = (id) => {
    dispatch(toggleSingleSelection(id));
  };

  console.log('Single supplier selection :' , singleSelection);

  // handle delete function
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  // const handleDelete = async () => {
  //   if (!selectedId) {
  //     console.log("No supplier selected for deletion");
  //     return;
  //   }
  //   dispatch(deleteSupplierStart());
  //   try {
  //     const response = await axios.delete(`${BASE_URL}/supplier/${selectedId}`);
  //     console.log(response);
  //     if (response.status === 200) {
  //       dispatch(deleteSupplierSuccess(selectedId));
  //       setOpenModal(false);
  //       setSuccessToastOpen(true);
  //     }
  //   } catch (err) {
  //     console.log("Delete error:", err.message);
  //     dispatch(
  //       deleteSupplierFailed(
  //         err.message || "Error deleting data from the server."
  //       )
  //     );
  //   }
  // };

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSuppliers = async (page = 1 , search = filters.search) => {
    dispatch(getSuppliersStart());
    try {
      const response = await axios.get(`${BASE_URL}/suppliers`, {
        headers : {
          Authorization : `Bearer ${token}`
        },
        params: {
          page,
          "filter[search]": search,
          "filter[supplier_category]" : filters?.category , 
          "filter[supplier_status]" : filters?.status , 
          "sort" : filters?.sort
        },
      });
      dispatch(getSupplierSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("Failed to fetch suppliers:", err);
      dispatch(
        getSuppliersFailed(
          err.message || "Failed to fetch data from the server."
        )
      );
    }
  };

  const debouncedFetchSuppliers = useCallback(
    useDebounce((page, query) => {
      fetchSuppliers(page, query);
    }, 1000),
    [filters]
  );

  // Fetch data when filters or page changes
  useEffect(() => {
    debouncedFetchSuppliers(currentPage, filters.search);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (status === "loading")
    return (
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

  if (!Array.isArray(suppliers)) {
    return <div className="text-center py-5 text-red-500">Suppliers data is invalid.</div>;
  }

  if (status === "failed")
    return <div className="text-center py-5 text-red-500">Oops! {error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Select</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Name / Company</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Phone Number</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Contact Person</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Business Reg. No.</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Bank Account No.</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Bank Name</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Supplier Code</Table.HeadCell>
            <Table.HeadCell >Address</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Website</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">Social Media</Table.HeadCell>
            {/* <Table.HeadCell>Actions</Table.HeadCell> */}
          </Table.Head>
          <Table.Body className="divide-y">
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <Table.Row
                  key={supplier.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Checkbox 
                      checked={singleSelection === supplier.id}
                      onChange={() => handleSingleSelect(supplier.id)}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Avatar
                      img={supplier.image ? `${BASE_IMAGE_URL}/${supplier.image}` : ""}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.phone_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.supplier_category === 'PRODUCT' && (
                      <Badge color="success">{supplier.supplier_category}</Badge>
                    )}
                    {supplier.supplier_category === 'SERVICE' && (
                      <Badge color="warning">{supplier.supplier_category}</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {supplier.supplier_status === 'ACTIVE' && (
                        <Badge color="success">{supplier.supplier_status}</Badge>
                      )}
                      {supplier.supplier_status === 'INACTIVE' && (
                        <Badge color="warning">{supplier.supplier_status}</Badge>
                      )}
                      {supplier.supplier_status === 'SUSPENDED' && (
                        <Badge color="failure">{supplier.supplier_status}</Badge>
                      )}
                    </div>
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
                    {supplier.supplier_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.address}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.email}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer">
                      {supplier.website}
                    </a>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <a href={supplier.social_media} target="_blank" rel="noopener noreferrer">
                      {supplier.social_media}
                    </a>
                  </Table.Cell>
                  {/* <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/supplier/update/${supplier.id}`}><FiEdit /></Link>
                    <MdDelete
                      className="text-red-600 text-lg cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedId(supplier.id);
                      }}
                    />
                  </Table.Cell> */}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="16" className="text-center py-4">
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

      {/* <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header><p className="text-center font-bold text-lg capitalize">Are you sure want to delete ?</p></Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-red-600 bg-red-100">
            <ImWarning className="text-lg text-red-500" />
            <p className="text-red-500  uppercase text-sm font-semibold">Item will be shown in recover list after deleted.</p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleDelete} color='failure'>
            {status == "loading" ? <Spinner /> : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
      </> */}

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Supplier deleted successfully!"
      />
    </div>
  );
};

export default SupplierRelationshipTable;
