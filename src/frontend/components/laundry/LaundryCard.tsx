import React, { useState } from 'react'
import Link from 'next/link'

import { Card, Text, Row, Col, Line, StyledLink } from '../shared'
import LaundryCardHeader from './LaundryCardHeader'
import {
  LAUNDRY_HALL_ROUTE,
  LAUNDRY_HALL_QUERY_ROUTE,
} from '../../constants/routes'
import { ILaundryHall } from '../../../types'

interface ILaundryCardProps {
  locationObject: ILaundryHall
  selectedHallId: number
}

const LaundryCard = ({ locationObject, selectedHallId }: ILaundryCardProps) => {
  const [expanded, setExpanded] = useState(false)

  const { halls, location } = locationObject

  // Check if the hall has only one location
  if (halls.length === 1) {
    const { id } = halls[0]
    return (
      <Link
        href={LAUNDRY_HALL_QUERY_ROUTE(`${id}`)}
        as={LAUNDRY_HALL_ROUTE(`${id}`)}
        key={`laundry-hall-${location}-${id}`}
      >
        <StyledLink>
          <LaundryCardHeader
            title={location}
            selected={Number(id) === selectedHallId}
          />
          <Line />
        </StyledLink>
      </Link>
    )
  }

  return (
    <>
      <div // eslint-disable-line
        onClick={() => setExpanded(!expanded)}
      >
        <LaundryCardHeader title={location} hasDropdown expanded={expanded} />
      </div>

      {expanded &&
        halls.map(({ hall_name: hallName, id }) => (
          <Link
            href={LAUNDRY_HALL_QUERY_ROUTE(`${id}`)}
            as={LAUNDRY_HALL_ROUTE(`${id}`)}
            key={`laundry-hall-link-${id}`}
          >
            <Card
              padding="0.5rem 1rem"
              hoverable
              selected={Number(id) === selectedHallId}
            >
              <Row>
                <Col padding="0 0 0 1rem">
                  <Text marginBottom="0">{hallName}</Text>
                </Col>
              </Row>
            </Card>
          </Link>
        ))}

      <Line />
    </>
  )
}

export default LaundryCard
