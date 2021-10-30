import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

export const PopupContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: #121212e5;
  top: 0;
  z-index: 87872;
`;

export const Popup = styled(Alert)`
  background: ${props => `${props.theme.colors.popupBackground}E5`};
  padding: 50px;
  border-right: 10px solid ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  font-size: 20px;
  color: ${props => props.theme.colors.buttonText};

  button:not(.btn-close) {
    margin: 5px 10px;
    padding: 8px;
    background: none;
    border-radius: 10px;
    transition: all 0.5s;
    color: ${props => props.theme.colors.buttonText};

    &:first-child {
      border: 2px solid green;

      &:hover {
        background: green;
        color: ${props => props.theme.colors.reverseText};
      }
    }

    &:last-child {
      border: 2px solid red;

      &:hover {
        background: red;
        color: ${props => props.theme.colors.reverseText};
      }
    }
  }
`;
