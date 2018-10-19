import styled from 'styled-components';

export const Text = styled.p`
  line-height: 1.25;
  margin-bottom: ${({ marginBottom }) => marginBottom || '1rem'};
`;

export const Title = styled.h1`
  font-size: 175%;
  font-weight: bold;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0.5rem'};
`;
