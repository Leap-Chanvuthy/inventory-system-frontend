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
import axios from "axios";
import { BASE_URL } from "../../../../components/const/constant";
import CategoryTable from "./list/CategoryTable";
import Create from "./category/Create";
import Partial from "../../../../components/Partial";

const CategoryList = () => {
  const [filters, setFilters] = useState({
    query: "",
    category_id: "",
    sort: [],
  });


    // get product category
    const [categories , setCategories] = useState([]);  
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
        <Partial title="Product Categories" link="list" />
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
            {/* Refresh data */}
            
            <div className="flex gap-3 items-center">
                <Tooltip content="Refresh">
                  <Button color='success' onClick={resetFilters}>Refresh</Button>
                </Tooltip>
            </div>

          </form>
          <div className="flex gap-3 items-center">
            <Create />
          </div>
        </div>
      </div>
                        
      <CategoryTable filters={filters} />
    </div>
  );
};

export default CategoryList;