import s from 'styled-components';

import { LIGHTER_BLUE, BLUE } from '../../styles/colors';

import { Col } from './Flex';

export const Scrollbar = s(Col)`
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
`;
