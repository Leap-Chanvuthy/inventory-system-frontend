import React from "react";
import { Table, TextInput, Button, Select } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import GlobalPagination from "../../components/Pagination";

const fakeSaler = [
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    role: "Admin",
    emailVerifiedAt: "2023-01-15",
  },
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+0987654321",
    role: "Editor",
    emailVerifiedAt: "2023-02-20",
  },
  {
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    name: "David Johnson",
    email: "davidjohnson@example.com",
    phone: "+1122334455",
    role: "User",
    emailVerifiedAt: "2023-03-10",
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "+2233445566",
    role: "Moderator",
    emailVerifiedAt: "2023-04-05",
  },
  {
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    phone: "+3344556677",
    role: "Admin",
    emailVerifiedAt: "2023-05-01",
  },
  {
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    role: "Admin",
    emailVerifiedAt: "2023-01-15",
  },
  {
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "+0987654321",
    role: "Editor",
    emailVerifiedAt: "2023-02-20",
  },
  {
    image: "https://randomuser.me/api/portraits/men/85.jpg",
    name: "David Johnson",
    email: "davidjohnson@example.com",
    phone: "+1122334455",
    role: "User",
    emailVerifiedAt: "2023-03-10",
  },
  {
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "+2233445566",
    role: "Moderator",
    emailVerifiedAt: "2023-04-05",
  },
  {
    image: "https://randomuser.me/api/portraits/men/24.jpg",
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    phone: "+3344556677",
    role: "Admin",
    emailVerifiedAt: "2023-05-01",
  },
];

function SalerList() {
  return (
    <div>
      <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
        <Link to="/users/create">
          <Button color="info">Create New</Button>
        </Link>
        <div className="flex gap-3">
          <TextInput placeholder="Search user" rightIcon={IoSearchOutline} />
          <Select id="countries" required>
            <option>Role</option>
            <option>Admin</option>
            <option>Stock Controller</option>
            <option>Saler</option>
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
            {fakeSaler.map((saler, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  <img
                    src={saler.image}
                    alt={saler.name}
                    className="h-10 w-10 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {saler.name}
                </Table.Cell>
                <Table.Cell>{saler.email}</Table.Cell>
                <Table.Cell>{saler.phone}</Table.Cell>
                <Table.Cell>{saler.role}</Table.Cell>
                <Table.Cell>{saler.emailVerifiedAt}</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
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

export default SalerList;
