// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

// function Chart() {
//   return (
//     <div className='my-5 p-4 border border-gray-300 rounded-lg'>
//       <h3 className="text-lg font-semibold mb-3">Sales Over Time</h3>
//       <LineChart
//         xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//         series={[
//           {
//             data: [2, 5.5, 2, 8.5, 1.5, 5],
//           },
//         ]}
//         width={300}
//         height={300}
//       />
//     </div>
//   );
// }


// export default Chart;


import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

function Chart() {
  const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartDimensions({ width: 300, height: 200 }); // For small screens
      } else if (window.innerWidth < 1024) {
        setChartDimensions({ width: 400, height: 250 }); // For medium screens
      } else {
        setChartDimensions({ width: 500, height: 300 }); // For large screens
      }
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize); // Adjust on resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="my-5 p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Sales Over Time</h3>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={chartDimensions.width}
        height={chartDimensions.height}
      />
    </div>
  );
}

export default Chart;
