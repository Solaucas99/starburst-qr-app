import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  align-content: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

export const Logo = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    margin-bottom: 30px;
    padding: 5px;
  }

  @media screen and (min-width: 650px) and (min-height: 951px) and (max-height: 1250px) {
    margin-bottom: 20px;
    padding: 15px;
  }
`;

export const LoginContainer = styled.div`
  background: ${props => `${props.theme.colors.background}`};
  padding: 0;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: left;
  justify-content: space-around;
  width: 80%;
  overflow: hidden;
  display: flex;
  justify-self: center;
  height: 500px;
  flex-wrap: nowrap;
  border-right: 5px solid ${props => props.theme.colors.primary};
  box-shadow: 0 5px 5px 0px #121214c0;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    font-size: 15px;
    width: 90%;
  }

  div.loginDecoration {
    background: purple;
    height: 100%;
    width: 50%;

    img {
      height: 500px;
    }

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      display: none;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      display: none;
    }
  }
`;

export const AmplifyLoginContainer = styled.div`
  background: ${props => `${props.theme.colors.background}9a`};
  padding: 40px 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  justify-content: center;
  width: 50%;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    margin-bottom: 10px;
    padding: 20px 10px;
    width: 80%;
    font-size: 15px;
    min-height: 400px;
  }

  @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
    margin-bottom: 10px;
    width: 100%;
    font-size: 15px;
  }

  small {
    margin-top: 5px;
    font-size: 10px;

    @media screen and (max-width: 450px) and (min-height: 750px) and (max-height: 950px) {
      margin-top: 13px;
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
    flex-direction: column;
    width: 100%;
    padding: 0px 5px;

    div.formLabel {
      width: 80%;
      position: relative;
      overflow: hidden;
      margin-top: 5px;

      @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
        width: 100%;
      }

      svg {
        top: 30px;
        left: 15px;
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
        left: 45px;
        cursor: text;
        z-index: 0;
        transition: translate 0.5s ease-in-out;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          font-size: 12px;
          left: 25px;
          top: 35px;
        }

        @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
          font-size: 12px;
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
        padding-left: 45px;
        position: relative;
        z-index: 3;
        outline: none;
        font-size: 16px;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          padding-left: 25px;
          font-size: 13px;
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
