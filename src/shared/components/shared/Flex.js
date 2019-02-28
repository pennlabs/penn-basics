import styled from 'styled-components';

import { BORDER } from '../../styles/colors';

export const Row = styled.div`
  width: 100%;
  display: flex;
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};
`;

export const Col = styled.div`
  padding: ${({ padding }) => padding || 0};
  flex: ${({ width }) => (width ? 'none' : 1)};
  width: ${({ width }) => width || 'auto'};
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})` || 'none'};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background: ${({ background }) => background || ''};
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  overflow-y: ${({ overflowY }) => overflowY || 'hidden'};
  overflow-x: ${({ overflowX }) => overflowX || 'visible'};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || 0};
  border-right: ${({ borderRight }) => borderRight && `1px solid ${BORDER}`};
`;
