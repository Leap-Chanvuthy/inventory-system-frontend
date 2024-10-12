import { useEffect, useState } from "react";
import { Badge, Button, Modal, Table } from "flowbite-react";
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
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../../../../redux/slices/userSlice";
import LoadingState from "../../../inventory/supplier/partials/list/LoadingState";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { SuccessToast } from "../../../../components/ToastNotification";
import { LuAlertTriangle } from "react-icons/lu";

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
          "filter[search]": filters.search,
          "filter[role]": filters.role,
          sort: filters.sort,
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


  // handle delete function
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [failedToastOpen, setFailedToastOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedId) {
      console.log("No user selected for deletion");
      return;
    }
    dispatch(deleteUserStart());
    try {
      const response = await axios.delete(`${BASE_URL}/user/${selectedId}`);
      console.log(response);
      if (response.status === 200) {
        dispatch(deleteUserSuccess(selectedId));
        setOpenModal(false);
        setSuccessToastOpen(true);
      }
    } catch (err) {
      console.log("Delete error:", err.message);
      dispatch(
        deleteUserFailure(err.message || "Error deleting data from the server.")
      );
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
            <Table.HeadCell>Actions</Table.HeadCell>
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
      <div className="overflow-x-auto lg:max-w-6xl  my-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap text-gray-900 dark:text-white">
              Phone Number
            </Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell className="whitespace-nowrap text-gray-900 dark:text-white">
              Email Verified At
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.map((user, index) => (
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
                  {user.role === "ADMIN" && (
                    <Badge color="success">{user.role}</Badge>
                  )}
                  {user.role === "STOCK_CONTROLLER" && (
                    <Badge color="warning">{user.role}</Badge>
                  )}
                  {user.role === "VENDER" && (
                    <Badge color="purple">{user.role}</Badge>
                  )}
                  {user.role === "USER" && (
                    <Badge color="indigo">{user.role}</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>{user.email_verified_at || "N/A"}</Table.Cell>
                <Table.Cell className="flex items-center cursor-pointer gap-3 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <FiEdit />
                  <MdDelete
                    className="text-red-600 text-lg cursor-pointer"
                    onClick={() => {
                      setOpenModal(true);
                      setSelectedId(user.id);
                    }}
                  />
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

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <p className="text-center font-bold text-lg">Are you sure want to delete this user ?</p>
          <div className="flex flex-col p-4 my-4 border-l-4 border-red-600 bg-red-100 rounded-md">
            <div className="flex items-center gap-2 mx-4 font-bold text-red-900">
              <LuAlertTriangle />
              <p>Warning</p>
            </div>
            <p className="mx-4 text-red-400">Once you deleted this user, Data will not be recovered!</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDelete} color='failure'>
            {status == "loading" ? <Spinner /> : "Delete"}
          </Button>
          <Button onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>

      <SuccessToast
        open={successToastOpen}
        onClose={() => setSuccessToastOpen(false)}
        message="User deleted successfully!"
      />
    </div>
  );
}

export default UserTable;
