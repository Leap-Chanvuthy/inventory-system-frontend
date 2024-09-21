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

  // Define chart settings for horizontal layout
  const chartSettingsH = {
    dataset,
    height: chartHeight,
    yAxis: [{ scaleType: 'band', dataKey: 'order' }],
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: 'translateX(-10px)',
        color: theme === 'dark' ? '#fff' : '#000', // Dynamic label color based on theme
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

  // Define chart settings for vertical layout
  const chartSettingsV = {
    ...chartSettingsH,
    xAxis: [{ scaleType: 'band', dataKey: 'order' }],
    yAxis: undefined,
  };

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
          sx={{
            // Apply dynamic background color based on the theme
            backgroundColor: theme === 'dark' ? '#2e2e2e' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            '& .MuiTypography-root': {
              color: theme === 'dark' ? '#fff' : '#000',
            },
          }}
        />
      </Stack>
    </div>
  );
};

export default BarChartComponent;
