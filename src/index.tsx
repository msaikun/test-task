import { ThemeProvider } from 'styled-components';
import ReactDOM          from 'react-dom';

import { GlobalStyles, theme } from './utils/theme';
import App                     from './App';

const data: any = {
  id: 1,
  name: "Cars",
  children: [
    {
      id: 2,
      name: "Sport Cars",
      children: [
        {
          id: 24,
          name: "Porsche"
        },
        {
          id: 25,
          name: "Ferrari"
        },
        {
          id: 26,
          name: "McLaren"
        }
      ]
    },
    {
      id: 3,
      name: "Classic Cars",
      children: [
        {
          id: 34,
          name: "1957 Corvette"
        },
        {
          id: 35,
          name: "Volkswagen Beetle"
        },
        {
          id: 36,
          name: "Bentley"
        }
      ]
    }
  ]
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);