import { Provider } from '@/shared/ui/provider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ReactQueryProvider } from './providers/ReactQueryProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ReactQueryProvider>
        <App />
      </ReactQueryProvider>
    </Provider>
  </StrictMode>,
);
