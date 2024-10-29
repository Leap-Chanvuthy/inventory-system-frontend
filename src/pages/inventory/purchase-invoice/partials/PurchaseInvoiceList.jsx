import { useState } from "react";
import {
  TextInput,
  Button,
  Select,
  Dropdown,
  Checkbox,
  Label,
  Tooltip,
} from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import {TbRestore} from 'react-icons/tb';
import { Link } from "react-router-dom";
import PurchaseInvoiceTable from "./list/PurchaseInvoiceTable";

const PurchaseInvoiceList = () => {
  const [filters, setFilters] = useState({
    search: "",
    payment_method: "",
    status: "",
    start_date : "",
    end_date :"",
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
      status: "",
      payment_method: "",
      start_date : "",
      end_date :"",
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
          <form
            onSubmit={handleSearch}
            className="flex flex-col lg:md:flex-row gap-3"
          >
            <TextInput
              placeholder="Search invoices"
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
                    id="material_code"
                    onChange={handleSortChange}
                    checked={filters.sort.includes("material_code")}
                  />
                  <label htmlFor="material_code">Material Code</label>
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
                      htmlFor="status"
                      value="Status"
                      className="mb-2 block"
                    />
                    <Select
                      id="status"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Status</option>
                      <option value="PAID">Paid</option>
                      <option value="UNPAID">Unpaid</option>
                      <option value="INDEBTED">Indebted</option>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="payment_method"
                      value="Payment Method"
                      className="mb-2 block"
                    />
                    <Select
                      id="payment_method"
                      value={filters.payment_method}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select an option</option>
                      <option value="CREDIT_CARD">Credit Card</option>
                      <option value="CASH">Cash</option>
                      <option value="BANK">Bank Transfer</option>
                      <option value="OTHER">Other</option>
                    </Select>
                  </div>
                </div>
              </div>
            </Dropdown>

            {/* Filter by date */}
            <Dropdown label="Date">
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
                      htmlFor="start_date"
                      value="Start From Date"
                      className="mb-2 block"
                    />
                    <TextInput type="date" id="start_date" value={filters.start_date} onChange={handleFilterChange} />
                  </div>

                  <div>
                    <Label
                      htmlFor="end_date"
                      value="End Date"
                      className="mb-2 block"
                    />
                    <TextInput type="date" id="end_date" value={filters.end_date} onChange={handleFilterChange} />
                  </div>

                </div>
              </div>
            </Dropdown>

          </form>
          <Link to="/raw-materials/create">
            <Button color="info">Create New</Button>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <Link to='/raw-materials/recover'>
            <Tooltip content="Recover">
              <Button color="success" className="flex justify-center items-center">
                <TbRestore className="text-xl" />{" "}
              </Button>
            </Tooltip>
          </Link>
        </div>
      </div>

      <PurchaseInvoiceTable filters={filters} />  

    </div>
  );
};

export default PurchaseInvoiceList;
