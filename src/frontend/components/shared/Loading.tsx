import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import s, { keyframes } from 'styled-components'

import { Subtext } from './index'
import { BORDER, BLUE } from '../../styles/colors'

const SIZE = '2.5rem'
const THICKNESS = '0.25rem'
const TIMER = '1.25s'
const DEFAULT_DELAY = 100

interface ILoadingWrapper {
  displayInLine?: boolean
  padding?: string
  hide?: boolean
  translateY?: string
}

const LoadingWrapper = s.div<ILoadingWrapper>`
  width: ${({ displayInLine }) => (displayInLine ? '0' : '100%')};
  padding: ${({ padding }) => padding || '1rem 0'};
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: ${({ hide }) => (hide ? '0' : '1')};
  display: ${({ displayInLine }) =>
    displayInLine ? 'inline-block' : 'block'} ;
  transform: ${({ translateY }) => `translateY(${translateY})`}
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

interface ILoadingCircle {
  size?: string
  thickness: string
}

const LoadingCircle = s.span<ILoadingCircle>`
  display: inline-block;
  width: ${({ size }) => size || SIZE};
  height: ${({ size }) => size || SIZE};
  border-radius: 50%;
  border-width: ${({ thickness }) => thickness || THICKNESS};
  border-style: solid;
  border-right-color: ${BORDER};
  border-left-color: ${BLUE};
  border-bottom-color: ${BLUE};
  border-top-color: ${BLUE};
  animation: ${spin} ${TIMER} infinite linear;
`

type ILoadingProps = ILoadingCircle &
  ILoadingWrapper & {
    title?: string
    delay?: number
  }

/**
 * @property title string to show below spinner
 * @property delay number in ms to wait before showing spinner
 * @property padding string around the spinner and title
 */
const Loading = ({
  title,
  delay,
  padding,
  displayInLine,
  size,
  translateY,
  thickness,
}: ILoadingProps) => {
  const [hidden, toggleHidden] = useState(true)

  useEffect(() => {
    if (hidden) {
      const timer = setTimeout(() => {
        toggleHidden(false)
      }, delay || DEFAULT_DELAY)
      return () => clearTimeout(timer)
    }
    return () => {}
  })

  return (
    <LoadingWrapper
      hide={hidden}
      padding={padding}
      displayInLine={displayInLine}
      translateY={translateY}
    >
      <LoadingCircle size={size} thickness={thickness} />
      {title && <Subtext>{title}</Subtext>}
    </LoadingWrapper>
  )
}

Loading.propTypes = {
  title: PropTypes.string,
  delay: PropTypes.number,
  padding: PropTypes.string,
  size: PropTypes.string,
  translateY: PropTypes.string,
  thickness: PropTypes.string,
  displayInLine: PropTypes.bool,
}

export default Loading
