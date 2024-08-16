import Chart from "../../components/charts/Chart";
import Partial from "../../components/Partial";
import RecentOrder from "./partials/RecentOrder";
import Summary from "./partials/Summary";

const Dashboard = () => {


  return (
    <div className="w-full">
      <Partial title="dashboard" link="home" />
      <Summary />
      <div className="flex flex-col lg:md:flex-row items-center gap-3">
        <Chart />
      </div>
      <RecentOrder />
    </div>
  );
};

export default Dashboard;
