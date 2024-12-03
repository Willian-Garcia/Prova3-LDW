import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(0deg, rgba(46,119,114,1) 25%, rgba(0,13,12,1) 100%);
    color: #fff;
    height: 100vh;
    justify-content: center;
    align-content: center;
  }
`;