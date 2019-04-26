import styled from 'styled-components'

import { MEDIUM_GRAY, LIGHTER_BLUE } from '../../styles/colors'

export const Text = styled.p`
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

export const Subtext = styled.p`
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
  padding-top: ${({ paddingTop }) => paddingTop || '0'};
  line-height: 1.5;
  width: auto;
  display: inline-block;
  font-size: 80%;
  color: ${MEDIUM_GRAY};
`

export const Title = styled.h1`
  font-size: 150%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`

export const Subtitle = styled.h2`
  font-size: 125%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`
