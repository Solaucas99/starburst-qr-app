import styled from 'styled-components';

export const VisitorPopupCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  background-color: rgba(12, 12, 12, 0.8);
  width: 100%;
  height: 100vh;
  top: 0;
  font-size: 25px;
  overflow: hidden;

  div {
    top: 0px;
    position: relative;
    border-radius: 10px;
    border: 2px solid ${props => props.theme.colors.primaryHover};
    border-right: 8px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.background};
    width: 50%;
    color: ${props => props.theme.colors.primary};
    padding: 25px;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      input {
        margin-top: 10px;
        padding: 10px;
      }

      button {
        padding: 5px 10px;
        border: none;
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.buttonText};
        margin-top: 10px;
      }
    }
  }
`;

export const VisitorRegisterContainer = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 40px 20px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: center;
  width: 60%;
  overflow: hidden;
  border: 2px solid #aaa;
  border-right: 15px solid ${props => props.theme.colors.primary};
  border-radius: 10px;

  small {
    font-size: 14px;
    margin-bottom: 10px;
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

    label {
      margin-top: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-flow: row;

      input[type='checkbox'] {
        width: 5%;
        height: 20px;
      }
    }

    input {
      box-sizing: border-box;
      width: 100%;
      height: 50px;
      border: none;
      color: #000000;
      padding: 5px;
      padding-left: 45px;

      &[type='checkbox'] {
        padding: 1px;
        height: 20px;
      }

      &:focus {
        box-shadow: none;
      }

      &[name='email'] {
        background-image: url('/icons/mail.svg');
        background-position: 7px 10px;
        background-repeat: no-repeat;
        background-size: 30px;
      }

      &[name='name'] {
        background-image: url('/icons/user.svg');
        background-position: 7px 10px;
        background-repeat: no-repeat;
        background-size: 30px;
      }

      &[name='cpf'] {
        background-image: url('/icons/name.svg');
        background-position: 7px 5px;
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

      &:hover {
        background: ${props => props.theme.colors.primaryHover};
      }
    }
  }
`;
