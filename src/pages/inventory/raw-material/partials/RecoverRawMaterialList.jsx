import { useState } from "react";
import {
  TextInput,
  Select,
  Dropdown,
  Checkbox,
  Label,
} from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import RecoverRawMaterialTable from "./list/RecoverRawMaterialTable";

const RecoverRawMaterialList = () => {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    status: "",
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
      category: "",
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
              placeholder="Search product"
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
                      <option value="IN_STOCK">In stock</option>
                      <option value="OUT_OF_STOCK">Out of stock</option>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="category"
                      value="Category"
                      className="mb-2 block"
                    />
                    <Select
                      id="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select Category</option>
                      <option value="SERVICE">Service</option>
                      <option value="PRODUCT">Product</option>
                    </Select>
                  </div>
                </div>
              </div>
            </Dropdown>
          </form>
        </div>
      </div>

      <RecoverRawMaterialTable filters={filters} />
    </div>
  );
};

export default RecoverRawMaterialList;
