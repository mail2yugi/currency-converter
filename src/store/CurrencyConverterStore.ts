import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConversionHistoryModel {
  from: string;
  to: string;
  amount: string;
  dateTime: string;
  id: number;
}

const initialCurrencyConverterState: any = {
  latest: null,
  convertedAmountResult: null,
  queryObj: null,
  timeSeriesData: null,
  conversionHistory: JSON.parse(
    localStorage.getItem("conversionHistory") || "[]"
  ),
};

const CurrencyConverterSlice = createSlice({
  name: "currencyConverter",
  initialState: initialCurrencyConverterState,
  reducers: {
    setLatest(state, action: PayloadAction<any>) {
      state.latest = action.payload;
    },

    setConvertedAmount(state, action: PayloadAction<any>) {
      state.convertedAmountResult = action.payload;
    },

    setQueryObject(state, action: PayloadAction<any>) {
      state.queryObj = action.payload;
    },

    setTimeSeries(state, action: PayloadAction<any>) {
      state.timeSeriesData = action.payload;
    },

    updateConversionHistory(
      state,
      action: PayloadAction<ConversionHistoryModel>
    ) {
      state.conversionHistory = [action.payload, ...state.conversionHistory];
      localStorage.setItem(
        "conversionHistory",
        JSON.stringify(state.conversionHistory)
      );
    },

    deleteRow(state, action: PayloadAction<number>) {
      state.conversionHistory = [
        ...state.conversionHistory?.filter(
          (r: ConversionHistoryModel) => r.id !== action.payload
        ),
      ];
      localStorage.setItem(
        "conversionHistory",
        JSON.stringify(state.conversionHistory)
      );
    },
  },
});
export default CurrencyConverterSlice;
