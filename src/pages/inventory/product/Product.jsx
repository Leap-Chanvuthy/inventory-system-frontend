import ProductList from "./partials/ProductList";
import Partial from "../../../components/Partial";
import CategoryList from "./partials/CategoryList";

const Product = () => {
  return (
    <div className="">
      <Partial title="products" link="list" />
      <div className="my-5">
        <ProductList />
        <CategoryList />
      </div>
    </div>
  );
};

export default Product;
