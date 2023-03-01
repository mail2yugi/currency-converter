import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const DataModel = {
  labels: [],
  datasets: [
    {
      label: "Dataset 1",
      data: [],
      borderColor: "#009688",
      backgroundColor: "#009688",
    },
  ],
};

export interface ChartViewProps {
  chartData: any;
}

const LineChart = (props: ChartViewProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <React.Fragment>
      <Line options={options} data={props.chartData} />
    </React.Fragment>
  );
};

export default LineChart;
