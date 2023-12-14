import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    tealHover : '#3D7F85',
    white     : '#FFF',
  },
};

export const GlobalStyles = createGlobalStyle`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    background-color : #fff;
    height           : 100%;
    font-family      : Open Sans, sans-serif;
    width            : 100%;
  }

  body,
  p {
    margin: 0;
  },

  ul {
    list-style: none;
  }
`;
