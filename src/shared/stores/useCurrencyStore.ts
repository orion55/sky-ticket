import { create } from 'zustand';
import { Ticket } from '@/shared/stores/useTicketStore.ts';

type CurrencyState = {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
  currencies: string[];
  exchangeRates: Record<string, number>;
  setExchangeRates: (rates: Record<string, number>) => void;
  convertPrices: (tickets: Ticket[]) => Ticket[];
};

const currencies: string[] = ['RUB', 'USD', 'EUR'];

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  selectedCurrency: currencies[0],
  currencies,
  exchangeRates: {},
  setSelectedCurrency: (selectedCurrency) => set({ selectedCurrency }),
  setExchangeRates: (rates) => set({ exchangeRates: rates }),
  convertPrices: (tickets) => {
    const { selectedCurrency, exchangeRates } = get();
    if (selectedCurrency === 'RUB') {
      return tickets;
    }
    const rate = exchangeRates[selectedCurrency];
    if (!rate) {
      console.warn(`Не найден курс для валюты: ${selectedCurrency}`);
      return tickets;
    }
    return tickets.map((ticket) => ({
      ...ticket,
      price: Math.round(ticket.price * rate * 100) / 100,
    }));
  },
}));
