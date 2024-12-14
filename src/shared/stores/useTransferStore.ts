import { create } from 'zustand';
import { Ticket } from './useTicketStore.ts';
import isEmpty from 'lodash/isEmpty';

export type TransferOption = {
  value: string;
  label: string;
};

type TransferStore = {
  transferOptions: TransferOption[];
  selectedTransfers: string[];
  setSelectedTransfers: (transfers: string[]) => void;
  filterTransfers: (tickets: Ticket[]) => Ticket[];
};

const transferOptions: TransferOption[] = [
  { value: '0', label: 'Без пересадок' },
  { value: '1', label: '1 пересадка' },
  { value: '2', label: '2 пересадки' },
  { value: '3', label: '3 пересадки' },
];

export const useTransferStore = create<TransferStore>((set, get) => ({
  transferOptions,
  selectedTransfers: ['0', '1', '2', '3'],
  setSelectedTransfers: (transfers) => set({ selectedTransfers: transfers }),
  filterTransfers: (tickets: Ticket[]) => {
    const { selectedTransfers } = get();
    if (selectedTransfers.length === transferOptions.length || isEmpty(tickets)) {
      return tickets;
    }
    return tickets.filter((ticket) => selectedTransfers.includes(String(ticket.stops)));
  },
}));
