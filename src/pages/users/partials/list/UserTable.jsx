import { useEffect, useState } from "react";
import { Badge, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import GlobalPagination from "../../../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  BASE_URL,
  BASE_IMAGE_URL,
} from "../../../../components/const/constant";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../../../../redux/slices/userSlice";
import LoadingState from "../../../inventory/supplier/partials/list/LoadingState";

function UserTable({ filters }) {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  // Fetch data & pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async (page = 1) => {
    dispatch(fetchUsersStart());
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        params: {
          page,
          "filter[search]" : filters.search,
          "filter[role]" : filters.role
        },
      });
      dispatch(fetchUsersSuccess(response.data.data));
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
      setTotalItems(response.data.total);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      dispatch(
        fetchUsersFailure(
          err.message || "Failed to fetch data from the server."
        )
      );
    }
  };

  useEffect(() => {
    fetchData(currentPage);
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

  if (!Array.isArray(users)) {
    return (
      <div className="text-center py-5 text-red-500">
        users data is invalid.
      </div>
    );
  }

  if (users.length === 0) {
    return (
    <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Email Verified At</Table.HeadCell>
          </Table.Head>
          <Table.Body className="devide-y">
            <Table.Row>
                <Table.Cell colSpan="8" className="text-center py-4">
                  No users found. :)
                </Table.Cell>
              </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Email Verified At</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {  users.map((user, index) => (
                <Table.Row
                  key={user.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={`${BASE_IMAGE_URL}/${user.profile_picture}`}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.phone_number}</Table.Cell>
                  <Table.Cell>
                    {user.role === 'ADMIN' && (
                      <Badge color="success">{user.role}</Badge>
                    )}
                    {user.role === 'STOCK_CONTROLLER' && (
                      <Badge color="warning">{user.role}</Badge>
                    )}
                    {user.role === 'VENDER' && (
                      <Badge color="purple">{user.role}</Badge>
                    )}
                    {user.role === 'USER' && (
                      <Badge color="indigo" >{user.role}</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.user_status === 'ACTIVE' && (
                      <Badge color="success">{user.supplier_status}</Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>{user.email_verified_at || "N/A"}</Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/users/edit/${user.id}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
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
}

export default UserTable;
