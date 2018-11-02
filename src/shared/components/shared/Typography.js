import styled from 'styled-components';

import { MEDIUM_GRAY } from '../../styles/colors';

export const Text = styled.p`
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
  line-height: 1.5;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  display: inline-block;
`;

export const Subtext = styled.p`
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
  padding-top: ${({ paddingTop }) => paddingTop || '0'};
  line-height: 1.5;
  width: auto;
  display: inline-block;
  font-size: 80%;
  color: ${MEDIUM_GRAY};
`;

export const Title = styled.h1`
  font-size: 150%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`;

export const Subtitle = styled.h2`
  font-size: 125%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`;
