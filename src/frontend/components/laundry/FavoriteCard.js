import React from 'react'
import uuid from 'uuid'
import PropTypes from 'prop-types'
import Link from 'next/link'

import { Card, Text, Row, Line, Col, StyledLink } from '../shared'

const FavoriteCard = ({ favorite }) => {
  const { hallId, locationName } = favorite
  return (
    <Link href={`/laundry?id=${hallId}`} as={`/laundry/${hallId}`} key={uuid()}>
      <StyledLink>
        <Card padding="0.5rem 1rem" hoverable>
          <Row>
            <Col padding="0">
              <Text medium marginBottom="0">
                {locationName}
              </Text>
            </Col>
          </Row>
        </Card>
        <Line />
      </StyledLink>
    </Link>
  )
}

FavoriteCard.defaultProps = {
  favorite: null,
}

FavoriteCard.propTypes = {
  favorite: PropTypes.shape({
    hallId: PropTypes.number,
    locationName: PropTypes.string,
  }),
}

export default FavoriteCard
