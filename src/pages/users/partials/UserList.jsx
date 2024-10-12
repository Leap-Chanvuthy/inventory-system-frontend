import { useState } from "react";
import { TextInput, Button, Select, Dropdown, Checkbox } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserTable from "./list/UserTable";
import { data } from "../../../components/charts/chartData";
import PieChart from "../../../components/charts/PieChart";
import UserRoleStat from "./stats/UserRoleStat";

function UserList() {
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    sort: "",
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
      role: "",
      sort: [],
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="my-5 flex flex-col lg:flex-row gap-3 justify-between">
        <form onSubmit={handleSearch} className="flex gap-3">
          <TextInput
            placeholder="Search name, phone number"
            id="search"
            value={filters.search}
            onChange={handleFilterChange}
            rightIcon={IoSearchOutline}
          />
          <Select id="role" value={filters.role} onChange={handleFilterChange}>
            <option value="">Role</option>
            <option value="ADMIN">Admin</option>
            <option value="VENDER">Vender</option>
            <option value="STOCK_CONTROLLER">Stock controller</option>
            <option value="USER">User</option>
          </Select>
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
        </form>
        <Link to="/users/create">
          <Button color="info">Create New</Button>
        </Link>
      </div>

      <UserTable filters={filters} />
    </div>
  );
}

export default UserList;
