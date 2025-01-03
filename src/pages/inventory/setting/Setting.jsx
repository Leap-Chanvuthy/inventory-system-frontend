import { Tabs } from "flowbite-react";
import RawMaterialCategoryList from "../raw-material/partials/CategoryList";
import ProductCategoryList from "../product/partials/CategoryList";
import CustomerCategoryList from "../../sale/customer/partials/CategoryList";
import Partial from "../../../components/Partial";
import { IoMdSettings } from "react-icons/io";

const Setting = () => {
    return ( 
        <div className="w-full ">
        <Partial title="settings" link="list" />
  
        <Tabs  aria-label="Tabs with icons"  className="my-5" variant="underline" >
          <Tabs.Item active title="Raw Material Category" icon={IoMdSettings}>
              <RawMaterialCategoryList />
          </Tabs.Item>
          <Tabs.Item title="Product Category" icon={IoMdSettings}>
             <ProductCategoryList />
          </Tabs.Item>
          <Tabs.Item title="Customer Category" icon={IoMdSettings}>
            <CustomerCategoryList />
          </Tabs.Item>
        </Tabs>
      </div>
     );
}
 
export default Setting;