import styled from 'styled-components';

export const FooterNav = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: ${props => props.theme.colors.footerColor};
  padding: 20px;
  font-size: 16px;
  color: ${props => props.theme.colors.footerText};
  /* grid-area: footer; */
  border-top: 3px solid ${props => props.theme.colors.primary};
  max-width: 100vw;
  position: static;
  bottom: 0;

  h1 {
    color: ${props => props.theme.colors.footerText};
  }

  div.social {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 15%;

    a.btnSocialIcons {
      button {
        font-size: 28px;
        background: transparent;
        border: none;
        transition: all 0.5s;
        color: ${props => props.theme.colors.footerText};
        padding: 10px;

        &:hover {
          color: ${props => props.theme.colors.primaryHover};
          transform: translateY(-10px);
        }
      }
    }
  }
`;
