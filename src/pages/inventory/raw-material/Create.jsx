import GlobalPagination from "../../../components/Pagination";
import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";

const Create = () => {
  return (
    <div className="w-full ">
      <Partial title="raw materials" link="create" />
      <CreateForm />
    </div>
  );
};

export default Create;
