import { useState, useEffect } from "react";
import {
  TextInput,
  Button,
  Checkbox,
  Dropdown,
  Select,
  Label,
  Tooltip,
  Alert,
  Modal,
} from "flowbite-react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../components/const/constant";
import { TbRestore } from "react-icons/tb";
import { FaPlus, FaUserTie } from "react-icons/fa6";
import CustomerRelationshipTable from "./table/CustomerRelationshipTable";

const CustomerRelationship = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
    sort: [],
  });

  // get customer category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async (e) => {
      try {
        const response = await axios.get(`${BASE_URL}/customer-categories/all`);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

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
        <Alert color="success" className="w-full" icon={FaUserTie}>
          <span className="font-bold">Select Customer</span>
        </Alert>
        <Tooltip content="Click to select customer">
          <Button onClick={() => setOpenModal(true)} color="gray">
            <div className="flex items-center gap-1">
              <FaPlus className="font-bold text-lg text-gray-600" />
            </div>
          </Button>
        </Tooltip>
      </div>
      <Modal size="6xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <span className="font-bold">Customer</span>
        </Modal.Header>
        <Modal.Body>
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
                              <option value="ACTIVE">Active</option>
                              <option value="INACTIVE">Inactive</option>
                              <option value="SUSPENDED">Suspended</option>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="category" value="Category" />
                            <Select
                              id="category"
                              placeholder="Choose category"
                              value={filters.category}
                              onChange={handleFilterChange}
                            >
                              <option value="">Select an option</option>
                              {categories &&
                                categories.map((category) => (
                                  <option value={category.id}>
                                    {category.category_name}
                                  </option>
                                ))}
                            </Select>
                          </div>
                        </div>
                      </div>
                    </Dropdown>
                  </form>
                </div>
              </div>
            </div>
            <CustomerRelationshipTable filters={filters} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomerRelationship;
