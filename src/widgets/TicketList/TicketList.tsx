import { useEffect, useRef } from 'react';
import { getTickets } from './api/ticketsApi.ts';
import { useTicketsStore } from '@/shared/stores/useTicketStore.ts';
import isEmpty from 'lodash/isEmpty';
import { EmptyState } from '@/shared/ui/empty-state.tsx';
import { LuTicketsPlane } from 'react-icons/lu';
import { Box } from '@chakra-ui/react';
import { TicketItem } from './ui/TicketItem';
import { useTransferStore } from '@/shared/stores/useTransferStore.ts';
import { useCurrencyStore } from '@/shared/stores/useCurrencyStore.ts';

export const TicketList = () => {
  const { tickets, setTickets, applyFilters, filteredTickets } = useTicketsStore();
  const isInitialized = useRef(false);
  const { selectedTransfers } = useTransferStore();
  const { selectedCurrency } = useCurrencyStore();

  useEffect(() => {
    if (!isInitialized.current && isEmpty(tickets)) {
      isInitialized.current = true;
      setTickets(getTickets());
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, selectedTransfers, selectedCurrency]);

  if (isEmpty(filteredTickets))
    return (
      <Box
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        width='100%'
        backgroundColor='white'
        shadow='sm'
        borderRadius='md'
      >
        <EmptyState title={'Авиабилеты не найдены!'} icon={<LuTicketsPlane />} />
      </Box>
    );

  return (
    <>
      {filteredTickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </>
  );
};
