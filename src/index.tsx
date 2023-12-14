import { ThemeProvider } from 'styled-components';
import ReactDOM          from 'react-dom';

import { TreeViewComponent } from './components/TreeView/TreeView';
import { GlobalStyles, theme } from './utils/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <TreeViewComponent />
  </ThemeProvider>,
  document.getElementById('root')
);