import ProductList from "./partials/ProductList";
import Partial from "../../../components/Partial";
import { Tabs } from "flowbite-react";
import { IoCartOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import ProductScrapList from "./partials/ProductScrapList";

const Product = () => {
  return (
    <div className="">
      <Partial title="products" link="list" />
      <div className="flex flex-col gap-5 my-5">
        <Tabs  aria-label="Tabs with icons"  className="my-5" variant="underline" >
          <Tabs.Item active title="Products" icon={IoCartOutline}>
            <div className="my-5">
              <ProductList />
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
