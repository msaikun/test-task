import { SnackbarProvider }     from 'notistack';
import { StrictMode, Suspense } from 'react';
import { createRoot }           from 'react-dom/client';
import { ThemeProvider }        from 'styled-components';
import { CircularProgress }     from '@mui/material';

import App                     from './App';
import { Notification }        from './components/Notistack';
import { GlobalStyles, theme } from './utils/theme';

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
