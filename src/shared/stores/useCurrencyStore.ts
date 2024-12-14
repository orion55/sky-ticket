import { create } from 'zustand';
import { Ticket } from '@/shared/stores/useTicketStore.ts';

export type Currency = {
  value: string;
  sign: string;
};

type CurrencyState = {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currencies: Currency[];
  exchangeRates: Record<string, number>;
  setExchangeRates: (rates: Record<string, number>) => void;
  convertPrices: (tickets: Ticket[]) => Ticket[];
};

const currencies: Currency[] = [
  { value: 'RUB', sign: '₽' },
  { value: 'USD', sign: '$' },
  { value: 'EUR', sign: '€' },
];

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  selectedCurrency: currencies[0],
  currencies,
  exchangeRates: {},
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
  setExchangeRates: (rates) => set({ exchangeRates: rates }),
  convertPrices: (tickets) => {
    const { selectedCurrency, exchangeRates } = get();
    if (selectedCurrency.value === 'RUB') {
      return tickets;
    }
    const rate = exchangeRates[selectedCurrency.value];
    if (!rate) {
      console.warn(`Не найден курс для валюты: ${selectedCurrency.value}`);
      return tickets;
    }
    return tickets.map((ticket) => ({
      ...ticket,
      price: Math.round(ticket.price * rate * 100) / 100,
    }));
  },
}));
