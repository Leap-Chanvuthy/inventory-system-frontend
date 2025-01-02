import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";


const Create = () => {
  return (
    <div className="w-full ">
      <Partial title="sale order" link="create" />
      <CreateForm />
    </div>
  );
};

export default Create;
