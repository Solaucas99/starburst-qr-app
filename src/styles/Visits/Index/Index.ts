import styled from 'styled-components';

import { ListGroup } from 'react-bootstrap';

export const ExternalList = styled.div`
  width: 100%;
  flex: 1;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => `${props.theme.colors.background}B4`};
  padding: 20px 0px;
  font-size: 21px;
  overflow: auto;
  -webkit-box-shadow: 5px 5px 15px 5px rgba(18, 18, 18, 0.53);
  box-shadow: 5px 5px 15px 5px rgba(18, 18, 18, 0.53);

  @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
    padding: 10px 0px;
    font-size: 16px;
  }

  @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
    padding: 10px 0px;
    font-size: 18px;
  }

  .pagination {
    margin-top: 20px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      margin-top: 10px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      margin-top: 15px;
    }
  }

  form {
    padding: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      font-size: 14px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      font-size: 16px;
    }

    input {
      margin-right: 10px;
      margin-left: 10px;
      padding: 10px 25px;
      border-radius: 5px;
      width: 100%;
      border: none;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 200px;

    .divList {
      width: 70%;
      flex-direction: row;
      margin-top: 5px;

      span {
        margin-right: 19px;
        background: ${props => props.theme.colors.textGradient};
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 25px;

        @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
          margin-right: 9px;
          font-size: 15px;
        }

        @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
          margin-right: 12px;
          font-size: 15px;
        }
      }

      li {
        span {
          margin-right: 19px;
          color: purple;
          -webkit-text-fill-color: inherit;
          background: inherit;
          font-size: 15px;
        }
      }
    }
  }
`;

export const List = styled(ListGroup)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  table {
    width: 100%;
    padding: 20px;
    margin-top: 10px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      padding: 10px;
      margin-top: 5px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      padding: 15px;
      margin-top: 8px;
    }
  }

  tbody {
    padding: 10px;
    border-top: 1px solid ${props => props.theme.colors.primary};
    border-bottom: 1px solid ${props => props.theme.colors.primary};
    font-size: 20px;
    background-color: transparent;
    color: ${props => props.theme.colors.reverseText};
    width: 100%;
    border-radius: 10px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      font-size: 10px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      font-size: 15px;
    }
  }

  tr {
    align-items: center;

    th {
      color: ${props => props.theme.colors.reverseText};
      padding: 20px;
      font-size: 18px;

      @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
        font-size: 14px;
      }

      @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
        font-size: 16px;
      }
    }
  }

  td {
    width: 20%;
    padding: 20px;
    color: ${props => props.theme.colors.reverseText};
    border-radius: 10px;
    font-size: 16px;

    @media screen and (max-width: 450px) and (min-height: 400px) and (max-height: 950px) {
      font-size: 12px;
    }

    @media screen and (max-width: 900px) and (min-height: 951px) and (max-height: 1250px) {
      font-size: 14px;
    }

    a {
      color: inherit;
    }

    button {
      border: none;
      color: inherit;
      padding: 10px;
      border-radius: 50%;
      background: ${props => props.theme.colors.background};

      &:hover {
        color: ${props => `${props.theme.colors.primaryHover}A5`};
        cursor: pointer;
        transition: all 0.5s;
      }
    }

    &:first-child {
      margin-right: 19px;
      background: ${props => props.theme.colors.textGradient};
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 25px;
    }
  }
`;
