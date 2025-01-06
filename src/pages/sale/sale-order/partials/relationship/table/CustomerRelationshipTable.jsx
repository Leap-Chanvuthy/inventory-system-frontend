import { useCallback, useEffect, useState } from "react";
import { Avatar, Badge, Checkbox, Spinner, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL , BASE_IMAGE_URL } from "../../../../../../components/const/constant";
import { useSelector, useDispatch } from "react-redux";
import GlobalPagination from "../../../../../../components/Pagination";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import LoadingState from "../../../../customer/partials/list/LoadingState";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Button, Modal } from "flowbite-react";
import { ImWarning } from "react-icons/im";
import {
  fetchCustomerStart,
  fetchCustomerSuccess,
  fetchCustomerFailed,
  addCustomerToCart,
  removeCustomerFromCart,
} from "../../../../../../redux/slices/customerSlice";
import useDebounce from "../../../../../../hooks/useDebounce";
import { IoEyeSharp } from "react-icons/io5";
import { toggleSingleSelection } from "../../../../../../redux/slices/selectionSlice";

const CustomerRelationshipTable = ({ filters }) => {
  const { customers, error, status , customerOnCart } = useSelector((state) => state.customers);
  const {singleSelection} = useSelector((state) => state.selections);
  const dispatch = useDispatch();

  console.log("Customer selection :" , singleSelection);
  console.log("Customer on cart :" , customerOnCart);

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCustomers = async (page = 1, search = filters.search) => {
    dispatch(fetchCustomerStart());
    try {
      const response = await axios.get(`${BASE_URL}/customers`, {
        params: {
          page,
          "filter[search]": search,
          "filter[customer_category_id]": filters?.category,
          "filter[customer_status]": filters?.status,
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

  // Custom debounced fetch function
  const debouncedFetchCustomers = useCallback(
    useDebounce((page, query) => {
      fetchCustomers(page, query);
    }, 1000),
    [filters]
  );

  // Fetch data when filters or page changes
  useEffect(() => {
    debouncedFetchCustomers(currentPage, filters.search);
  }, [filters, currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };


  const handleCustomerSelection = (customerId, customer) => {
    dispatch(toggleSingleSelection(customerId));
    if (singleSelection == customerId) {
      dispatch(removeCustomerFromCart());
    } else {
      dispatch(addCustomerToCart(customer));
    }
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
    return <LoadingState />;
  }

  if (status === "failed")
    return <div className="text-center py-5 text-red-500">Oops! {error}</div>;

  return (
    <div>
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Select</Table.HeadCell>
            <Table.HeadCell>Detail</Table.HeadCell>
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
          </Table.Head>
          <Table.Body className="divide-y">
            {customers.length > 0 ? (
              customers.map((customer) => (
                <Table.Row
                  key={customer.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-white">
                    <Checkbox 
                        checked={singleSelection === customer.id}
                        onChange={() =>{
                            handleCustomerSelection(customer.id , customer)
                        }}
                    />
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-blue-600 dark:text-white">
                    <Link to={`/customer/update/${customer.id}`}>
                      <Badge>
                        <div className="flex justify-center items-center gap-1">
                          <IoEyeSharp /> View
                        </div>
                      </Badge>
                    </Link>
                  </Table.Cell>

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
                        {customer.category
                          ? customer.category.category_name
                          : "N/A"}
                      </Badge>
                    </div>
                  </Table.Cell>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <div className="flex flex-wrap gap-2">
                      {customer.customer_status === "ACTIVE" && (
                        <Badge color="success">
                          {customer.customer_status}
                        </Badge>
                      )}
                      {customer.customer_status === "INACTIVE" && (
                        <Badge color="warning">
                          {customer.customer_status}
                        </Badge>
                      )}
                      {customer.customer_status === "SUSPENDED" && (
                        <Badge color="failure">
                          {customer.customer_status}
                        </Badge>
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

    </div>
  );
};

export default CustomerRelationshipTable;
