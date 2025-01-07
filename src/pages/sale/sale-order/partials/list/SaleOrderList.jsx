import { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  Dropdown,
  Select,
  Label,
  Tooltip,
} from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbRestore } from "react-icons/tb";
import SaleOrderTable from "./SaleOrderTable";

const SaleOrderList = () => {
  const [filters, setFilters] = useState({
    search: "",
    payment_method : "",
    payment_status : "",
    order_status : "",
    sort: [],
  });


  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const handleSortChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setFilters({ ...filters, sort: [...filters.sort, id] });
    } else {
      setFilters({
        ...filters,
        sort: filters.sort.filter((sortField) => sortField !== id),
      });
    }
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      payment_method : "",
      payment_status : "",
      order_status : "",
      sort: [],
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
          <div className="flex gap-3">
            <form
              onSubmit={handleSearch}
              className="flex flex-col lg:md:flex-row gap-3"
            >
              <TextInput
                placeholder="Search"
                id="search"
                value={filters.search}
                onChange={handleFilterChange}
                rightIcon={IoSearchOutline}
              />
              <Dropdown label="Sort">
                <div className="p-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="created_at"
                      onChange={handleSortChange}
                      checked={filters.sort.includes("created_at")}
                    />
                    <label htmlFor="created_at">Created At</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="updated_at"
                      onChange={handleSortChange}
                      checked={filters.sort.includes("updated_at")}
                    />
                    <label htmlFor="updated_at">Updated At</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="order_date"
                      onChange={handleSortChange}
                      checked={filters.sort.includes("order_date")}
                    />
                    <label htmlFor="order_date">Order Date</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="customer_name"
                      onChange={handleSortChange}
                      checked={filters.sort.includes("customer_name")}
                    />
                    <label htmlFor="updated_at">Customer Name</label>
                  </div>
                </div>
              </Dropdown>

              {/* Filter        */}
              <Dropdown label="Filter">
                <p
                  className="absolute left-[70%] text-red-500 cursor-pointer"
                  onClick={resetFilters}
                >
                  Clear
                </p>
                <div className="p-5">
                  <div className="flex flex-col gap-3">
                    <div>
                      <Label
                        htmlFor="payment_method"
                        className="font-bold"
                        value="Payment Method"
                      />
                      <Select
                        id="payment_method"
                        value={filters.payment_method}
                        onChange={handleFilterChange}
                      >
                        <option value="">Select an option</option>
                        <option value="CREDIT_CARD">Credit Card</option>
                        <option value="CASH">Cash</option>
                        <option value="BANK">Bank</option>
                      </Select>
                    </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Order Status" />
                    </div>
                    <Select
                      id="order_status"
                      onChange={handleFilterChange}
                      value={filters.order_status}
                    >
                      <option value="">Select an option</option>
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="DELIVERING">Delivering</option>
                      <option value="COMPLETED">Completed</option>
                    </Select>
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label className="font-bold" value="Payment Status" />
                    </div>
                    <Select
                      id="payment_status"
                      onChange={handleFilterChange}
                      value={filters.payment_status}
                    >
                      <option value="">Select an option</option>
                      <option value="UNPAID">Unpaid</option>
                      <option value="PAID">Paid</option>
                      <option value="INDEBTED">Indebted</option>
                    </Select>
                  </div>
                  
                  </div>
                </div>
              </Dropdown>
            {/* export */}
            <div className="flex gap-3 items-center">
              {/* Export here */}
              <div className="flex gap-3 items-center">
                <Link to="/sale-orders/recover">
                  <Tooltip content="Recover">
                    <Button
                      color="success"
                      className="flex justify-center items-center"
                    >
                      <TbRestore className="text-xl" />{" "}
                    </Button>
                  </Tooltip>
                </Link>
              </div>
            </div>
            </form>




          </div>
          <Link to="/sale-orders/create">
            <Button color="info">Create New</Button>
          </Link>
        </div>
      </div>

      <SaleOrderTable filters={filters} />
    </div>
  );
};

export default SaleOrderList;
