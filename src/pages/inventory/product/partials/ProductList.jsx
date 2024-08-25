import { TextInput, Button, Table, Select } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import GlobalPagination from "../../../../components/Pagination";
import ExportProduct from "./ExportProduct";

// Fake product data
const products = [
  {
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
  {
    name: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    price: "$99",
  },
  {
    name: "Sony WH-1000XM4",
    color: "Black",
    category: "Headphones",
    price: "$349",
  },
  {
    name: "Samsung Galaxy S21",
    color: "Phantom Gray",
    category: "Smartphone",
    price: "$799",
  },
  {
    name: 'Apple MacBook Pro 17"',
    color: "Silver",
    category: "Laptop",
    price: "$2999",
  },
  {
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: "$1999",
  },
  {
    name: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    price: "$99",
  },
  {
    name: "Sony WH-1000XM4",
    color: "Black",
    category: "Headphones",
    price: "$349",
  },
  {
    name: "Samsung Galaxy S21",
    color: "Phantom Gray",
    category: "Smartphone",
    price: "$799",
  },
];

const ProductList = () => {
  return (
    <div>
      <div>
        <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
          <div className="flex flex-col lg:md:flex-row gap-3">
            <TextInput
              placeholder="Search product"
              rightIcon={IoSearchOutline}
            />
            <Select id="category" required>
              <option>Category</option>
              <option>Raw Materials</option>
              <option>Work In Progress</option>
              <option>Packaging</option>
              <option>Finished Goods</option>
            </Select>
            <Select id="stock-level" required>
              <option>Stock Level</option>
              <option>Lowest</option>
              <option>Highest</option>
            </Select>
          </div>
          <Link to="/products/create">
            <Button color="info">Create New</Button>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <ExportProduct />
          <ExportProduct />
        </div>
      </div>

      {/* List of Product (Table) */}
      <div className="overflow-x-auto h-[65vh] overflow-y-scroll my-5">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Color</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {products.map((product, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.name}
                </Table.Cell>
                <Table.Cell>{product.color}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
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

      <div className="my-5">
        <GlobalPagination />
      </div>
    </div>
  );
};

export default ProductList;
