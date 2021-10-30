import styled from 'styled-components';

export const Spinner = styled.span`
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 1200;
  background: rgba(12, 12, 12, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0px;
  font-size: 25px;
  overflow: hidden;

  p {
    margin-top: 20px;
  }

  span {
    width: 100px;
    height: 100px;
    border: 8px solid white;
    border-color: #808080;
    border-top-color: ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
