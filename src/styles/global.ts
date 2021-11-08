import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      scroll-behavior: smooth;

      .theme-mode {
        font-size: 30px;
        margin: 0 12px 4px 12px;
        color: ${props => props.theme.colors.primary} !important;
        cursor: pointer;
      }
    }

    body {
      background-image: url(${props => props.theme.colors.backgroundImg});
      /* Set a specific height */
      min-height: 500px;
      /* Create the parallax scrolling effect */
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color: ${props => props.theme.colors.text};
      font: 400 16px 'Montserrat', sans-serif;
    }
`;
