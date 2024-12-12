import 'modern-normalize/modern-normalize.css';
import { Box, Grid } from '@chakra-ui/react';
import { Logo } from '@/app/ui/Logo.tsx';
import { CurrencySwitch } from '@/widgets/CurrencySwitch';
import { Toaster } from '@/shared/ui/toaster.tsx';
import { TransferSwitch } from '@/widgets/TransferSwitch/TransferSwitch.tsx';

function App() {
  return (
    <>
      <Box
        height='100vh'
        backgroundColor='#F3F7FA'
        display='flex'
        justifyContent='flex-start'
        alignItems='center'
        flexDirection='column'
        padding='20px'
      >
        <Box
          paddingBottom='20px'
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Logo />
        </Box>
        <Grid gap='4' templateColumns='233px 1fr' width='1024px' margin='0 auto'>
          <Box
            backgroundColor='white'
            shadow='sm'
            borderRadius='md'
            display='flex'
            justifyContent='center'
            alignItems='flex-start'
            flexDirection='column'
            gap={8}
          >
            <CurrencySwitch />
            <TransferSwitch />
          </Box>
          <Box backgroundColor='white' shadow='sm' borderRadius='md' />
        </Grid>
      </Box>
      <Toaster />
    </>
  );
}

export default App;
