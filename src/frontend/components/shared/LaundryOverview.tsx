import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'
import { Col, ICol } from './Flex'

interface IWrapper {
  background?: string
  color?: string
}

const Wrapper = s.div<IWrapper>`
  border-radius: 4px;
  padding: 0.5rem 0;
  width: 100%;
  background: ${({ background }) => background};

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

type TLaundryOverview = ICol & IWrapper

export const LaundryOverview = ({
  color,
  children,
  background,
  ...rest
}: TLaundryOverview) => (
  <Col {...rest} style={{ marginBottom: '1rem' }}>
    <Wrapper color={color} background={background}>
      {children}
    </Wrapper>
  </Col>
)

LaundryOverview.propTypes = {
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
