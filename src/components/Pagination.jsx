import * as React from 'react';
import Pagination from '@mui/material/Pagination';

function GlobalPagination() {
  return (
      <div className='w-full flex justify-end'>
          <Pagination count={5} variant="outlined" shape="rounded" color='primary'  />
      </div>
  );
}


export default GlobalPagination;