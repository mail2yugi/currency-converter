import "./Converter.scss";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxHooks";
import { setQueryObject } from "../../actions/CurrencyConverterActions";
import Result from "./result/Result";
import History from "./History/History";
import Grid from "@mui/material/Grid";

const Converter = () => {
  const [currencyList, setCurrencyList] = React.useState([] as any);
  const [amount, setAmount] = React.useState(0);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const latestRates = useAppSelector((state) => state.currencyConverter.latest);
  const queryObjectStream = useAppSelector(
    (state) => state.currencyConverter.queryObj
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (latestRates) {
      setCurrencyList(Object.keys(latestRates));
    }
  }, [latestRates]);

  const handleAmountChange = (event: any) => {
    setAmount(event.target.value);
  };

  const handleFromChange = (event: any, newValue: any) => {
    setFrom(newValue);
  };

  const handleToChange = (event: any, newValue: any) => {
    setTo(newValue);
  };

  const handleSubmit = (event: any) => {
    fetchConvertedAmount(amount, from, to);
    event.preventDefault();
  };

  const fetchConvertedAmount = (
    locAmt: number,
    locFrom: string,
    locTo: string
  ) => {
    if (locAmt && locFrom && locTo) {
      dispatch(
        setQueryObject({
          amount: locAmt,
          from: locFrom,
          to: locTo,
        })
      );
    }
  };

  const handleSwap = (event: any) => {
    event.preventDefault();
    setTo(from);
    setFrom(to);
    fetchConvertedAmount(amount, to, from);
  };

  useEffect(() => {
    if (queryObjectStream) {
      setAmount(queryObjectStream.amount);
      setFrom(queryObjectStream.from);
      setTo(queryObjectStream.to);
    }
  }, [queryObjectStream, dispatch]);

  return (
    <React.Fragment>
      <h2>I want to convert </h2>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <TextField
            label="Amount"
            variant="standard"
            value={amount}
            onChange={handleAmountChange}
            type="number"
          />
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            options={currencyList}
            onChange={handleFromChange}
            value={from}
            renderInput={(params) => (
              <TextField {...params} label="From" variant="standard" />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="outlined"
            onClick={handleSwap}
            className="mrg-l-8 secondary-btn"
          >
            <SwapHorizIcon className="swap" />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Autocomplete
            options={currencyList}
            onChange={handleToChange}
            value={to}
            renderInput={(params) => (
              <TextField {...params} label="To" variant="standard" />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            className="primary-btn"
          >
            CONVERT
          </Button>
        </Grid>
      </Grid>
      <Result
        amount={queryObjectStream?.amount}
        from={queryObjectStream?.from}
        to={queryObjectStream?.to}
      />
      <History toCurrencyCode={to} />
    </React.Fragment>
  );
};

export default Converter;
