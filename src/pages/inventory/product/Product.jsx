import ProductList from "./partials/ProductList";
import Partial from "../../../components/Partial";
import { Tabs } from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import ProductScrapList from "./partials/ProductScrapList";
import ProductByCategory from "../../../components/charts/product/ProductByCategory";
import ProductByStatus from "../../../components/charts/product/ProductByStatus";
import TopValuedProducts from "../../../components/charts/product/TopValuedProducts";
import ProductCount from "../../../components/charts/product/ProductCount";

const Product = () => {
  return (
    <div className="">
      <Partial title="products" link="list" />
      <div className="flex flex-col gap-5 my-5">
        <Tabs  aria-label="Tabs with icons"  className="my-5" variant="underline" >
          <Tabs.Item active title="Products" icon={IoCartOutline}>
            <div className="mb-10">
              <ProductCount />
            </div>
            <ProductList />
            <div className="grid grid-cols-1 lg:md:grid-cols-2 gap-5 my-5">
              <TopValuedProducts />
              <ProductByCategory />
              <ProductByStatus />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Products Scrap" icon={IoMdSettings}>
             <ProductScrapList />
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default Product;
