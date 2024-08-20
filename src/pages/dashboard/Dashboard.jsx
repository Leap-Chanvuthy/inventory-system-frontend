import Chart from "../../components/charts/Chart";
import PieChart from "../../components/charts/PieChart";
import Partial from "../../components/Partial";
import RecentOrder from "./partials/RecentOrder";
import Summary from "./partials/Summary";
import { data , largeValues , smallValues } from "../../components/charts/chartData";
import BarCharts from "../../components/charts/BarChart";
import PieChart1 from "../../components/charts/PieChart1";

const Dashboard = () => {

  return (
    <div className="w-full">
      <Partial title="dashboard" link="home" />
      <Summary />
      <div className="flex flex-col lg:md:flex-row gap-5">
        <Chart />
        <PieChart data={data} title='Product Category' />
      </div>
      <RecentOrder />
      <div className="flex flex-col lg:md:flex-row gap-3">
        <BarCharts />
        <PieChart1 smallValues={smallValues} largeValues={largeValues} title='Sale Performance' />
      </div>

    </div>
  );
};

export default Dashboard;
