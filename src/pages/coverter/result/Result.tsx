import "./Result.scss";
import React from "react";
import { useAppSelector } from "../../../hooks/ReduxHooks";
import Grid from "@mui/material/Grid";

interface ResultProps {
  amount: number;
  from: string;
  to: string;
}

const Result = (props: ResultProps) => {
  const latestRates = useAppSelector((state) => state.currencyConverter.latest);
  const convertedAmount = useAppSelector(
    (state) => state.currencyConverter.convertedAmountResult
  );

  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "16vh" }}
        className={convertedAmount && "result-container"}
      >
        <Grid item xs={12}>
          {convertedAmount ? (
            <h1>
              {props.amount} {props.from} ={" "}
              <span className="result">
                {convertedAmount?.result} {props.to}
              </span>
            </h1>
          ) : null}
        </Grid>
        <Grid item xs={12}>
          {latestRates && convertedAmount ? (
            <>
              <div>
                1 {props?.from} = {(latestRates[props.from] / latestRates[props.to]).toFixed(6)} {props.to}
              </div>
              <div>
                1 {props?.to} = {(latestRates[props.to] / latestRates[props.from])?.toFixed(6)} {props.from}
              </div>
            </>
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Result;
