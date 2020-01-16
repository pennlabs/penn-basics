import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import s, { keyframes } from 'styled-components'

import { Subtext } from './index'
import { BORDER, BLUE } from '../../styles/colors'

const SIZE = '2.5rem'
const THICKNESS = '0.25rem'
const TIMER = '1.25s'

const LoadingWrapper = s.div`
  width: 100%;
  padding: ${({ padding }) => padding || '1rem 0'};
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: ${({ hide }) => (hide ? '0' : '1')};
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const LoadingCircle = s.span`
  display: inline-block;
  width: ${SIZE};
  height: ${SIZE};
  border-radius: 50%;
  border-width: ${THICKNESS};
  border-style: solid;
  border-right-color: ${BORDER};
  border-left-color: ${BLUE};
  border-bottom-color: ${BLUE};
  border-top-color: ${BLUE};
  animation: ${spin} ${TIMER} infinite linear;
`

/**
 * @property title string to show below spinner
 * @property delay number in ms to wait before showing spinner
 * @property padding string around the spinner and title
 */
const Loading = ({ title, delay, padding }) => {
  const [hidden, toggleHidden] = useState(true)

  useEffect(() => {
    if (hidden) {
      const timer = setTimeout(() => {
        toggleHidden(false)
      }, delay)
      return () => clearTimeout(timer)
    }
    return () => {}
  })

  return (
    <LoadingWrapper hide={hidden} padding={padding}>
      <LoadingCircle />
      {title && <Subtext>{title}</Subtext>}
    </LoadingWrapper>
  )
}

Loading.defaultProps = {
  title: null,
  delay: 100,
  padding: undefined,
}

Loading.propTypes = {
  title: PropTypes.string,
  delay: PropTypes.number,
  padding: PropTypes.string,
}

export default Loading
