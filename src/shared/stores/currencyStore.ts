import { create } from 'zustand';

export type Currency = {
  value: string;
  sign: string;
};

type CurrencyState = {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: Currency[];
};

const currencies: Currency[] = [
  { value: 'RUB', sign: '₽' },
  { value: 'USD', sign: '$' },
  { value: 'EUR', sign: '€' },
];

export const currencyStore = create<CurrencyState>((set) => ({
  selectedCurrency: currencies[0],
  currencies,
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
}));
