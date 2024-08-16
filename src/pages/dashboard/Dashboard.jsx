import Partial from "../../components/Partial";
import RecentOrder from "./partials/RecentOrder";
import Summary from "./partials/Summary";

const Dashboard = () => {


  return (
    <div className="w-full">
      <Partial title="dashboard" link="home" />
      <Summary />
      {/* <RecentOrder/> */}
    </div>
  );
};

export default Dashboard;
