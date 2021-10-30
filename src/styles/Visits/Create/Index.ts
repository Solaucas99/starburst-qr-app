import styled from 'styled-components';

export const CreateVisitForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  background: ${props => `${props.theme.colors.background}A5`};
  color: ${props => props.theme.colors.primary};
  flex: 1;
  width: 70%;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(18, 18, 18, 0.53);
  box-shadow: 5px 5px 15px 5px rgba(18, 18, 18, 0.53);
  font-size: 22px;
  border-right: 4px solid ${props => props.theme.colors.primary};
  border-radius: 10px;

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    padding: 10px;
    width: 90%;
    font-size: 17px;
    border-radius: 5px;
  }

  @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
    padding: 15px;
    width: 80%;
    font-size: 19px;
    border-radius: 7px;
  }

  button {
    font-size: 16px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      font-size: 12px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      font-size: 14px;
    }
  }

  button.dropToggle {
    border: none;
    padding: 10px 20px;
    display: flex;
    position: relative;
    background: ${props => `${props.theme.colors.buttonText}`};
    color: ${props => props.theme.colors.reverseText};
    border-left: 4px solid ${props => props.theme.colors.primary};

    .icon {
      position: absolute;
      right: 0;
      font-size: 25px;
    }
  }

  input#visitor {
    &:focus {
      border: none;
    }
  }

  label {
    width: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 15px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      width: 100%;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      width: 90%;
    }

    input,
    select {
      padding: 10px 20px;
      border: none;
      background: ${props => `${props.theme.colors.buttonText}`};
      color: ${props => props.theme.colors.reverseText};
      border-left: 4px solid ${props => props.theme.colors.primary};
    }
  }
`;

export const VisitorListContainer = styled.div`
  width: 100%;
  position: relative;
  display: none;
  z-index: 3;

  div.visitorFindContainer {
    width: 100%;
    position: absolute;
    flex: 1;
    background: ${props => props.theme.colors.background};
    padding: 15px;
    border-radius: 5px;
    visibility: hidden;
    opacity: 0;
    max-height: 0px;
    transition: max-height 0.15s ease-out;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      padding: 5px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      padding: 10px;
    }

    * {
      opacity: 0;
      transition: all 0.5s;
    }

    &.animateToggleDown {
      visibility: visible;
      opacity: 1;
      line-height: 1;
      transition: max-height 0.25s ease-in;
      max-height: 300px;

      * {
        opacity: 1;
        transition: all 0.5s;
      }
    }

    span.inputSpan {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 10px;

      input {
        width: 100%;
        padding: 5px 10px;
        background: ${props => `${props.theme.colors.buttonText}`};
        color: ${props => props.theme.colors.reverseText};
        border: none;
        border: 1px solid ${props => props.theme.colors.primary};
        margin-left: 5px;

        &::placeholder {
          color: ${props => props.theme.colors.reverseText};
        }
      }
    }

    ul.list-group {
      padding: 15px;
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0;
      padding: 15px;
      width: 100%;
      background: ${props => props.theme.colors.background};

      li.list-group-item {
        padding: 0px;
        width: 100%;
        background: ${props => props.theme.colors.buttonText};
        color: ${props => props.theme.colors.reverseText};
        position: relative;
        left: 0;
        border-left: 4px solid ${props => props.theme.colors.primary};
        overflow: hidden;
        transition: all 0.5s;
        margin: 2px 0px;
        border-bottom: none;

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100vh;
          top: 0;
          background: ${props => props.theme.colors.primary};
          transform: scaleX(0);
          transform-origin: left;
          transition: all 0.5s;
          z-index: 0;
        }

        &:hover::before {
          transform: scaleX(1);
        }

        &:hover {
          color: purple;
          left: 4px;
        }

        button {
          padding: 15px 0px;
          width: 100%;
          border: none;
          background: transparent;
          color: ${props => props.theme.colors.reverseText};
          transition: all 0.5s;
          position: relative;
          top: 0;
          left: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;

          &:hover {
            color: ${props => props.theme.colors.buttonText};
          }

          &:disabled {
            background: ${props => props.theme.colors.background};
            color: ${props => props.theme.colors.reverseText};
            &:hover {
              background: ${props => props.theme.colors.background};
            }
          }
        }
      }
    }
  }
`;
