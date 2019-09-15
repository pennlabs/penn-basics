import styled from 'styled-components'
import { WHITE, SHADOW, FOCUS_GRAY, BORDER } from '../../styles/colors'

export const Card = styled.div`
  background: ${({ background }) => background || WHITE};
  padding: ${({ padding }) => padding || '1rem'};
  box-shadow: ${({ shade }) => (shade ? `0 0 14px 0 ${SHADOW}` : 'none')};
  opacity: 1;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};

  ${({ hoverable }) =>
    hoverable &&
    `
    &:hover {
      background: ${FOCUS_GRAY};
    }
  `}
`

// box-shadow: 0 0 8px 0 ${SHADOW};

export const BorderedCard = styled(Card)`
  border: 1px solid ${BORDER};
  border-radius: 4px;
  margin-bottom: 1rem;
`
