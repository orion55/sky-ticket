import axios, { AxiosError } from 'axios';

const API_URL = 'http://apilayer.net/api/live';
const API_KEY = '5033a482622f0a76e963ace66d4a262a';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        access_key: API_KEY,
        source: 'RUB',
        currencies: 'USD,EUR',
        format: 1,
      },
    });
    return response.data.quotes;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Error fetching exchange rates: ${error.message}`);
    }
  }
};
