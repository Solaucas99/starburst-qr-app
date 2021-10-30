import styled from 'styled-components';

export const VisitorFormContainer = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 40px 20px;
  font-size: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: center;
  width: 60%;
  overflow: hidden;
  border: 2px solid #aaa;
  border-right: 10px solid ${props => props.theme.colors.primary};
  border-radius: 10px;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    font-size: 14px;
    padding: 20px 10px;
    width: 80%;
    border-right: 5px solid ${props => props.theme.colors.primary};
  }

  @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
    font-size: 16px;
    padding: 25px 15px;
    width: 80%;
    border-right: 7px solid ${props => props.theme.colors.primary};
  }

  small {
    margin-top: 20px;
    font-size: 14px;
  }

  span {
    font-size: 35px;
  }

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    padding: 30px 10px;
    flex: 1;

    label {
      margin-top: 15px;
      width: 100%;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border: none;
      color: #000000;
      padding: 5px;
      padding-left: 45px;

      &:focus {
        box-shadow: none;
      }

      &[name='email'] {
        background-image: url('/icons/mail.svg');
        background-position: 7px 10px;
        background-repeat: no-repeat;
        background-size: 30px;
      }
    }

    button {
      color: ${props => props.theme.colors.buttonText};
      border: none;
      transition: ease-in 0.2s;
      background: ${props => props.theme.colors.primary};
      padding: 15px 25px;
      width: 100%;
      font-size: 24px;
      margin-top: 20px;

      @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
        font-size: 18px;
      }

      @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
        font-size: 16px;
      }

      &:hover {
        background: ${props => props.theme.colors.primaryHover};
      }
    }
  }
`;
