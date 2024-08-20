// import React from 'react';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

// const settings = {
//   valueFormatter: (v) => `${v}%`,
//   height: 100,
//   showTooltip: true,
//   showHighlight: true,
// };

// const smallValues = [0, 2, 3, 4, 6, 8, 7, 9, 15, 6, 8, 7, 12];
// const largeValues = [60, 65, 66, 68, 87, 82, 83, 89, 92, 75, 76, 77, 91];

// export default function PieChart1() {
//   return (
//     <Stack sx={{ width: '100%' }}>
//       <Typography>Without fixed y-range</Typography>
//       <Stack sx={{ width: '100%', mb: 2 }} direction="row" spacing={2}>
//         <Box sx={{ flexGrow: 1 }}>
//           <SparkLineChart data={smallValues} colors={['red']} {...settings} />
//         </Box>
//         <Box sx={{ flexGrow: 1 }}>
//           <SparkLineChart data={largeValues} {...settings} />
//         </Box>
//       </Stack>
//       <Typography>With y-range fixed to [0, 100]</Typography>
//       <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
//         <Box sx={{ flexGrow: 1 }}>
//           <SparkLineChart
//             data={smallValues}
//             yAxis={{
//               min: 0,
//               max: 100,
//             }}
//             colors={['red']}
//             {...settings}
//           />
//         </Box>
//         <Box sx={{ flexGrow: 1 }}>
//           <SparkLineChart
//             data={largeValues}
//             yAxis={{
//               min: 0,
//               max: 100,
//             }}
//             {...settings}
//           />
//         </Box>
//       </Stack>
//     </Stack>
//   );
// }




import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const PieChart1 = ({ smallValues, largeValues, title }) => {
  const { theme } = useSelector((state) => state.theme);
  const [chartDimensions, setChartDimensions] = useState({ width: '100%', height: 100 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartDimensions({ width: '100%', height: 80 });
      } else if (window.innerWidth < 1024) {
        setChartDimensions({ width: '100%', height: 90 });
      } else {
        setChartDimensions({ width: '100%', height: 100 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const settings = {
    valueFormatter: (v) => `${v}%`,
    height: chartDimensions.height,
    showTooltip: true,
    showHighlight: true,
  };

  return (
    <div className="my-5 w-full p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
        {title}
      </h3>
      <Stack sx={{ width: '100%' }}>
        <Typography>Without fixed y-range</Typography>
        <Stack sx={{ width: '100%', mb: 2 }} direction="row" spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart data={smallValues} colors={['red']} {...settings} />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart data={largeValues} {...settings} />
          </Box>
        </Stack>
        <Typography>With y-range fixed to [0, 100]</Typography>
        <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
              data={smallValues}
              yAxis={{
                min: 0,
                max: 100,
              }}
              colors={['red']}
              {...settings}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <SparkLineChart
              data={largeValues}
              yAxis={{
                min: 0,
                max: 100,
              }}
              {...settings}
            />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default PieChart1;
