import { useEffect, useState } from "react";
import { Avatar, Badge, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import GlobalPagination from "../../../../../components/Pagination";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import LoadingState from "./LoadingState";
// import SupplierMap from "../map/SupplierMap";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button, Modal } from "flowbite-react";
import { SuccessToast } from "../../../../../components/ToastNotification";
import { ImWarning } from "react-icons/im";
import {
    deleteCustomerFailed,
    deleteCustomerStart,
  deleteCustomerSuccess,
  fetchCustomerFailed,
  fetchCustomerStart,
  fetchCustomerSuccess,
} from "../../../../../redux/slices/customerSlice";

const CustomerTable = ({ filters }) => {
  const { customers, error, status } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  // handle delete function
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedId) {
      console.log("No customer selected for deletion");
      return;
    }
    dispatch(deleteCustomerStart());
    try {
      const response = await axios.delete(`${BASE_URL}/customer/${selectedId}`);
      console.log(response);
      if (response.status === 200) {
        dispatch(deleteCustomerSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.response);
      dispatch(
        deleteCustomerFailed(
          err.message || "Error deleting data from the server."
        )
      );
    }
  };

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCustomers = async (page = 1) => {
    dispatch(fetchCustomerStart());
    try {
      const response = await axios.get(`${BASE_URL}/customers`, {
        params: {
          page,
            "filter[search]": filters?.search,
            "filter[customer_category]" : filters?.category ,
            "filter[customer_status]" : filters?.status ,
          sort: filters?.sort,
        },
      });
      console.log(response);
      dispatch(fetchCustomerSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("Failed to fetch :", err.response);
      dispatch(
        fetchCustomerFailed(
          err.message || "Failed to fetch data from the server."
        )
      );
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
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

  if (!Array.isArray(customers)) {
    return (
      <div className="text-center py-5 text-red-500">
        Customers data is invalid.
      </div>
    );
  }

  //   const locations = suppliers.map((supplier) => ({
  //     id: supplier.id,
  //     image : supplier.image,
  //     name: supplier.name,
  //     latitude: parseFloat(supplier.latitude),
  //     longitude: parseFloat(supplier.longitude),
  //   }));

  if (status === "failed")
    return <div className="text-center py-5 text-red-500">Oops! {error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Customer Name
            </Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Phone Number
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Email Address
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Social Media
            </Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Created At
            </Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap">
              Updated At
            </Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <Table.Row
                  key={customer.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Avatar
                      img={
                        customer.image
                          ? `${BASE_IMAGE_URL}/${customer.image}`
                          : ""
                      }
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer.id}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer.fullname}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      <Badge color={customer.category ? "warning" : "failure"}>
                        {customer.category ? customer.category.category_name : 'N/A'}
                      </Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {customer.customer_status === "ACTIVE" && (
                        <Badge color="success">{customer.customer_status}</Badge>
                      )}
                      {customer.customer_status === "INACTIVE" && (
                        <Badge color="warning">{customer.customer_status}</Badge>
                      )}
                      {customer.customer_status === "SUSPENDED" && (
                        <Badge color="failure">{customer.customer_status}</Badge>
                      )}
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer.phone_number}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer.email_address}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer.social_medial}
                  </Table.Cell>

                  
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer.shipping_address}
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap">
                    {new Date(customer.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    , {formatDistanceToNow(new Date(customer.created_at))} ago
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {formatDistanceToNow(new Date(customer.updated_at))} ago
                  </Table.Cell>

                  <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Link to={`/customer/update/${customer.id}`}>
                      <FiEdit />
                    </Link>
                    <MdDelete
                      className="text-red-600 text-lg cursor-pointer"
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedId(customer.id);
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="16" className="text-center py-4">
                  No customers found.
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
      {/* <div className="my-5 flex flex-col gap-3">
        <SupplierMap locations={locations} />
      </div> */}
      map here
      <>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            <p className="text-center font-bold text-lg capitalize">
              Are you sure want to delete ?
            </p>
          </Modal.Header>
          <Modal.Body>
            <div className="flex items-center gap-3 p-4 border-l-4 border-red-600 bg-red-100">
              <ImWarning className="text-lg text-red-500" />
              <p className="text-red-500  uppercase text-sm font-semibold">
                Item will be shown in recover list after deleted.
              </p>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={handleDelete} color="failure">
              {status == "loading" ? <Spinner /> : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="Customer deleted successfully!"
      />
    </div>
  );
};

export default CustomerTable;
