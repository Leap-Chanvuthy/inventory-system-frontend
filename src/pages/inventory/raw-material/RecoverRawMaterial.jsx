import Partial from "../../../components/Partial";
import RecoverRawMaterialList from "./partials/RecoverRawMaterialList";

const RecoverRawMaterial = () => {
  return (
    <div className="">
      <Partial title="raw materials" link="recover" />
      <div className="my-5">
        <RecoverRawMaterialList />
      </div>
    </div>
  );
};

export default RecoverRawMaterial;
