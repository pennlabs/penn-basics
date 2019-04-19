import s from 'styled-components';

import { WHITE, LIGHTER_BLUE, BLUE } from '../../styles/colors';

import { Col } from './Flex';

export const Scrollbar = s(Col)`
  background: ${WHITE};
  overflowY: scroll;
  overflowX: hidden;

  ::-webkit-scrollbar {
    width: 6px;
    background-color: ${LIGHTER_BLUE};
  }

  ::-webkit-scrollbar-track {
    background-color: ${LIGHTER_BLUE};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${BLUE};
  }

  ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
`;
