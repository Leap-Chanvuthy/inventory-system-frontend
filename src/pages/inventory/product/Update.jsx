import Partial from "../../../components/Partial";
import CreateForm from "./partials/CreateForm";
import UpdateForm from "./partials/UpdateForm";

const Update = () => {
  return (
    <div className="w-full ">
      <Partial title="products" link="update" />
      <UpdateForm />
    </div>
  );
};

export default Update;
