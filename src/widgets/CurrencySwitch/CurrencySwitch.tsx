import { Box, Button, HStack, Text } from '@chakra-ui/react';
import { useCurrencyStore } from '@/shared/stores/useCurrencyStore.ts';
import { useQuery } from '@tanstack/react-query';
import { toaster } from '@/shared/ui/toaster.tsx';
import { useEffect } from 'react';
import { fetchExchangeRates } from './api/exchangeRatesApi.ts';
import isEmpty from 'lodash/isEmpty';

export const CurrencySwitch = () => {
  const { selectedCurrency, setSelectedCurrency, currencies, setExchangeRates } =
    useCurrencyStore();
  const { data, error, isError, isSuccess } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: fetchExchangeRates,
    staleTime: 1000 * 60 * 60 * 24, // 1 день (24 часа) в миллисекундах
    retry: 3,
  });

  useEffect(() => {
    if (isSuccess && !isEmpty(data)) {
      setExchangeRates(data);
    }
  }, [data, isSuccess, setExchangeRates]);

  useEffect(() => {
    if (isError) {
      toaster.create({
        description: `${error.message}`,
        type: 'error',
      });
    }
  }, [error, isError]);

  const handleCurrencyChange = (value: string) => setSelectedCurrency(value);

  return (
    <Box paddingTop='20px' margin='0 auto'>
      <Text fontSize='sm' fontWeight='bold' mb={4} color='gray.500' textTransform='uppercase'>
        Валюта
      </Text>
      <HStack gap={0}>
        {currencies.map((currency: string, index: number) => (
          <Button
            key={currency}
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
            {currency}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};
