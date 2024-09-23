import Partial from "../../components/Partial";
import UpdateForm from "./partials/UpdateForm";

const Update = () => {
    return ( 

        <div>
            <Partial title="user" link="update" />
            <UpdateForm />

        </div>
     );
}
 
export default Update;