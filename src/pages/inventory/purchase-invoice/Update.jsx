import Partial from "../../../components/Partial";
import UpdateForm from "./partials/UpdateForm";

const Update = () => {
    return ( 
        <div className="">
        <Partial title="Purchase Invoice" link="update" />
        <div className="my-5">
          <UpdateForm />
        </div>
      </div>
     );
}
 
export default Update;