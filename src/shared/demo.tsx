import { Button } from '@/shared/ui/button.tsx';
import { HStack } from '@chakra-ui/react';

const Demo = () => {
  return (
    <HStack>
      <Button onClick={() => console.log('Ok')}>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  );
};

export default Demo;
