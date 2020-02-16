import styled from 'styled-components'
import { BORDER } from '../../styles/colors'

interface ILine {
  margin?: string
}

export const Line = styled.div<ILine>`
  width: 100%;
  display: block;
  height: 1px;
  background: ${BORDER};
  opacity: 0.5;
  ${({ margin }): string => (margin ? `margin: ${margin};` : '')}
`
