import React from 'react'
import s from 'styled-components'
import { Col, IColProps } from './Flex'

interface IWrapper {
  background?: string
  color?: string
}

const Wrapper = s.div<IWrapper>`
  border-radius: 4px;
  padding: 0.5rem 0;
  width: 100%;
  background: ${({ background }): string|undefined => background};

  h1, p {
    color: ${({ color }): string|undefined => color};
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

type ILaundryOverviewProps = IColProps & IWrapper

export const LaundryOverview: React.FC<ILaundryOverviewProps> = ({
  color,
  children,
  background,
  ...rest
}) => (
  <Col {...rest} style={{ marginBottom: '1rem' }}>
    <Wrapper color={color} background={background}>
      {children}
    </Wrapper>
  </Col>
)
