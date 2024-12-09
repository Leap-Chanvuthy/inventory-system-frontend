import Partial from "../../../components/Partial";
import RecoverProductList from "./partials/RecoverProductList";

const RecoverProduct = () => {
  return (
    <div className="">
      <Partial title="product" link="recover" />
      <div className="my-5">
        <RecoverProductList />
      </div>
    </div>
  );
};

export default RecoverProduct;
