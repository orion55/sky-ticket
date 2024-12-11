import 'modern-normalize/modern-normalize.css';
import { Box, Grid } from '@chakra-ui/react';
import { Logo } from '@/app/ui/Logo.tsx';

function App() {
  return (
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
      <Grid gap='4' templateColumns='445px 1fr' width='100%'>
        <Box height='100px' backgroundColor='white' shadow='md' borderRadius='md'></Box>
        <Box height='100px' backgroundColor='white' shadow='md' borderRadius='md' />
      </Grid>
    </Box>
  );
}

export default App;
