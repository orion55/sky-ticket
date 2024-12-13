import type { Ticket } from '@/shared/stores/ticketStore.ts';
import { Box, Flex, Grid, Image } from '@chakra-ui/react';
import { FC } from 'react';
import { getAirlineLogo } from './airlineLogos.ts';

interface TicketProps {
  ticket: Ticket;
}

export const TicketItem: FC<TicketProps> = (props) => {
  const { ticket } = props;

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='100%'
      backgroundColor='white'
      shadow='sm'
      borderRadius='md'
    >
      <Grid templateColumns='200px 1fr' width='100%'>
        <Flex direction='column' padding='20px'>
          <Image
            src={getAirlineLogo(ticket.carrier)}
            alt={`${ticket.carrier} logo`}
            w='200px'
            fit='contain'
          />
        </Flex>
        <Flex>{ticket.arrival_date}</Flex>
      </Grid>
    </Box>
  );
};
