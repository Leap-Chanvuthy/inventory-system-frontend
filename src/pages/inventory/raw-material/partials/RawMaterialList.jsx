// RawMaterialList.js
import { useState } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ExportRawMaterial from "./ExportRawMaterial";
import LoadingState from "../../../users/partials/LoadingState";
import RawMaterialTable from "./list/RawMaterialTable";

const RawMaterialList = () => {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    stockLevel: "",
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
              id="query"
              value={filters.query}
              onChange={handleFilterChange}
              rightIcon={IoSearchOutline}
            />
            <Select id="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">Category</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Work In Progress">Work In Progress</option>
              <option value="Packaging">Packaging</option>
              <option value="Finished Goods">Finished Goods</option>
            </Select>
            <Select id="stockLevel" value={filters.stockLevel} onChange={handleFilterChange}>
              <option value="">Stock Level</option>
              <option value="Lowest">Lowest</option>
              <option value="Highest">Highest</option>
            </Select>
            <Button type="submit" color="info">Search</Button>
          </form>
          <Link to="/raw-materials/create">
            <Button color="info">Create New</Button>
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <ExportRawMaterial />
          <ExportRawMaterial />
        </div>
      </div>

      <RawMaterialTable filters={filters} />
    </div>
  );
};

export default RawMaterialList;
