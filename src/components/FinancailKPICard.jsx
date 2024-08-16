import { Card } from "flowbite-react";

const FinancailKPICard = ({title , data}) => {
  return (
    <Card className="w-full">
      <p className="font-normal text-lg capitalize text-gray-700 dark:text-gray-400">
        {title}
      </p>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        $ {data}
      </h5>
    </Card>
  );
};

export default FinancailKPICard;
