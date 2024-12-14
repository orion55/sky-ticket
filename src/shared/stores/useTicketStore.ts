import { create } from 'zustand';
import { useTransferStore } from './useTransferStore.ts';
import { useCurrencyStore } from './useCurrencyStore.ts';

export type Ticket = {
  id: string;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
};

type TicketsState = {
  tickets: Ticket[];
  filteredTickets: Ticket[];
  setTickets: (products: Ticket[]) => void;
  applyFilters: () => void;
};

export const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: [],
  filteredTickets: [],
  setTickets: (tickets) => set({ tickets }),
  applyFilters: () => {
    const { tickets } = get();

    const convertedTickets = useCurrencyStore.getState().convertPrices(tickets);
    const filteredTickets = useTransferStore.getState().filterTransfers(convertedTickets);

    set({ filteredTickets });
  },
}));
