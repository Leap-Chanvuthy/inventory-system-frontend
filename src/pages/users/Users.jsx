import Partial from "../../components/Partial";
import UserRoleStat from "./partials/stats/UserRoleStat";
import UserList from "./partials/UserList";

const Users = () => {
    return ( 
        <div className="w-full ">
        <Partial title="users" link="list" />
        <UserRoleStat />
        <UserList />
      </div>
     );
}
 
export default Users;