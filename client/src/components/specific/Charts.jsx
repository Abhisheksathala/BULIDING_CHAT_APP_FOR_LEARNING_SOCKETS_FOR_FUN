import React from 'react';
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Title
} from "chart.js"
import { getLast7days } from '../lib/features';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
  Title
);

const lables = getLast7days()


  const options = {
    responsive: true,
   plugins: {
      legend: {
        display:false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Monthly Sales Data'
      }
    },
    scales: {
      // y: {
      //   beginAtZero: true,
      //   title: {
      //     display: true,
      //     text: 'Sales ($)'
      //   }
      // }
      x:{
        grid:{ 
          display:false
        }
      },
      y:{
          beginAtZero:true,
        grid:{
          display:false
        }
      }
    }
  };

const Linechart = ({Value=[],labels=[]}) => {
  const data = {
    labels: lables,
    datasets: [
      {
        data:[1,2,34,4,32,56,20],
        label:"Revenue",
        fill:false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor:"rgba(75,192,192,1)"
      },
      // {
      //   data:[1,22,3,41,22,46,20],
      //   label:"Revenue 2",
      //   fill:false,
      //   backgroundColor: "rgba(75,192,192,0.2)",
      //   borderColor:"rgba(75,192,192,1)"
      // },
    ]
  };



  return <Line data={data} options={options} />; 
}

const DoughnutChart = ({Value=[],labels=[]}) => {
  const doughnutData =  {
    lables,
    datasets: [
      {
        data:Value,
        label:"single chats vs group charts",
        fill:true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor:"rgba(75,192,192,1)",
        offset:20
      },
      // {
      //   data:[1,22,3,41,22,46,20],
      //   label:"Revenue 2",
      //   fill:false,
      //   backgroundColor: "rgba(75,192,192,0.2)",
      //   borderColor:"rgba(75,192,192,1)"
      // },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        display:false
      },
      title: {
        display: false,
        text: 'Total chats vs Group chats'
      }
    },
    cutout: 120 
  };

  return <Doughnut style={{zIndex: 999999,}} data={doughnutData} options={options} />;
}

export { Linechart, DoughnutChart };