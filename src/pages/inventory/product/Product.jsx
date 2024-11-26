import ProductList from "./partials/ProductList";
import Partial from "../../../components/Partial";

const Product = () => {
  return (
    <div className="">
      <Partial title="products" link="list" />
      <div className="my-5">
        <ProductList />
      </div>
    </div>
  );
};

export default Product;
