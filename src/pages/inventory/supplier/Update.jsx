import Partial from "../../../components/Partial";
import UpdateForm from "./partials/UpdateForm";

const Update = () => {
    return ( 

        <div>
            <Partial title="supplier" link="update" />
            <div className="my-5">
                <UpdateForm />
            </div>

        </div>
     );
}
 
export default Update;