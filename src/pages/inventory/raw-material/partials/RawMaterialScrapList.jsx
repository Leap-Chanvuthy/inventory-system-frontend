import { useState, useEffect } from "react";
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
import { TbRestore } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import Partial from "../../../../components/Partial";
import RawMaterialScrapTable from "./list/RawMaterialScrapTable";
import Create from "./raw-material-scrap/Create";

const RawMaterialScrapList = () => {
  const [filters, setFilters] = useState({
    query: "",
    raw_material_id: "",
    quantity: "",
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
      query: "",
      raw_material_id: "",
      quantity: "",
      sort: [],
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        {/* <h3 className="text-lg font-bold">Raw Material Category</h3> */}
        <Partial title="Raw Material Scrap" link="list" />
        <div className="my-5 flex flex-col lg:md:flex-row gap-3 justify-between">
          <form
            onSubmit={handleSearch}
            className="flex flex-col lg:md:flex-row gap-3"
          >
            <TextInput
              placeholder="Search material"
              id="query"
              value={filters.query}
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
                    id="quantity"
                    onChange={handleSortChange}
                    checked={filters.sort.includes("quantity")}
                  />
                  <label htmlFor="quantity">Scrap Qty</label>
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
              <div className="p-5"></div>
            </Dropdown>
            {/* Refresh data */}
            <Button color="success" onClick={resetFilters}>
              Refresh
            </Button>
          </form>
          <div className="flex gap-3 items-center">
            <Create />
          </div>
        </div>
      </div>

      {/* <CategoryTable filters={filters} /> */}
    <RawMaterialScrapTable filters={filters} />
    </div>
  );
};

export default RawMaterialScrapList;
