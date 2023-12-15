import { ThemeProvider } from 'styled-components';
import ReactDOM          from 'react-dom';

import { GlobalStyles, theme } from './utils/theme';
import App                     from './App';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);