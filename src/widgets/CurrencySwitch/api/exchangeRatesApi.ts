import axios, { AxiosError } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import _ from 'lodash';

interface CurrencyRateDTO {
  NumCode: string;
  CharCode: string;
  Nominal: string;
  Name: string;
  Value: string;
  VunitRate: string;
}

interface CurrencyRate {
  CharCode: string;
  Value: number;
}

const API_URL = 'https://www.cbr.ru/scripts/XML_daily.asp';
const TARGET_CURRENCIES = ['USD', 'EUR'];

export async function fetchExchangeRates() {
  try {
    const { data } = await axios.get(API_URL);

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      parseTagValue: true,
      trimValues: true,
    });
    const parsedData = parser.parse(data);

    const rates: CurrencyRate[] = parsedData.ValCurs.Valute.map((valute: CurrencyRateDTO) => ({
      CharCode: valute.CharCode,
      Value: parseFloat(valute.Value.replace(',', '.')),
    }));

    /* return {
      "USD": 0.00962000962000962,
      "EUR": 0.009051379249169988
    }*/
    return _(rates)
      .filter((rate) => TARGET_CURRENCIES.includes(rate.CharCode))
      .keyBy('CharCode')
      .mapValues((rate) => 1 / rate.Value)
      .value();
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Error fetching exchange rates: ${error.message}`);
    }
  }
}
