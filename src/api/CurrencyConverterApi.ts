import axios from "axios";
import AppConstants from "../AppConstants";

const CurrencyConverterAPI = {
  latest: () => {
    return axios.get(AppConstants.BASE_URL + "latest");
  },

  convertedAmount: (amount: number, from: string, to: string) => {
    return axios.get(
      `${AppConstants.BASE_URL}convert?from=${from}&to=${to}&amount=${amount}`
    );
  },

  getTimeSeries: (startDate: string) => {
    const endDate: string = new Date().toISOString().split("T")[0];
    return axios.get(
      `${AppConstants.BASE_URL}/timeseries?start_date=${startDate}&end_date=${endDate}`
    );
  },
};

export default CurrencyConverterAPI;
