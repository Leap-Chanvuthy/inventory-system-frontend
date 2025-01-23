import { Card } from "flowbite-react";
import { MdOutlineAttachMoney } from "react-icons/md";


const FinancailKPICard = ({title , data }) => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-10">
        <div className="bg-green-100 p-2 rounded-full">
          <MdOutlineAttachMoney className="text-green-400" size={30} />
        </div>
        
        <div>
          <p className="font-normal text-lg capitalize text-gray-700 dark:text-gray-400">
            {title}
          </p>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data}
          </h5>
        </div>
      </div>
    </Card>
  );
};

export default FinancailKPICard;
