import CurrencyConverterSlice, {
  ConversionHistoryModel,
} from "../store/CurrencyConverterStore";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store/index";
import CurrencyService from "../service/CurrencyConverterService";

export const currencyConverterActions = CurrencyConverterSlice.actions;

export const fetchLatest = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch, getState) => {
    if (!getState().currencyConverter.latest) {
      const response: any = await CurrencyService.getLatest();
      dispatch(currencyConverterActions.setLatest(response));
    }
  };
};

export const fetchConversionAmount = (
  amount: number,
  from: string,
  to: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response: any = await CurrencyService.getConvertedAmount(
      amount,
      from,
      to
    );
    dispatch(currencyConverterActions.setConvertedAmount(response));
  };
};

export const setQueryObject = (
  queryObject: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(
      fetchConversionAmount(
        queryObject.amount,
        queryObject.from,
        queryObject.to
      )
    );
    dispatch(updateConversionHistory(queryObject));
    dispatch(currencyConverterActions.setQueryObject(queryObject));
  };
};

export const getTimeSeries = (
  startDate: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const response: any = await CurrencyService.getTimeSeries(startDate);
    dispatch(currencyConverterActions.setTimeSeries(response));
  };
};

export const updateConversionHistory = (
  queryObject: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    let response: ConversionHistoryModel = Object.assign({}, queryObject);
    response.dateTime = new Date().toLocaleString().split(",").join(" @ ");
    response.id = Math.floor(Math.random() * 9000 + 1000); // Just random number
    dispatch(currencyConverterActions.updateConversionHistory(response));
  };
};

export const deleteConversionHistoryById = (
  id: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(currencyConverterActions.deleteRow(id));
  };
};
