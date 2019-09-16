import React from 'react'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import s from 'styled-components'
import PropTypes from 'prop-types'

import { Card, Text, Row, Line, Col } from '../shared'

import { DARK_GRAY } from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`

const FavoriteCard = ({ favorite }) => {
  const { hallId, locationName } = favorite
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

FavoriteCard.defaultProps = {
  favorite: null,
}

FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    hallId: PropTypes.string,
    locationName: PropTypes.string,
  }),
}

export default FavoriteCard
