import { createGlobalStyle } from 'styled-components';
import Font from '../../assets/fonts/HakgyoansimEunhasuR.woff2';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Hakgyoansim';
    src: url(${Font}) format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #F9F9FC;
    font-family: 'Hakgyoansim', sans-serif;
  }
  
`;

export default GlobalStyles;
