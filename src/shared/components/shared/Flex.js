import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
`;

export const Col = styled.div`
  padding: ${({ padding }) => padding || 0};
  flex: ${({ width }) => (width ? 'none' : 1)};
  width: ${({ width }) => width || 'auto'};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || 'none'};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
