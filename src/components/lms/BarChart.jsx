import React from 'react';
import Chart from 'react-apexcharts';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

const BarChart = () => {
  const series = [{
    name: 'Lectures',
    data: [7, 4, 8, 5, 5, 6, 3]
  }];
  //create x-axis labels based on current date (current week last monday to next sunday) on the format 'Mon\n25'
  const today=new Date();
  let days=[];
  for(let i=0;i<7;i++){
    let nextDay=new Date(today);
    nextDay.setDate(today.getDate()-today.getDay()+i);
    days.push(nextDay.toLocaleString('default',{weekday:'short'})+'\n'+nextDay.getDate());
  }

  const options = {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded' ,
        states: {
          hover: {
           fill:{
            colors: ['#207EB8'] 
           }
          }
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: days,
      labels: {
        rotate: -45,
        style: {
          colors: ['#4B4B4D'], 
          fontWeight:'bold',
          fontSize: '12px'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      title: {
        style: {
          color: '#4B4B4D' 
        }
      },
      tickAmount: 6, 
      labels: {
        formatter: (val) => `${val} lec`,
        style: {
          colors: ['#4B4B4D'] 
        }
      },
    },
    colors: ['#1976D2'], 
    fill: {
      colors: ['#CEECFD'] 
    },
    grid: {
      borderColor: '#ddd' 
    }
  };

  return (
    <Box sx={{ bgcolor: 'white', px: '2rem', my: '2rem', cursor: 'pointer'}}>
      <Typography variant='h4' sx={{ color: '#4B4B4D', fontWeight: 'bold', marginBottom: '1rem' }}>Lessons Completed</Typography>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </Box>
  );
}

export default BarChart;
