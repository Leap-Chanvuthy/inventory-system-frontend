import Partial from "../../../components/Partial";
import UpdateForm from "./partials/UpdateForm";


const Update = () => {
  return (
    <div className="w-full ">
      <Partial title="sale order" link="update" />
      <UpdateForm />
    </div>
  );
};

export default Update;
