import { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    max-height: 100vh;
  }

  100% {
    opacity: 1;
    max-height: 100vh;
  }
`

export const fadeOut = keyframes`
  0% {
    opacity: 1;
    max-height: 100vh;
  }

  100% {
    opacity: 0;
    max-height: 100vh;
  }
`

export const slideIn = keyframes`
  0% {
    opacity: 0;
    margin-top: 100%;
  }

  100% {
    opacity: 1;
    margin-top: calc(1rem + 5vh);
  }
`

export const slideOut = keyframes`
  0% {
    opacity: 1;
    margin-top: calc(1rem + 5vh);
  }

  100% {
    opacity: 0;
    margin-top: 100%;
  }
`
