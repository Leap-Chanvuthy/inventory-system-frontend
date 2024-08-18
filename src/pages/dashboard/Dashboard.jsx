import Chart from "../../components/charts/Chart";
import PieChart from "../../components/charts/PieChart";
import Partial from "../../components/Partial";
import RecentOrder from "./partials/RecentOrder";
import Summary from "./partials/Summary";
import { data } from "../../components/charts/chartData";

const Dashboard = () => {

  return (
    <div className="w-full">
      <Partial title="dashboard" link="home" />
      <Summary />
      <div className="flex flex-col lg:md:flex-row gap-3">
        <Chart />
        <PieChart data={data} title='Product Category' />
      </div>
      <RecentOrder />
    </div>
  );
};

export default Dashboard;
