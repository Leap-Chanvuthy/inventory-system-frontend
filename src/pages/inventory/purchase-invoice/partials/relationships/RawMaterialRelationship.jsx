import { useState } from "react";
import {
  TextInput,
  Select,
  Dropdown,
  Checkbox,
  Label,
  Button,
  Alert,
  Tooltip,
  Modal,
} from "flowbite-react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import RawMaterialRelationshipTable from "./table/RawMaterialRelationshipTable";
import { FaPlus } from "react-icons/fa6";

const RawMaterialRelationship = ({ createStatus }) => {
  const [openModal, setOpenModal] = useState(false);
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
      <div className="flex justify-between items-center gap-3">
        <Alert color="success" className="w-full" icon={IoCartOutline}>
          <span className="font-bold">
            Select raw materials to generate purchase invoice.
          </span>
        </Alert>
        <Tooltip content="Click to add products to cart">
          <Button onClick={() => setOpenModal(true)} color="gray">
            <div className="flex items-center gap-1">
              <FaPlus className="font-bold text-lg text-gray-600" />
            </div>
          </Button>
        </Tooltip>
      </div>
      <Modal size="6xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <span className="font-bold">Raw Materials</span>
        </Modal.Header>
        <Modal.Body>
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
                {/* Sorting and filtering controls */}
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

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="supplier_name"
                        onChange={handleSortChange}
                        checked={filters.sort.includes("supplier_name")}
                      />
                      <label htmlFor="supplier_name">Supplier</label>
                    </div>
                  </div>
                </Dropdown>

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

              <div className="flex gap-2">
                <Button color="success" onClick={() => setOpenModal(false)}>
                  Add Items
                </Button>
              </div>
            </div>

            <RawMaterialRelationshipTable
              filters={filters}
              createStatus={createStatus}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RawMaterialRelationship;
