// // import React, { useState, useEffect } from 'react';
// // import { BarChart } from '@mui/x-charts/BarChart';
// // import { axisClasses } from '@mui/x-charts/ChartsAxis';
// // import { useSelector } from 'react-redux';
// // import Stack from '@mui/material/Stack';
// // import TextField from '@mui/material/TextField';
// // import MenuItem from '@mui/material/MenuItem';
// // import Typography from '@mui/material/Typography';

// // const BarChartComponent = ({ title, dataset }) => {
// //   const [layout, setLayout] = useState('vertical');
// //   const [chartHeight, setChartHeight] = useState(300);

// //   const { theme } = useSelector((state) => state.theme);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth < 640) {
// //         setChartHeight(200);
// //       } else if (window.innerWidth < 1024) {
// //         setChartHeight(250);
// //       } else {
// //         setChartHeight(300);
// //       }
// //     };

// //     handleResize();
// //     window.addEventListener('resize', handleResize);

// //     return () => {
// //       window.removeEventListener('resize', handleResize);
// //     };
// //   }, []);

// //   // Define chart settings for horizontal layout
// //   const chartSettingsH = {
// //     dataset,
// //     height: chartHeight,
// //     yAxis: [{ scaleType: 'band', dataKey: 'order' }],
// //     sx: {
// //       [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
// //         transform: 'translateX(-10px)',
// //         color: theme === 'dark' ? '#fff' : '#000',
// //       },
// //     },
// //     slotProps: {
// //       legend: {
// //         direction: 'row',
// //         position: { vertical: 'bottom', horizontal: 'middle' },
// //         padding: -5,
// //       },
// //     },
// //   };

// //   // Define chart settings for vertical layout
// //   const chartSettingsV = {
// //     ...chartSettingsH,
// //     xAxis: [{ scaleType: 'band', dataKey: 'order' }],
// //     yAxis: undefined,
// //   };

// //   return (
// //     <div
// //       className={`w-full my-5 p-4 border ${
// //         theme === 'dark' ? 'dark:border-gray-700' : 'light:border-gray-200'
// //       } rounded-lg`}
// //     >
// //       <h3
// //         className={`text-lg font-semibold mb-4 ${
// //           theme === 'dark' ? 'text-white' : 'text-black'
// //         }`}
// //       >
// //         {title}
// //       </h3>
// //       <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
// //         <Stack direction="row" spacing={4}>
// //           <TextField
// //             select
// //             sx={{ minWidth: 150 }}
// //             label="Layout"
// //             value={layout}
// //             onChange={(event) => setLayout(event.target.value)}
// //           >
// //             <MenuItem value="horizontal">Horizontal</MenuItem>
// //             <MenuItem value="vertical">Vertical</MenuItem>
// //           </TextField>
// //         </Stack>
// //         <BarChart
// //           series={[
// //             { dataKey: 'high', label: 'High', layout, stack: 'stack' },
// //             { dataKey: 'low', label: 'Low', layout, stack: 'stack' },
// //           ]}
// //           {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
// //           sx={{

// //             color: theme === 'dark' ? '#fff' : '#000',
// //             '& .MuiTypography-root': {
// //               color: theme === 'dark' ? '#fff' : '#000',
// //             },
// //           }}
// //         />
// //       </Stack>
// //     </div>
// //   );
// // };

// // export default BarChartComponent;



// import React, { useState, useEffect } from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { useSelector } from 'react-redux';
// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';

// const BarChartComponent = ({ title, dataset }) => {
//   const [layout, setLayout] = useState('vertical');
//   const [chartHeight, setChartHeight] = useState(300);

//   const { theme } = useSelector((state) => state.theme);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setChartHeight(200);
//       } else if (window.innerWidth < 1024) {
//         setChartHeight(250);
//       } else {
//         setChartHeight(300);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // Define chart settings for horizontal layout
//   const chartSettingsH = {
//     dataset,
//     height: chartHeight,
//     yAxis: [{ scaleType: 'band', dataKey: 'order' }],
//     sx: {
//       [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
//         transform: 'translateX(-10px)',
//         color: theme === 'dark' ? '#fff' : '#000', // Set color based on theme
//       },
//     },
//     slotProps: {
//       legend: {
//         direction: 'row',
//         position: { vertical: 'bottom', horizontal: 'middle' },
//         padding: -5,
//       },
//     },
//   };

//   // Define chart settings for vertical layout
//   const chartSettingsV = {
//     ...chartSettingsH,
//     xAxis: [{ scaleType: 'band', dataKey: 'order' }],
//     yAxis: undefined,
//   };

//   return (
//     <div
//       className={`w-full my-5 p-4 border ${
//         theme === 'dark' ? 'dark:border-gray-700' : 'light:border-gray-200'
//       } rounded-lg`}
//     >
//       <h3
//         className={`text-lg font-semibold mb-4 ${
//           theme === 'dark' ? 'text-white' : 'text-black'
//         }`}
//       >
//         {title}
//       </h3>
//       <Stack color="primary" direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
//         <Stack direction="row" spacing={4}>
//           <TextField
//             select
//             sx={{ minWidth: 150 }}
//             label="Layout"
//             value={layout}
//             onChange={(event) => setLayout(event.target.value)}
//           >
//             <MenuItem value="horizontal">Horizontal</MenuItem>
//             <MenuItem value="vertical">Vertical</MenuItem>
//           </TextField>
//         </Stack>
//         <BarChart
//           series={[
//             { dataKey: 'high', label: 'High', layout, stack: 'stack' },
//             { dataKey: 'low', label: 'Low', layout, stack: 'stack' },
//           ]}
//           {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
//           sx={{
//             backgroundColor: theme === 'dark' ? '#ff' : '#fff',
//             color: theme === 'dark' ? '#fff' : '#000',
//             '& .MuiTypography-root': {
//               color: theme === 'dark' ? '#fff' : '#000',
//             },
//           }}
//         />
//       </Stack>
//     </div>
//   );
// };

// export default BarChartComponent;


import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';

const BarChartComponent = ({ title, dataset }) => {
  const [chartHeight, setChartHeight] = useState(300);
  
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(200);
      } else if (window.innerWidth < 1024) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`w-full my-5 p-4 border ${
        theme === 'dark' ? 'dark:border-gray-700' : 'light:border-gray-200'
      } rounded-lg`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h3>
      <Stack direction="column" spacing={1} >
        <ResponsiveContainer width="100%" height={chartHeight}>
          <BarChart data={dataset} layout='horizontal'>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="order" stroke={theme === 'dark' ? '#fff' : '#000'} />
            <YAxis stroke={theme === 'dark' ? '#fff' : '#000'} />
            <Tooltip />
            <Legend />
            <Bar dataKey="high" fill={theme === 'dark' ? '#ff7300' : '#82ca9d'} />
            <Bar dataKey="low" fill={theme === 'dark' ? '#387908' : '#8884d8'} />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </div>
  );
};

export default BarChartComponent;
