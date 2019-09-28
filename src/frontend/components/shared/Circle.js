import styled from 'styled-components'

import { GREEN, BORDER } from '../../styles/colors'

export const Circle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ open }) => (open ? GREEN : BORDER)};
`
