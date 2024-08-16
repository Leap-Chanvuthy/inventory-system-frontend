import Partial from "../../components/Partial";
import UserList from "./partials/UserList";

const Users = () => {
    return ( 
        <div className="w-full ">
        <Partial title="users" link="list" />
        <UserList />
      </div>
     );
}
 
export default Users;