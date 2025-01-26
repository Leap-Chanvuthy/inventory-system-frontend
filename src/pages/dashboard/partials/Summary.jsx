import { useState } from "react";
import NonFinancailKPICard from "../../../components/NonFinancialKPICard";
import FinancailKPICard from "../../../components/FinancailKPICard";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import RawMaterialCount from "../../../components/charts/raw-meterial/RawMaterialCount";
import TopValuedRawMaterials from "../../../components/charts/raw-meterial/TopValuedRawMaterials";
import ProductCount from "../../../components/charts/product/ProductCount";
import TopValuedProduct from "../../../components/charts/product/TopValuedProducts";
import TopSupplier from "../../../components/charts/supplier/TopSupplier";
import TotalExpense from "../../../components/charts/kpi/TotalExpense";
import TotalIncome from "../../../components/charts/kpi/TotalIncome";
import TotalInvoice from "../../../components/charts/kpi/TotalInvoice";

const Summary = () => {
  const [seeMore, setSeeMore] = useState(false);
  const toggle = () => {
    setSeeMore(!seeMore);
  };
  return (
    <div className="my-5">
      <div className="flex flex-col gap-5">
        <div className="">
          <RawMaterialCount />
          <ProductCount />
          <TotalExpense />
          <TotalIncome />
          <TotalInvoice />
        </div>
        <div className="grid grid-cols-1 lg:md:grid-cols-2 gap-5">
          <TopSupplier />
          <TopValuedRawMaterials />
          <TopValuedProduct />
        </div>
      </div>
      {seeMore ? (
        <div>
          <div className="flex flex-col lg:md:flex-row gap-5 my-5">
            <NonFinancailKPICard title="no. of suppliers" data={20} />
            {/* <NonFinancailKPICard title="no. of raw materials" data={1000} /> */}
            <NonFinancailKPICard title="no. of customers" data={1000} />
            <NonFinancailKPICard title="no. of user" data={10} />
            <NonFinancailKPICard title="no. of invoice" data={1000} />
          </div>
          <p
            className="text-center cursor-pointer flex items-center gap-3 justify-center"
            onClick={toggle}
          >
            See less
            <IoIosArrowUp />
          </p>
        </div>
      ) : (
        <p
          className="text-center cursor-pointer flex items-center gap-3 justify-center"
          onClick={toggle}
        >
          See more
          <IoIosArrowDown />
        </p>
      )}
    </div>
  );
};

export default Summary;
