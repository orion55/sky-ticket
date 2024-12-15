import 'modern-normalize/modern-normalize.css';
import './app.css';
import { Box, Grid } from '@chakra-ui/react';
import { Logo } from '@/app/ui/Logo.tsx';
import { CurrencySwitch } from '@/widgets/CurrencySwitch';
import { Toaster } from '@/shared/ui/toaster.tsx';
import { TransferSwitch } from '@/widgets/TransferSwitch/TransferSwitch.tsx';
import { TicketList } from '@/widgets/TicketList';

function App() {
  return (
    <>
      <Box
        backgroundColor='#F3F7FA'
        display='flex'
        justifyContent='flex-start'
        alignItems='center'
        flexDirection='column'
        padding={['5px', '5px', '10px', '20px']}
        minHeight='100vh'
        width='100%'
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
        <Grid
          gap='4'
          templateColumns={['1fr', '1fr', '1fr', '233px 1fr']}
          width={['100%', '100%', '100%', '1024px']}
          margin='0 auto'
        >
          <Box width='100%'>
            <Box
              backgroundColor='white'
              shadow='sm'
              borderRadius='md'
              display='flex'
              justifyContent='flex-start'
              alignItems='flex-start'
              flexDirection='column'
              gap={8}
              width='223px'
              margin='0 auto'
            >
              <CurrencySwitch />
              <TransferSwitch />
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
            flexDirection='column'
            gap={4}
          >
            <TicketList />
          </Box>
        </Grid>
      </Box>
      <Toaster />
    </>
  );
}

export default App;
