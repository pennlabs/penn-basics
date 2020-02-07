import styled from 'styled-components'

import { BORDER } from '../../styles/colors'

export const Line = styled.div`
  width: 100%;
  display: block;
  height: 1px;
  background: ${BORDER};
  opacity: 0.5;
  ${({ margin }) => margin && `margin: ${margin};`}
`
