import styled from 'styled-components'

import { BLACK_ALPHA } from '../../styles/colors'
import { LONG_ANIMATION_DURATION } from '../../styles/sizes'
import { fadeIn, fadeOut } from './Animations'

const Z_INDEX = 1305

export const Shade = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  overflow-x: hidden;
  overflow-y: scroll;
  background: ${BLACK_ALPHA(0.5)};
  z-index: ${Z_INDEX};
  text-align: center;
  animation-name: ${({ isNewlyMounted, show }) => {
    if (isNewlyMounted) {
      return ''
    }
    if (show) {
      return fadeIn
    }

    return fadeOut
  }};
  animation-duration: ${LONG_ANIMATION_DURATION};
  max-height: ${({ show }) => (show ? '100vh' : '0vh')};
  opacity: ${({ show }) => (show ? '1' : '0')};
`
