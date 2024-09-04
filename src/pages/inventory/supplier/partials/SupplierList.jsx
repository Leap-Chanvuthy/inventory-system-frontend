import { useState } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SupplierTable from "./list/SupplierTable";

const SupplierList = () => {
  const [filters, setFilters] = useState({
    search: "",
  });

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    setFilters({ ...filters, [id]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
          <form onSubmit={handleSearch} className="flex flex-col lg:md:flex-row gap-3">
            <TextInput
              placeholder="Search product"
              id="search"
              value={filters.search}
              onChange={handleFilterChange}
              rightIcon={IoSearchOutline}
            />
          </form>
          <Link to="/raw-materials/create">
            <Button color="info">Create New</Button>
          </Link>
        </div>
      </div>
      <SupplierTable filters={filters} />
    </div>
  );
};

export default SupplierList;
