import CurrencyConverterAPI from "../api/CurrencyConverterApi";

const CurrencyService = {
  async getLatest() {
    const response: any = await CurrencyConverterAPI.latest();
    return response?.data?.rates;
  },

  async getConvertedAmount(amount: number, from: string, to: string) {
    const response = await CurrencyConverterAPI.convertedAmount(
      amount,
      from,
      to
    );
    return response.data;
  },

  async getTimeSeries(startDate: string) {
    const response = await CurrencyConverterAPI.getTimeSeries(startDate);
    return response.data;
  },
};

export default CurrencyService;
