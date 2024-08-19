import { Pagination} from "@mui/material";
import { useState } from "react";

const GlobalPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex items-center flex-col lg:md:flex-row gap-3 justify-between  dark:bg-gray-700 rounded-lg py-2 px-3">
        <div>
          <p className="text-sm hidden lg:md:flex">Showing 1 to 10 of 50 Entities</p>
        </div>
        <Pagination size="medium" color="primary" count={5} showFirstButton showLastButton shape="rounded" />
    </div>
  );
}


export default GlobalPagination;
