import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Row,
  Col,
  Text,
} from '../shared'
import { DARK_GRAY } from '../../styles/colors'

const LaundryCardHeader = ({ title }) => (
  <Card padding="0.5rem 1rem" hoverable>
    <Row>
      <Col padding="0">
        <Text medium marginBottom="0" color={DARK_GRAY}>
          {title}
        </Text>
      </Col>
    </Row>
  </Card>
)

LaundryCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default LaundryCardHeader
