import { useEffect } from "react";
import { Table, TextInput, Button, Select } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import GlobalPagination from "../../../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL , BASE_IMAGE_URL } from "../../../components/const/constant";
import {
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure
} from "../../../redux/slices/userSlice";
import LoadingState from "./LoadingState";

function UserList() {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchUsersStart());
            try {
                const response = await axios.get(`${BASE_URL}/users`);
                dispatch(fetchUsersSuccess(response.data));
            } catch (error) {
                dispatch(fetchUsersFailure("Error fetching users: " + error.message));
            }
        };
        fetchData();
    }, [dispatch]);

    if (status == 'loading') return (<LoadingState />);
    if (status === 'failed') return <div className="text-center py-5 text-red-500">{error}</div>;

    return (
        <div>
            <div className="my-5 flex flex-col lg:flex-row gap-3 justify-between">
                <Link to="/users/create">
                    <Button color="info">Create New</Button>
                </Link>
                <div className="flex gap-3">
                    <TextInput placeholder="Search user" rightIcon={IoSearchOutline} />
                    <Select id="role-filter" required>
                        <option value="">Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Stock Controller">Stock Controller</option>
                        <option value="Sales">Sales</option>
                    </Select>
                </div>
            </div>
            <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
                <Table striped>
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
                        {users.data && users.data.map((user, index) => (
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
                                <Table.Cell>{user.role}</Table.Cell>
                                <Table.Cell>{user.email_verified_at || 'N/A'}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/users/edit/${user.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            <GlobalPagination />
        </div>
    );
}

export default UserList;
