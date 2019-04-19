import React from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Row,
  Col,
  Subtitle,
} from '../shared'

const LaundryCardHeader = ({ title }) => (
  <Card padding="0.5rem 1rem" hoverable>
    <Row>
      <Col padding="0">
        <Subtitle marginBottom="0">
          {title}
        </Subtitle>
      </Col>
    </Row>
  </Card>
)

LaundryCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default LaundryCardHeader
