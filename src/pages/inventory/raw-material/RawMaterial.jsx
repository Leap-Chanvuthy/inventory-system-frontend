import Partial from "../../../components/Partial";
import PieChart from "../../../components/charts/PieChart";
import { data } from "../../../components/charts/chartData";
import CategoryList from "./partials/CategoryList";
import RawMaterialList from "./partials/RawMaterialList";

const RawMaterial = () => {
  return (
    <div className="">
      <Partial title="raw materials" link="list" />
      <div className="flex flex-col gap-5 my-5">
        <RawMaterialList />
        <CategoryList />
      </div>
      <div className="flex flex-col lg:md:flex-row gap-5">
        <PieChart data={data} title="Category" />
      </div>
    </div>
  );
};

export default RawMaterial;
