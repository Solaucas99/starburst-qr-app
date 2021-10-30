import styled from 'styled-components';

export const EmailConfirmationPopup = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background: ${props => `${props.theme.colors.reverseText}`};
  border-top: 3px solid ${props => `${props.theme.colors.primary}`};
  height: 150px;
  width: 100%;
  overflow: auto;
  box-shadow: 0 5px 5px 0 rgba(12, 12, 12, 0.2);
  padding: 20px;

  button.close {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 10px;
    border: none;
    background: transparent;
    color: ${props => `${props.theme.colors.background}`};
    font-size: 30px;
    transition: all 0.5s;

    &:hover {
      color: ${props => `${props.theme.colors.primaryHover}`};
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    height: 80%;
    position: relative;
    padding: 4px 20px;
    color: ${props => `${props.theme.colors.background}`};

    svg {
      margin-right: 5px;
    }

    span {
      font-size: 14px;
    }

    a {
      margin-top: 5px;
      color: ${props => `${props.theme.colors.background}`};
      transition: all 0.5s;

      &:hover {
        color: ${props => `${props.theme.colors.primaryHover}`};
      }
    }
  }
`;
