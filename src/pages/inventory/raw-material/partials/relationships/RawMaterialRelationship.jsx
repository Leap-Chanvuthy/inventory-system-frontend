import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextInput,
  Select,
  Dropdown,
  Checkbox,
  Label,
  Button,
  Modal,
} from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import RawMaterialRelationshipTable from "./table/RawMaterialRelationshipTable";
import { FaPlus } from "react-icons/fa";
import { BASE_URL } from "../../../../../components/const/constant";
import { useDispatch, useSelector } from "react-redux";
import { resetSingleSelectionState } from "../../../../../redux/slices/selectionSlice";
import { removeMaterialFromCart } from "../../../../../redux/slices/rawMaterialSlice";

const RawMaterialRelationship = ({ createStatus }) => {
  const dispatch = useDispatch();
  const { singleSelection } = useSelector((state) => state.selections);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    category_id: "",
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
      category_id: "",
      sort: [],
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // clear selections state
  const clearSingleSelection = () => {
    dispatch(resetSingleSelectionState());
    dispatch(removeMaterialFromCart());
  };

  // get raw material category
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategory = async (e) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/non-paginate/raw-material-categories`
        );
        // console.log(response.data);
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  return (
    <div>
      <Button onClick={() => setOpenModal(true)} color='gray'>
        <div className="flex items-center gap-1">
          <FaPlus />
          {/* Raw Materials */}
        </div>
      </Button>
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
                        <Label htmlFor="category_id" value="Category" />
                        <Select
                          id="category_id"
                          placeholder="Choose category"
                          value={filters.category_id}
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
              <div className="flex gap-2">
                {singleSelection ? (
                  <Button color="failure" onClick={clearSingleSelection}>
                    Unselect
                  </Button>
                ) : (
                  <></>
                )}
                <Button color="success" onClick={() => setOpenModal(false)}>
                  Add Item
                </Button>
              </div>
            </div>

            <RawMaterialRelationshipTable
              filters={filters}
              setOpenModal={setOpenModal}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RawMaterialRelationship;
