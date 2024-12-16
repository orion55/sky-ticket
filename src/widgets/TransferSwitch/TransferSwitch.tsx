import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { TransferOption, useTransferStore } from '@/shared/stores/useTransferStore.ts';
import { CheckedChangeDetails } from '@zag-js/checkbox';

const checkboxStyles = {
  cursor: 'pointer',
  _hover: {
    bg: 'blue.100/50',
  },
  w: '100%',
  p: 2,
  pl: 5,
  pr: 5,
  colorPalette: 'blue',
};

export const TransferSwitch: React.FC = () => {
  const { transferOptions, selectedTransfers, setSelectedTransfers } = useTransferStore();

  const isAllSelected = selectedTransfers.length === transferOptions.length;

  const handleAllChange = (details: CheckedChangeDetails) => {
    if (details.checked) {
      setSelectedTransfers(transferOptions.map((option) => option.value));
    } else {
      setSelectedTransfers([]);
    }
  };

  const handleTransferChange = (value: string) => {
    if (selectedTransfers.includes(value)) {
      setSelectedTransfers(selectedTransfers.filter((item) => item !== value));
    } else {
      setSelectedTransfers([...selectedTransfers, value]);
    }
  };

  return (
    <Box mb={5}>
      <Text
        fontSize='sm'
        fontWeight='bold'
        mb={4}
        color='gray.500'
        pl={5}
        pr={5}
        textTransform='uppercase'
      >
        Количество пересадок
      </Text>
      <VStack align='start' gap={0}>
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={(details: CheckedChangeDetails) => handleAllChange(details)}
          variant='outline'
          {...checkboxStyles}
        >
          <Text color='gray.500'>Все</Text>
        </Checkbox>
        {transferOptions.map((option: TransferOption) => (
          <Checkbox
            key={option.value}
            checked={selectedTransfers.includes(option.value)}
            onCheckedChange={() => handleTransferChange(option.value)}
            variant='outline'
            {...checkboxStyles}
          >
            <Text color='gray.500'>{option.label}</Text>
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
};
