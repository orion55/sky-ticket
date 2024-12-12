import plane from './plane.png';
import { Image } from '@chakra-ui/react';

export const Logo = () => (
  <Image
    src={plane}
    alt='plane'
    height='90px'
    width='90px'
    transition='transform 0.5s'
    _hover={{
      transform: 'rotate(360deg)',
    }}
    boxShadow='sm'
    borderRadius='full'
  />
);
