import ticketList from './tickets.json';
import { Ticket } from '@/shared/stores/useTicketStore.ts';
import { v4 as uuidv4 } from 'uuid';
import { chain } from 'lodash';

export const getTickets = (): Ticket[] =>
  chain(ticketList.tickets)
    .map((ticket: Omit<Ticket, 'id'>) => ({ id: uuidv4(), ...ticket }))
    .orderBy(['departure_date', 'departure_time'], ['asc', 'asc'])
    .value();
