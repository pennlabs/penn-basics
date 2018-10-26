import styled from 'styled-components';
import { WHITE, SHADOW } from '../../styles/colors';

export const Card = styled.div`
  background: ${WHITE};
  padding: ${({ padding }) => padding || '1rem'};
  box-shadow: ${({ shade }) => (shade ? `0 0 14px 0 ${SHADOW}` : 'none')};
  opacity: 1;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0'};
`;
