import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";

const Create = () => {
    return ( 
        <div className="">
        <Partial title="Purchase Invoice" link="create" />
        <div className="my-5">
          <CreateForm />
        </div>
  
      </div>
     );
}
 
export default Create;