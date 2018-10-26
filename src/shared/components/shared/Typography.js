import styled from 'styled-components';

export const Text = styled.p`
  line-height: 1.25;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
  line-height: 1.5;
`;

export const Title = styled.h1`
  font-size: 175%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`;

export const Subtitle = styled.h2`
  font-size: 150%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
  line-height: 1.25;
`;
