import { Ticket, useTicketsStore } from '@/shared/stores/useTicketStore.ts';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { getAirlineLogo } from './libs/airlineLogos.ts';
import { Button } from '@/shared/ui/button.tsx';
import { useCurrencyStore } from '@/shared/stores/useCurrencyStore.ts';
import { formatDate } from '@/widgets/TicketList/ui/TicketItem/libs/formatDate.ts';
import { FaPlane } from 'react-icons/fa';
import { useDialogStore } from '@/shared/stores/useDialogStore.ts';
import { formatTransfer } from '@/shared/libs/formatTransfer.ts';
import { formatCurrency } from '@/shared/libs/formatCurrency.ts';

interface TicketProps {
  ticket: Ticket;
}

export const TicketItem = (props: TicketProps) => {
  const { ticket } = props;
  const { selectedCurrency } = useCurrencyStore();
  const { openDialog } = useDialogStore();
  const { setCurrentTicket } = useTicketsStore();

  const handelClick = () => {
    setCurrentTicket(ticket);
    openDialog();
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={['calc(95% - 10px)', 'calc(95% - 10px)', 'calc(95% - 20px)', '100%']}
      backgroundColor='white'
      shadow='sm'
      borderRadius='md'
    >
      <Grid templateColumns={['1fr', '1fr', '150px 1fr', '200px 1fr']} width='100%'>
        <Flex
          direction='column'
          padding='20px'
          borderRightWidth={['0', '0', '1px', '1px']}
          borderRightStyle='solid'
          borderRightColor='gray.300'
          borderBottomWidth={['1px', '1px', '0', '0']}
          borderBottomStyle='solid'
          borderBottomColor='gray.300'
        >
          <Image
            src={getAirlineLogo(ticket.carrier)}
            alt={`${ticket.carrier} logo`}
            w='200px'
            h='75px'
            fit='contain'
            margin='0 auto'
          />
          <Button
            size='xl'
            bgColor='orange.600'
            color='white'
            _hover={{ bgColor: 'orange.500' }}
            shadow='sm'
            onClick={handelClick}
          >
            <Text textStyle='md'>
              Купить <br />
              за {formatCurrency(ticket.price, selectedCurrency.value)}
            </Text>
          </Button>
        </Flex>
        <Flex direction='column' padding='20px' alignItems='flex-start' justifyContent='flex-start'>
          <Box width='100%'>
            <Grid
              templateColumns={[
                '120px 1fr 120px',
                '120px 1fr 120px',
                '140px 1fr 140px',
                '140px 1fr 140px',
              ]}
              width='100%'
            >
              <Text fontSize='5xl'>{ticket.departure_time}</Text>
              <Flex direction='column' alignItems='center' justifyContent='center' gap={2}>
                <Text textTransform='uppercase' color='gray.400' fontSize='sm' textAlign='center'>
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
