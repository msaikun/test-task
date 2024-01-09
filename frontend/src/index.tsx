import { ThemeProvider } from 'styled-components';
import { createRoot } from 'react-dom/client';

import { GlobalStyles, theme } from './utils/theme';
import App                     from './App';
import { StrictMode, Suspense } from 'react';
import { Notification } from './components/Notistack';
import { SnackbarProvider } from 'notistack';
import { CircularProgress } from '@mui/material';

const container = document.getElementById('root');
const root = createRoot(container as any);

root.render(
  <StrictMode>
    <Suspense fallback={<CircularProgress />}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <GlobalStyles />
          <App />
          <Notification />
        </SnackbarProvider>
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);