import Partial from "../../components/Partial";
import CreateForm from "./partials/CreateForm";


const Create = () => {
    return ( 
        <div className="w-full ">
            <Partial title="users" link="create" />
            <CreateForm />
      </div>
     );
}
 
export default Create;