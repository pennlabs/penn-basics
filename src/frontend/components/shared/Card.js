import styled from 'styled-components'
import { WHITE, SHADOW, FOCUS_GRAY, BORDER, PURPLE } from '../../styles/colors'

export const Card = styled.div`
  background: ${({ background }) => background || WHITE};
  padding: ${({ padding }) => padding || '1rem'};
  box-shadow: ${({ shade }) => (shade ? `0 0 14px 0 ${SHADOW}` : 'none')};
  opacity: 1;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};

  ${({ selected }) => selected && `border-left: 6px solid ${PURPLE}`}

  ${({ hoverable }) =>
    hoverable &&
    `
    &:hover {
      background: ${FOCUS_GRAY};
    }
  `}
`

export const BorderedCard = styled(Card)`
  border: 1px solid ${BORDER};
  border-radius: 4px;
  margin-bottom: 1rem;
`
