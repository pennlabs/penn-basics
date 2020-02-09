import styled, { css, keyframes } from 'styled-components'

import {
  MEDIUM_GRAY,
  LIGHTER_BLUE,
  DARK_GRAY,
  BORDER,
} from '../../styles/colors'

const ghostLoad = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0.5;
  }
`

export const NavHeader = styled.p`
  padding: 0.5rem 1rem;
  margin-bottom: 0 !important;
`

interface ITextProps {
  marginBottom?: string
  fullWidth?: boolean
  color?: string
  medium?: boolean
}

export const Text = styled.p<ITextProps>`
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
  line-height: 1.5;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: inline-block;
  ${({ color }) => color && `color: ${color} !important;`}
  ${({ medium }) => medium && 'font-weight: 500;'}
`

export const Tag = styled.p`
  background: ${LIGHTER_BLUE};
  color: ${MEDIUM_GRAY};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  font-size: 80%;
`

interface ISubtextProps {
  loading?: boolean
  marginBottom?: string
  paddingTop?: string
}

export const Subtext = styled.p<ISubtextProps>(
  ({ loading, marginBottom, paddingTop }) => css`
    margin-bottom: ${ marginBottom || '1rem'};
    padding-top: ${ paddingTop || '0'};
    line-height: 1.5;
    width: auto;
    display: inline-block;
    font-size: 80%;
    color: ${MEDIUM_GRAY};
    ${loading &&
      css`
        color: transparent !important;
        background: ${BORDER};
        border-radius: 4px;
        animation: ${ghostLoad} 100ms ease;
      `}
  `
)

interface ITitleProps {
  marginBottom?: string
}

export const Title = styled.h1<ITitleProps>`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`

export const Subtitle = styled.h2<ITitleProps>`
  font-size: 125%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`

export const StyledLink = styled.a`
  color: ${DARK_GRAY} !important;

  h1,
  h2,
  p {
    color: ${DARK_GRAY};
  }
`
