import { useState } from "react";
import NonFinancailKPICard from "../../../components/NonFinancialKPICard";
import FinancailKPICard from "../../../components/FinancailKPICard";

const Summary = () => {
  const [seeMore, setSeeMore] = useState(false);
  const toggle = () => {
    setSeeMore(!seeMore);
  };
  return (
    <div className="my-5">
      <div className="flex flex-col lg:md:flex-row gap-5 my-5">
        <FinancailKPICard title="current stock value" data={23455688} />
        <FinancailKPICard title="no. of Product" data={200} />
        <FinancailKPICard title="total Revenue" data={93455688} />
        <FinancailKPICard title="total Expense" data={5688} />
      </div>
      {seeMore ? (
        <div>
          <div className="flex flex-col lg:md:flex-row gap-5 my-5">
            <NonFinancailKPICard title="no. of raw meterials" data={50} />
            <NonFinancailKPICard title="no. of work in progress" data={50} />
            <NonFinancailKPICard title="no. of packaging" data={50} />
            <NonFinancailKPICard title="no. of finised goods" data={50} />
          </div>
          <div className="flex flex-col lg:md:flex-row gap-5 my-5">
            <NonFinancailKPICard title="no. of supplier" data={20} />
            <NonFinancailKPICard title="no. of customer" data={1000} />
            <NonFinancailKPICard title="no. of user" data={10} />
            <NonFinancailKPICard title="no. of invoice" data={1000} />
          </div>
        </div>
      ) : (
        <p className="text-center cursor-pointer" onClick={toggle}>
          See more
        </p>
      )}
    </div>
  );
};

export default Summary;
