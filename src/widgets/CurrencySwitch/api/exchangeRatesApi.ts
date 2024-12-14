import axios, { AxiosError } from 'axios';
import pick from 'lodash/pick';

const IS_DEBUG = false;
const API_KEY = '668c8fbcf39a7d79f1b06bd2';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/RUB`;
const TARGET_CURRENCIES = ['USD', 'EUR'];

export async function fetchExchangeRates() {
  if (IS_DEBUG) {
    return {
      USD: 0.00962,
      EUR: 0.009051,
    };
  }

  try {
    const { data } = await axios.get(API_URL);
    const rates = data.conversion_rates;
    return pick(rates, TARGET_CURRENCIES);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Ошибка при получении курсов валют: ${error.message}`);
    }
  }
}
