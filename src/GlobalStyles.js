import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  ${reset}
  body {
    align-items: center;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  input {
    all: unset;
  }
  button {
    all: unset;
  }
  `;
