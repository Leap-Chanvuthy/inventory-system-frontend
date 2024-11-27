import { useState , useEffect } from "react";
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
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import ProductTable from "./list/ProductTable";

const RawMaterialList = () => {
  const [filters, setFilters] = useState({
    query: "",
    category_id: "",
    status: "",
    sort: [],
  });


    // // get raw material category
    const [categories , setCategories] = useState([]);
    console.log(categories)
  
    useEffect(() =>{
      const getCategory = async (e) =>{
        try {
          
          const response = await axios.get(`${BASE_URL}/product-categories/all`)
          console.log(response.data);
          setCategories(response.data);
        }catch (err){
          console.log(err);
        }
      }
      getCategory();
    } , [])


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
                    id="product_code"
                    onChange={handleSortChange}
                    checked={filters.sort.includes("product_code")}
                  />
                  <label htmlFor="product_code">Product Code</label>
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
                      htmlFor="category_id"
                      value="Category"
                    />
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

            <div className="flex gap-3 items-center">
              {/* <RawMaterialExport /> */}
              <Link to='/products/recover'>
                <Tooltip content="Recover">
                  <Button color="success" className="flex justify-center items-center">
                    <TbRestore className="text-xl" />{" "}
                  </Button>
                </Tooltip>
              </Link>
            </div>

            
          </form>
          <div className="flex gap-3 items-center">
            <Link to="/products/create">
              <Button color="info">Create New</Button>
            </Link>
          </div>
        </div>
      </div>

      <ProductTable filters={filters} />
    </div>
  );
};

export default RawMaterialList;
