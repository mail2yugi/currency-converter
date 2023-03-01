import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import LineChart, { DataModel } from "../../../../chartjs/LineChart";

interface ChartViewProps {
  history: Array<any>;
}

const ChartView = (props: ChartViewProps) => {
  const [data, setData] = useState({ ...DataModel });

  useEffect(() => {
    const labels: any = props?.history?.map((r) => r.label);
    const data: any = props?.history?.map((r) => r.value);
    setData({
      labels: labels,
      datasets: [
        {
          label: "Exchange History",
          data: data,
          borderColor: "#009688",
          backgroundColor: "#009688",
        },
      ],
    });
  }, [props.history]);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <Grid item xs={12}>
          <LineChart chartData={data}></LineChart>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChartView;
