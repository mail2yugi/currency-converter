import { configureStore } from "@reduxjs/toolkit";
import CurrencyConverterSlice from "./CurrencyConverterStore";

const store = configureStore({
  reducer: { currencyConverter: CurrencyConverterSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


