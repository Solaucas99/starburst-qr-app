import styled from 'styled-components';

export const List = styled.ul`
  background: ${props => `${props.theme.colors.background}A5`};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px;
  list-style: none;
  width: 100%;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(18, 18, 18, 0.53);
  box-shadow: 5px 5px 15px 5px rgba(18, 18, 18, 0.53);
  font-size: 22px;
  border-right: 4px solid ${props => props.theme.colors.primary};
  border-radius: 10px;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    font-size: 15px;
    border-right: 2px solid ${props => props.theme.colors.primary};
    padding: 15px;
    border-radius: 5px;
  }

  @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
    font-size: 19px;
    border-right: 2px solid ${props => props.theme.colors.primary};
    padding: 20px;
    border-radius: 7px;
  }

  li:not(li:last-child) {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 20px 20px;
    border-left: 4px solid ${props => props.theme.colors.primary};
    margin-top: 5px;
    background: ${props => `${props.theme.colors.buttonText}`};
    color: ${props => props.theme.colors.reverseText};
    font-size: 20px;
    border-radius: 5px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      padding: 10px 10px;
      font-size: 14px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      padding: 15px 15px;
      font-size: 16px;
    }
  }

  li:last-child {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px 20px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      padding: 5px 10px;
      font-size: 14px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      padding: 7px 15px;
      font-size: 16px;
    }

    button {
      color: ${props => props.theme.colors.reverseText};
      margin: 5px;

      @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
        padding: 5px 10px;
        font-size: 14px;
      }

      @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
        padding: 7px 15px;
        font-size: 16px;
      }
    }
  }
`;
