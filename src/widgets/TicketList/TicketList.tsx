import { useEffect, useRef } from 'react';
import { getTickets } from './api/ticketsApi.ts';
import { ticketsStore } from '@/shared/stores/ticketStore.ts';
import isEmpty from 'lodash/isEmpty';
import { EmptyState } from '@/shared/ui/empty-state.tsx';
import { LuTicketsPlane } from 'react-icons/lu';
import { Box } from '@chakra-ui/react';
import { TicketItem } from './ui/TicketItem';

export const TicketList = () => {
  const { tickets, setTickets, applyFilters, filteredTickets } = ticketsStore();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && isEmpty(tickets)) {
      isInitialized.current = true;
      setTickets(getTickets());
      applyFilters();
    }
  }, []);

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
