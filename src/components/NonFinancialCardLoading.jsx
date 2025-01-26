import { Card } from "flowbite-react";
import { Skeleton } from "@mui/material";
import { HiArrowCircleUp } from "react-icons/hi";

const NonFinancialCardLoading = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-10">
      <div className="bg-yellow-100 p-2 rounded-full">
          <HiArrowCircleUp className="text-yellow-400" size={30} />
        </div>
        <div>
          <Skeleton variant="text" width={100} height={30} className="bg-gray-300 dark:bg-gray-700" />
          <Skeleton variant="text" width={150} height={40} className="bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </Card>
  );
};

export default NonFinancialCardLoading;