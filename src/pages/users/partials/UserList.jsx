import { useState } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import UserTable from "./list/UserTable";
import {data} from '../../../components/charts/chartData';
import PieChart from "../../../components/charts/PieChart";

function UserList() {

  const [filters , setFilters] = useState({
    search : "",
    role : ""
  })

  const handleFilterChange = (e) =>{
    const {id , value} = e.target;
    setFilters({...filters , [id] : value});
  }

  const handleSearch = (e) => {
    e.preventDefault();
  }


  return (
    <div>
      <div className="my-5 flex flex-col lg:flex-row gap-3 justify-between">
        <form onSubmit={handleSearch}  className="flex gap-3">
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
            <option value="VENDOR">Stock Controller</option>
            <option value="USER">User</option>
          </Select>
        </form>
        <Link to="/users/create">
          <Button color="info">Create New</Button>
        </Link>
      </div>

      <UserTable filters={filters} />

      <PieChart title="User Role" data={data} />

    </div>
  );
}

export default UserList;
