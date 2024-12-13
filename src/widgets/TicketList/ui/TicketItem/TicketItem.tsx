import type { Ticket } from '@/shared/stores/ticketStore.ts';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { getAirlineLogo } from './libs/airlineLogos.ts';
import { Button } from '@/shared/ui/button.tsx';
import { currencyStore } from '@/shared/stores/currencyStore.ts';
import { formatCurrency } from './libs/formatCurrency.ts';
import { formatTransfer } from './libs/formatTransfer.ts';
import { formatDate } from '@/widgets/TicketList/ui/TicketItem/libs/formatDate.ts';
import { FaPlane } from 'react-icons/fa';

interface TicketProps {
  ticket: Ticket;
}

export const TicketItem = (props: TicketProps) => {
  const { ticket } = props;
  const { selectedCurrency } = currencyStore();

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
        <Flex
          direction='column'
          padding='20px'
          borderRightWidth='1px'
          borderRightStyle='solid'
          borderRightColor='gray.300'
        >
          <Image
            src={getAirlineLogo(ticket.carrier)}
            alt={`${ticket.carrier} logo`}
            w='200px'
            h='75px'
            fit='contain'
          />
          <Button
            size='xl'
            bgColor='orange.600'
            color='white'
            _hover={{ bgColor: 'orange.500' }}
            shadow='sm'
          >
            <Text textStyle='md'>
              Купить <br />
              за {formatCurrency(ticket.price, selectedCurrency.value)}
            </Text>
          </Button>
        </Flex>
        <Flex direction='column' padding='20px' alignItems='flex-start' justifyContent='flex-start'>
          <Box width='100%'>
            <Grid templateColumns='140px 1fr 140px' width='100%'>
              <Text fontSize='5xl'>{ticket.departure_time}</Text>
              <Flex direction='column' alignItems='center' justifyContent='center' gap={2}>
                <Text textTransform='uppercase' color='gray.400' fontSize='sm'>
                  {formatTransfer(ticket.stops)}
                </Text>
                <Flex align='center' w='100%' position='relative'>
                  <Box flex='1' h='1px' bg='gray.400' />
                  <Box position='absolute' right='0' bg='white'>
                    <FaPlane style={{ fontSize: '20px', color: 'gray' }} />
                  </Box>
                </Flex>
              </Flex>
              <Text fontSize='5xl' justifySelf='flex-end'>
                {ticket.arrival_time}
              </Text>
            </Grid>
          </Box>
          <Box width='100%'>
            <Grid templateColumns='1fr 1fr' width='100%'>
              <Flex direction='column' alignItems='flex-start' justifyContent='flex-start' gap={1}>
                <Text color='gray.950' fontSize='sm' fontWeight='bold'>
                  {ticket.origin}, {ticket.origin_name}
                </Text>
                <Text color='gray.400' fontSize='sm'>
                  {formatDate(ticket.departure_date)}
                </Text>
              </Flex>
              <Flex direction='column' alignItems='flex-end' justifyContent='flex-start' gap={1}>
                <Text color='gray.950' fontSize='sm' fontWeight='bold'>
                  {ticket.destination_name}, {ticket.destination}
                </Text>
                <Text color='gray.400' fontSize='sm'>
                  {formatDate(ticket.arrival_date)}
                </Text>
              </Flex>
            </Grid>
          </Box>
        </Flex>
      </Grid>
    </Box>
  );
};
