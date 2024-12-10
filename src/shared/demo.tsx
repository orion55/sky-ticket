import { Button } from '@/shared/ui/button.tsx';
import { Box, HStack } from '@chakra-ui/react';

const Demo = () => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
      <HStack>
        <Button onClick={() => console.log('Ok')}>Click me</Button>
        <Button onClick={() => console.log('Perfectly')} bg='blue.500' color='white'>
          Click
        </Button>
      </HStack>
    </Box>
  );
};

export default Demo;
