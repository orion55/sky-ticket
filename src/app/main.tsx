import { Provider } from '@/shared/ui/provider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ReactQueryProvider } from './providers/ReactQueryProvider.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ReactQueryProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </ReactQueryProvider>
    </Provider>
  </StrictMode>,
);
