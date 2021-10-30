import { ListGroup } from 'react-bootstrap';
import styled from 'styled-components';

export const ListVisit = styled(ListGroup)`
  .list-group-item {
    background: ${props => `${props.theme.colors.background}A5`};
    color: ${props => props.theme.colors.reverseText};

    a {
      color: ${props => props.theme.colors.reverseText};
    }

    img {
      border: 2px solid ${props => props.theme.colors.primary};
      margin-top: 5px;
    }

    button {
      color: ${props => props.theme.colors.reverseText};
    }
  }
`;
