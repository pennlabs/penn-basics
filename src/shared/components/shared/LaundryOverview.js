import s from 'styled-components'
import { Col } from './Flex'

export const LaundryOverview = s(Col)`
  margin-bottom: 1rem;
  border-radius: 4px;
  padding: 0.5rem 0;

  h1, p {
    color: ${({ color }) => color};
    text-align: center;
  }

  p {
    font-weight: 500;
  }

  h1 {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.2rem;
    line-height: 1;
  }
`
