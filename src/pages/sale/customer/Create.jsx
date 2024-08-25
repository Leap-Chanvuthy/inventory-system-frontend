import GlobalPagination from "../../components/Pagination";
import Partial from "../../components/Partial";
import CreateForm from "./partials/CreateForm";

const Create = () => {
  return (
    <div className="w-full ">
      <Partial title="customer" link="create" />
      <CreateForm />
    </div>
  );
};

export default Create;
