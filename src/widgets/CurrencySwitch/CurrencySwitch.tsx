import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { Currency, currencyStore } from '@/shared/stores/currencyStore.ts';
import { fetchExchangeRates } from './api/exchangeRatesApi.ts';
import { useQuery } from '@tanstack/react-query';
import { toaster } from '@/shared/ui/toaster.tsx';
import { useEffect } from 'react';

export const CurrencySwitch = () => {
  const { selectedCurrency, setSelectedCurrency, currencies } = currencyStore();
  const { error, isError } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60 * 24, // 1 день (24 часа) в миллисекундах
  });

  useEffect(() => {
    if (isError) {
      toaster.create({
        description: `${error.message}`,
        type: 'error',
      });
    }
  }, [error, isError]);

  const handleCurrencyChange = (value: Currency) => setSelectedCurrency(value);

  return (
    <Box padding='20px 20px 0 20px '>
      <Text fontSize='sm' fontWeight='bold' mb={4} color='gray.500'>
        ВАЛЮТА
      </Text>
      <HStack gap={0}>
        {currencies.map((currency: Currency, index: number) => (
          <Button
            key={currency.value}
            onClick={() => handleCurrencyChange(currency)}
            bg={selectedCurrency === currency ? 'blue.500' : 'white'}
            color={selectedCurrency === currency ? 'white' : 'blue.500'}
            _hover={
              selectedCurrency === currency
                ? { bg: 'blue.600', cursor: 'pointer', borderColor: 'blue.500' }
                : { bg: 'blue.50', cursor: 'pointer', borderColor: 'blue.500' }
            }
            borderLeftRadius={index === 0 ? 'md' : 'none'}
            borderRightRadius={index === currencies.length - 1 ? 'md' : 'none'}
            borderColor={selectedCurrency === currency ? 'blue.500' : 'border.emphasized'}
          >
            {currency.value}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};
