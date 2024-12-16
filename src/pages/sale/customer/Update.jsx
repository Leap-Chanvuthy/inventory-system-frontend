import Partial from "../../../components/Partial";
import UpdateForm from "./partials/UpdateForm";

const Update = () => {
  return (
    <div className="w-full ">
      <Partial title="customer" link="update" />
      <UpdateForm />
    </div>
  );
};

export default Update;
