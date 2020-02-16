import React, { useState, useEffect } from 'react'
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
  width: ${({ displayInLine }): string => (displayInLine ? '0' : '100%')};
  padding: ${({ padding }): string => padding || '1rem 0'};
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: ${({ hide }): string => (hide ? '0' : '1')};
  display: ${({ displayInLine }): string =>
    displayInLine ? 'inline-block' : 'block'} ;
  transform: ${({ translateY }): string => `translateY(${translateY})`}
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

interface ILoadingCircle {
  size?: string
  thickness?: string
}

const LoadingCircle = s.span<ILoadingCircle>`
  display: inline-block;
  width: ${({ size }): string => size || SIZE};
  height: ${({ size }): string => size || SIZE};
  border-radius: 50%;
  border-width: ${({ thickness }): string => thickness || THICKNESS};
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
}: ILoadingProps): React.ReactElement => {
  const [hidden, toggleHidden] = useState(true)

  useEffect(() => {
    if (hidden) {
      const timer = setTimeout(() => {
        toggleHidden(false)
      }, delay || DEFAULT_DELAY)
      return (): void => clearTimeout(timer)
    }

    // No cleanup needed if there is no timeout
    return (): void => undefined
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

export default Loading
