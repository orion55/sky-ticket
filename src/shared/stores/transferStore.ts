import { create } from 'zustand';

export type TransferOption = {
  value: string;
  label: string;
};

type TransferStore = {
  transferOptions: TransferOption[];
  selectedTransfers: string[];
  setSelectedTransfers: (transfers: string[]) => void;
};

const transferOptions: TransferOption[] = [
  { value: '0', label: 'Без пересадок' },
  { value: '1', label: '1 пересадка' },
  { value: '2', label: '2 пересадки' },
  { value: '3', label: '3 пересадки' },
];

export const useTransferStore = create<TransferStore>((set) => ({
  transferOptions,
  selectedTransfers: ['0', '1', '2', '3'],
  setSelectedTransfers: (transfers) => set({ selectedTransfers: transfers }),
}));
