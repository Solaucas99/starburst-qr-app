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
  z-index: 5;

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
  background: ${props => `${props.theme.colors.background}9a`};
  padding: 40px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: center;
  width: 70%;
  height: 90%;
  overflow: hidden;
  border-right: 5px solid ${props => props.theme.colors.primary};
  box-shadow: 0 5px 5px 0px #121214c0;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    margin-bottom: 10px;
    padding: 20px 10px;
    width: 90%;
    font-size: 15px;
    min-height: 400px;
  }

  @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
    margin-bottom: 10px;
    width: 100%;
    font-size: 15px;
  }

  small {
    font-size: 14px;

    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      font-size: 12px;
    }
  }

  span {
    font-size: 25px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      font-size: 23px;
    }
  }

  form {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    padding: 0px 5px;

    div.formLabel {
      width: 100%;
      position: relative;
      overflow: hidden;

      svg {
        top: 30px;
        left: 5px;
        position: relative;
        font-size: 20px;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          font-size: 15px;
          left: 5px;
        }

        @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
          font-size: 15px;
          left: 5px;
        }
      }

      label {
        width: 100%;
        font-size: 18px;
        color: ${props => props.theme.colors.primary};
        position: absolute;
        top: 30px;
        left: 30px;
        cursor: text;
        z-index: 0;
        transition: translate 0.5s ease-in-out;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          font-size: 14px;
          left: 25px;
          top: 30px;
        }

        @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
          font-size: 14px;
          left: 30px;
        }
      }

      input {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        border: none;
        border-bottom: 1px solid ${props => props.theme.colors.primary};
        background: transparent;
        color: ${props => props.theme.colors.primary};
        padding: 10px;
        padding-left: 30px;
        position: relative;
        z-index: 3;
        outline: none;
        font-size: 16px;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          padding-left: 25px;
          font-size: 15px;
        }

        @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
          padding-left: 30px;
          font-size: 14px;
        }

        &:focus,
        &:valid {
          box-shadow: none;

          & ~ label {
            animation: labelAnimation 0.5s;
            animation-fill-mode: both;
          }

          @keyframes labelAnimation {
            100% {
              font-size: 12px;
              top: 15px;
            }
          }
        }
      }
    }

    div.checkboxDiv {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 10px 0;

      @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
        padding: 5px 0;
      }

      @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
        padding: 5px 0;
      }

      label {
        font-size: 16px;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          font-size: 12px;
        }

        @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
          font-size: 14px;
        }

        input[type='checkbox'] {
          margin-left: 10px;

          @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
            margin-left: 5px;
          }

          @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
            margin-left: 5px;
          }
        }
      }
    }

    /* label {
      margin-top: 5px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-flow: row;
      position: absolute;

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
      padding-left: 0px;
      background: transparent;
      border-bottom: 1px solid ${props => props.theme.colors.primary};
      position: relative;

      &[type='checkbox'] {
        box-sizing: border-box;
      width: 100%;
      height: 50px;
      border: none;
      color: #000000;
      padding: 5px;
      padding-left: 0px;
      background: transparent;
      border-bottom: 1px solid ${props => props.theme.colors.primary};
        padding: 1px;
        height: 20px;
      }

      &:focus {
        box-shadow: none;
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
    } */

    button {
      color: ${props => props.theme.colors.buttonText};
      border: none;
      transition: ease-in 0.2s;
      background: ${props => props.theme.colors.primary};
      padding: 15px 25px;
      width: 100%;
      font-size: 18px;
      margin-top: 20px;

      &:hover {
        background: ${props => props.theme.colors.primaryHover};
      }
    }
  }
`;
