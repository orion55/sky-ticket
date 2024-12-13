import { create } from 'zustand';

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

export const ticketsStore = create<TicketsState>((set) => ({
  tickets: [],
  filteredTickets: [],
  setTickets: (tickets) => set({ tickets }),
  applyFilters: () => {
    set((state) => ({
      filteredTickets: state.tickets,
    }));
  },
}));
