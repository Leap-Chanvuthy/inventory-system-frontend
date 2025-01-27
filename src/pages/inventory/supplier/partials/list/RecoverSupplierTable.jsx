import { useCallback, useEffect, useState } from "react";
import { Badge, Spinner, Table, Tooltip } from "flowbite-react";
import axios from "axios";
import {
  BASE_URL
} from "../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import {
  getSuppliersStart,
  getSuppliersFailed,
  getSupplierSuccess,
  recoverSupplierStart,
  recoverSupplierSuccess,
  recoverSupplierFailure,
} from "../../../../../redux/slices/supplierSlice";
import GlobalPagination from "../../../../../components/Pagination";
import LoadingState from "./LoadingState";
import { Button, Modal } from "flowbite-react";
import { SuccessToast } from "../../../../../components/ToastNotification";
import useDebounce from "../../../../../hooks/useDebounce";
import useToken from "../../../../../hooks/useToken";
import { TbRestore } from "react-icons/tb";
import { CiCircleCheck } from "react-icons/ci";


const RecoverSupplierTable = ({ filters }) => {
  const dispatch = useDispatch();
  const token = useToken();
  const { suppliers, error, status } = useSelector((state) => state.suppliers);

  // handle delete function
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const handleRecover = async () => {
    if (!selectedId) {
      console.log("No supplier selected for recovery");
      return;
    }
    dispatch(recoverSupplierStart());
    try {
      const response = await axios.patch(`${BASE_URL}/supplier/recover/${selectedId}`, {} ,{
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(recoverSupplierSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.message);
      dispatch(
        recoverSupplierFailure(
          err.message || "Error recover data from the server."
        )
      );
    }
  };

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchSuppliers = async (page = 1 , search = filters.search) => {
    dispatch(getSuppliersStart());
    try {
      const response = await axios.get(`${BASE_URL}/suppliers/trashed`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page,
          "filter[search]": search,
          "filter[supplier_category]": filters?.category,
          "filter[supplier_status]": filters?.status,
          sort: filters?.sort,
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

  // Custom debounced fetch function
  const debouncedFetchSupplier = useCallback(
    useDebounce((page, query) => {
      fetchSuppliers(page, query);
    }, 1000),
    [filters]
  );

  // Fetch data when filters or page changes
  useEffect(() => {
    debouncedFetchSupplier(currentPage, filters.search);
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
    return <LoadingState />;
  }


  if (status === "failed")
    return <div className="text-center py-5 text-red-500">Oops! {error}</div>;

  return (
    <div>
      <div className="overflow-x-auto  my-5">
        <Table striped>
          <Table.Head>
            {/* <Table.HeadCell>ID</Table.HeadCell> */}
            <Table.HeadCell className="whitespace-nowrap">
              Supplier Code
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Name / Company
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Phone Number
            </Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Contact Person
            </Table.HeadCell>
            {/* <Table.HeadCell className="whitespace-nowrap">
              Business Reg. No.
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Bank Account No.
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Bank Name
            </Table.HeadCell> 
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Website</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Social Media
            </Table.HeadCell>*/}
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {suppliers.length > 0 ? (
              suppliers.map((supplier) => (
                <Table.Row
                  key={supplier.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.id}
                  </Table.Cell> */}
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.supplier_code}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.phone_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.email}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.supplier_category === "PRODUCT" && (
                      <Badge color="success">
                        {supplier.supplier_category}
                      </Badge>
                    )}
                    {supplier.supplier_category === "SERVICE" && (
                      <Badge color="warning">
                        {supplier.supplier_category}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {supplier.supplier_status === "ACTIVE" && (
                        <Badge color="success">
                          {supplier.supplier_status}
                        </Badge>
                      )}
                      {supplier.supplier_status === "INACTIVE" && (
                        <Badge color="warning">
                          {supplier.supplier_status}
                        </Badge>
                      )}
                      {supplier.supplier_status === "SUSPENDED" && (
                        <Badge color="failure">
                          {supplier.supplier_status}
                        </Badge>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.location}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.contact_person}
                  </Table.Cell>
                  {/* <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.business_registration_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.bank_account_number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.bank_name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {supplier.address}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <a
                      href={supplier.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {supplier.website}
                    </a>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <a
                      href={supplier.social_media}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {supplier.social_media}
                    </a>
                  </Table.Cell> */}
                  <Table.Cell className="flex justify-center items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Tooltip content='Click to recover'>
                        <TbRestore
                          className="text-green-600 text-lg cursor-pointer"
                          onClick={() => {
                            setOpenModal(true);
                            setSelectedId(supplier.id);
                          }}
                        />
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="16" className="text-center py-4">
                  No deleted suppliers found.
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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header><p className="text-center font-bold text-lg">Are you sure want to recover this item ?</p></Modal.Header>
        <Modal.Body>
          <div className="flex items-center gap-3 p-4 border-l-4 border-green-600 bg-green-100">
            <CiCircleCheck className="text-lg text-green-500" />
            <p className="text-green-500 uppercase text-sm font-semibold">After successfully restored, Item will be shown in active list.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleRecover} color='success'>
            {status == "loading" ? <Spinner /> : "Restore"}
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Supplier recovery successfully!"
      />
    </div>
  );
};

export default RecoverSupplierTable;
