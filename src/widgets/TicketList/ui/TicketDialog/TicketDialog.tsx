import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/shared/ui/dialog.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useDialogStore } from '@/shared/stores/useDialogStore.ts';
import { useTicketsStore } from '@/shared/stores/useTicketStore.ts';
import { DataListItem, DataListRoot } from '@/shared/ui/data-list.tsx';
import { HStack, Text } from '@chakra-ui/react';
import { formatTransfer } from '@/shared/libs/formatTransfer.ts';
import { useCurrencyStore } from '@/shared/stores/useCurrencyStore.ts';
import { formatCurrency } from '@/shared/libs/formatCurrency.ts';

export const TicketDialog = () => {
  const { isOpen, closeDialog } = useDialogStore();
  const { currentTicket } = useTicketsStore();
  const { selectedCurrency } = useCurrencyStore();

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(open) => !open && closeDialog()}
      size={['xs', 'xs', 'md', 'md']}
      placement='center'
      motionPreset='slide-in-bottom'
      lazyMount
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Билет куплен</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DataListRoot orientation='horizontal'>
            <DataListItem
              label='Откуда'
              value={
                <HStack>
                  <Text color='gray.950' fontSize='sm' fontWeight='bold'>
                    {currentTicket.origin_name}
                  </Text>
                  <Text color='gray.950' fontSize='sm'>
                    {currentTicket.departure_date}, {currentTicket.departure_time}
                  </Text>
                </HStack>
              }
            />
            <DataListItem
              label='Куда'
              value={
                <HStack>
                  <Text color='gray.950' fontSize='sm' fontWeight='bold'>
                    {currentTicket.destination_name}
                  </Text>
                  <Text color='gray.950' fontSize='sm'>
                    {currentTicket.arrival_date}, {currentTicket.arrival_time}
                  </Text>
                </HStack>
              }
            />
            <DataListItem
              label='Пересадки'
              value={
                <Text color='gray.950' fontSize='sm'>
                  {formatTransfer(currentTicket.stops)}
                </Text>
              }
            />
            <DataListItem
              label='Цена'
              value={
                <Text color='gray.950' fontSize='sm' fontWeight='bold'>
                  {formatCurrency(currentTicket.price, selectedCurrency)}
                </Text>
              }
            />
          </DataListRoot>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={closeDialog}
            bg={'blue.500'}
            color={'white'}
            _hover={{ bg: 'blue.600', cursor: 'pointer', borderColor: 'blue.600' }}
          >
            Ok
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={closeDialog} />
      </DialogContent>
    </DialogRoot>
  );
};
