import React from 'react'
import uuid from 'uuid'
import Link from 'next/link'

import { Card, Text, Row, Line, Col, StyledLink } from '../shared'
import {
  LAUNDRY_HALL_ROUTE,
  LAUNDRY_HALL_QUERY_ROUTE,
} from '../../constants/routes'
import { IFavorite } from '../../../types/laundry'

interface IFavoriteCardProps {
  favorite: IFavorite
}

const FavoriteCard: React.FC<IFavoriteCardProps> = ({ favorite }) => {
  const { hallId, locationName } = favorite
  return (
    <Link
      href={LAUNDRY_HALL_QUERY_ROUTE(`${hallId}`)}
      as={LAUNDRY_HALL_ROUTE(`${hallId}`)}
      key={uuid()}
    >
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

export default FavoriteCard
