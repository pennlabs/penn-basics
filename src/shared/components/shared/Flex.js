import s from 'styled-components'

import { BORDER } from '../../styles/colors'
import { maxWidth, PHONE } from '../../styles/sizes'

export const Row = s.div`
  width: 100%;
  display: flex;
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
`

export const Col = s.div`
  padding: ${({ padding }) => padding || 0};
  flex: ${({ width }) => (width ? 'none' : 1)};
  width: ${({ width }) => width || 'auto'};
  background-image: ${({ backgroundImage }) =>
    `url(${backgroundImage})` || 'none'};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background: ${({ background }) => background || ''};
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};
  overflow-x: ${({ overflowX }) => overflowX || 'visible'};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || 0};
  border-right: ${({ borderRight }) => borderRight && `1px solid ${BORDER}`};
`

export const Spacer = s.div`
  display: block;
  width: 100%;
  height: 1rem;
`

export const ColSpace = s(Col)`
  flex: none;
  width: ${({ width }) => width || '1rem'};

  ${maxWidth(PHONE)} {
    display: none;
  }
`
