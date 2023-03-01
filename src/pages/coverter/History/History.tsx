import "./History.scss";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/ReduxHooks";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { getTimeSeries } from "../../../actions/CurrencyConverterActions";
import TableView from "./TableView/TableView";
import ChartView from "./ChartView/ChartView";

interface HistoryProps {
  toCurrencyCode: string;
}

const History = (props: HistoryProps) => {
  const dispatch = useAppDispatch();
  const timeSeries = useAppSelector(
    (state) => state.currencyConverter.timeSeriesData
  );

  const [dateRange, setDateRange] = useState({ label: "7 days", value: 7 });
  const [viewMode, setViewMode] = useState("Table");
  const [history, setHistory] = useState([]);
  const [statistics, setStatistics] = useState([]);

  const dateList: any = [
    { label: "7 days", value: 7 },
    { label: "14 days", value: 14 },
    { label: "30 days", value: 30 },
  ];

  const handleFromChange = (event: any, newValue: any) => {
    setDateRange(newValue);
  };

  useEffect(() => {
    if (props.toCurrencyCode && timeSeries) {
      const list: any = [];
      const stats: any = [];
      Object.keys(timeSeries.rates).forEach((key) => {
        list.push({
          label: key,
          value: timeSeries.rates[key][props.toCurrencyCode],
        });
      });
      const valueList: any = list.map((r: any) => r.value) || [];
      stats.push({ label: "Lowest", value: Math.min(...valueList) });
      stats.push({ label: "Highest", value: Math.max(...valueList) });
      stats.push({
        label: "Avarage",
        value:
          valueList.reduce((a: any, b: any) => a + b, 0) / valueList.length,
      });
      setHistory(list);
      setStatistics(stats);
    }
  }, [timeSeries, props.toCurrencyCode]);

  useEffect(() => {
    if (dateRange) {
      const startDate: string = new Date(
        Date.now() - dateRange.value * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];
      dispatch(getTimeSeries(startDate));
    }
  }, [dateRange, dispatch]);

  return (
    <React.Fragment>
      <h2>Exchange History</h2>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Autocomplete
            options={dateList}
            onChange={handleFromChange}
            value={dateRange}
            renderInput={(params) => (
              <TextField {...params} label="Duration" variant="standard" />
            )}
          />
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "1rem", marginTop: "1rem" }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setViewMode(e.target.value)}
          >
            <FormControlLabel
              value="Table"
              control={<Radio checked={viewMode === "Table"} />}
              label="Table"
            />
            <FormControlLabel
              value="Chart"
              control={<Radio checked={viewMode === "Chart"} />}
              label="Chart"
            />
          </RadioGroup>
        </Grid>
      </Grid>
      {props.toCurrencyCode && viewMode === "Table" ? (
        <TableView history={history} statistics={statistics} />
      ) : (
        props.toCurrencyCode && <ChartView history={history} />
      )}
    </React.Fragment>
  );
};

export default History;
