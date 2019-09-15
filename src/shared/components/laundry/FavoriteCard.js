import React from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import s from 'styled-components'

import { Card, Text, Row, Line, Col } from '../shared'

import { DARK_GRAY } from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`

const FavoriteCard = ({ hallId, locationName }) => {
  return (
    <StyledLink to={`/laundry/${hallId}`} key={uuid()}>
      <Card padding="0.5rem 1rem" hoverable>
        <Row>
          <Col padding="0">
            <Text medium color={DARK_GRAY} marginBottom="0">
              {locationName}
            </Text>
          </Col>
        </Row>
      </Card>
      <Line />
    </StyledLink>
  )
}

export default FavoriteCard
