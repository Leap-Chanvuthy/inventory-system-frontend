// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
// } from 'chart.js';
// import { useSelector } from 'react-redux';

// ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

// const BarChartComponent = ({ title }) => {
//   const [chartDimensions, setChartDimensions] = useState({ width: 500, height: 300 });

//   // Get the theme from Redux store
//   const { theme } = useSelector((state) => state.theme);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setChartDimensions({ width: 300, height: 200 });
//       } else if (window.innerWidth < 1024) {
//         setChartDimensions({ width: 400, height: 250 });
//       } else {
//         setChartDimensions({ width: 500, height: 300 });
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // Function to determine bar colors based on value
//   const getBarColors = (data) => {
//     return data.map(value => {
//       if (value < 10) return theme === 'dark' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.2)';
//       if (value < 20) return theme === 'dark' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0.2)';
//       return theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)';
//     });
//   };

//   const data = {
//     labels: ['User', 'Supplier', 'Customer'],
//     datasets: [
//       {
//         label: 'Count',
//         data: [10, 15, 20], // Replace with your data
//         backgroundColor: getBarColors([10, 15, 20]), // Apply colors
//         borderColor: getBarColors([10, 15, 20]).map(color => color.replace('0.2', '1')), // Change transparency for border
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//         labels: {
//           color: theme === 'dark' ? '#fff' : '#000',
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             return tooltipItem.label + ': ' + tooltipItem.raw;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: theme === 'dark' ? '#444' : '#ddd',
//         },
//       },
//       y: {
//         grid: {
//           color: theme === 'dark' ? '#444' : '#ddd',
//         },
//       },
//     },
//   };

//   return (
//     <div className="my-5 p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
//       <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'dark:text-white' : 'text-black'}`}>
//         {title}
//       </h3>
//       <div className="relative h-64 w-full">
//         <Bar data={data} options={options} width={chartDimensions.width} height={chartDimensions.height} />
//       </div>
//     </div>
//   );
// };

// export default BarChartComponent;



import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const BarChartComponent = ({ title }) => {
  const [layout, setLayout] = useState('vertical');
  const [radius, setRadius] = useState(10);
  const [chartHeight, setChartHeight] = useState(300);

  // Get the theme from Redux store
  const { theme } = useSelector((state) => state.theme);

  // Responsive handling for chart height
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

  const dataset = [
    { high: 10, low: 0, order: 'User' },
    { high: 15, low: 0, order: 'Supplier' },
    { high: 20, low: 0, order: 'Customer' },
  ];

  const chartSettingsH = {
    dataset,
    height: chartHeight,
    yAxis: [{ scaleType: 'band', dataKey: 'order' }],
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
        color: theme === 'dark' ? '#fff' : '#000',
      },
    },
    slotProps: {
      legend: {
        direction: 'row',
        position: { vertical: 'bottom', horizontal: 'middle' },
        padding: -5,
      },
    },
  };

  const chartSettingsV = {
    ...chartSettingsH,
    xAxis: [{ scaleType: 'band', dataKey: 'order' }],
    yAxis: undefined,
  };

  return (
    <div className="w-full my-5 p-4 border dark:border-gray-700 light:border-gray-200 rounded-lg">
      <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {title}
      </h3>
      <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
        <Stack direction="row" spacing={4}>
          <Stack direction="column" spacing={1} flex={1}>
            <Typography gutterBottom>Border Radius</Typography>
            <Slider
              value={radius}
              onChange={(e, v) => setRadius(v)}
              valueLabelDisplay="auto"
              min={0}
              max={50}
              sx={{ mt: 2 }}
            />
          </Stack>
          <TextField
            select
            sx={{ minWidth: 150 }}
            label="Layout"
            value={layout}
            onChange={(event) => setLayout(event.target.value)}
          >
            <MenuItem value="horizontal">Horizontal</MenuItem>
            <MenuItem value="vertical">Vertical</MenuItem>
          </TextField>
        </Stack>
        <BarChart
          series={[
            { dataKey: 'high', label: 'High', layout, stack: 'stack' },
            { dataKey: 'low', label: 'Low', layout, stack: 'stack' },
          ]}
          {...(layout === 'vertical' ? chartSettingsV : chartSettingsH)}
          borderRadius={radius}
        />
      </Stack>
    </div>
  );
};

export default BarChartComponent;
