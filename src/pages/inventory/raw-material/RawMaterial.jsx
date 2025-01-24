import { Tabs } from "flowbite-react";
import Partial from "../../../components/Partial";
import PieChart from "../../../components/charts/PieChart";
import { data } from "../../../components/charts/chartData";
import RawMaterialList from "./partials/RawMaterialList";
import { IoMdSettings } from "react-icons/io";
import Create from "./partials/raw-material-scrap/Create";
import RawMaterialScrapList from "./partials/RawMaterialScrapList";
import { IoCartOutline } from "react-icons/io5";
import TopValuedRawMaterials from "../../../components/charts/raw-meterial/TopValuedRawMaterials";
import RawMaterialByCategory from "../../../components/charts/raw-meterial/RawMaterialByCategory";
import RawMaterialCount from "../../../components/charts/raw-meterial/RawMaterialCount";
import RawMaterialByStatus from "../../../components/charts/raw-meterial/RawMaterialByStatus";

const RawMaterial = () => {
  return (
    <div className="">
      <Partial title="raw materials" link="list" />
      <div className="flex flex-col gap-5 my-5">
        <Tabs aria-label="Tabs with icons" className="my-5" variant="underline">
          <Tabs.Item active title="Raw Materials" icon={IoCartOutline}>
            <div class="mb-10">
              <RawMaterialCount />
            </div>
            <RawMaterialList />
            <div className="grid grid-cols-1 lg:md:grid-cols-2 gap-5 my-5">
              <TopValuedRawMaterials />
              <RawMaterialByCategory />
              <RawMaterialByStatus />
            </div>
          </Tabs.Item>
          <Tabs.Item title="Raw Materials Scrap" icon={IoMdSettings}>
            <RawMaterialScrapList />
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default RawMaterial;
