import ProductList from "./partials/ProductList";
import Partial from "../../../components/Partial";
import PieChart from "../../../components/charts/PieChart";
import { data } from "../../../components/charts/chartData";

const Product = () => {
  return (
    <div className="">
      <Partial title="product" link="list" />
      <div className="my-5">
        <ProductList />
      </div>
      <div className="flex flex-col lg:md:flex-row gap-5">
        <PieChart data={data} title="Product Category" />
      </div>
    </div>
  );
};

export default Product;
