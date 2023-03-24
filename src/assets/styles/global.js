import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Sora', sans-serif;
      }
    body {
        background: ${({ theme }) => theme.colors.background};
        --webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
    font-family: 'Sora', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    }

    button {
      cursor: pointer;
    }

`;
