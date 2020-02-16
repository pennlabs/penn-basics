import s from 'styled-components'

import { WHITE, LIGHTER_BLUE, BLUE } from '../../styles/colors'

import { Col } from './Flex'
import { maxWidth, PHONE, minWidth, MAX_BODY_HEIGHT } from '../../styles/sizes'

export const Scrollbar = s(Col)`
  background: ${WHITE};

  ${minWidth(PHONE)} {
    overflow-y: scroll;
    overflow-x: hidden;
  
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
  }
  
  ${({ fullHeight }): string =>
    (fullHeight && `height: ${MAX_BODY_HEIGHT};`) || ''}
  ${({ minHeight }): string => (minHeight && `min-height: ${minHeight};`) || ''}

  // Make full height on mobile
  ${maxWidth(PHONE)} {
    max-height: none !important;
    overflow: visible;
    height: auto !important;
  }
`
