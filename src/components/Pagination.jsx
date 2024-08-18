// import * as React from 'react';
// import Pagination from '@mui/material/Pagination';

// function GlobalPagination() {
//   return (
//       <div className='flex overflow-x-auto justify-center'>
//           <Pagination className='text-rose-600' color='secondary' shape='rounded' size='medium' count={10} showFirstButton showLastButton />
//       </div>
//   );
// }
// export default GlobalPagination;



import { Pagination } from "flowbite-react";
import { useState } from "react";

const GlobalPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} showIcons />
    </div>
  );
}


export default GlobalPagination;
