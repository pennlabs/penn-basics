import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import s from 'styled-components'

import { Card, Text, Row, Col, Line } from '../shared'
import { DARK_GRAY } from '../../styles/colors'
import LaundryCardHeader from './LaundryCardHeader'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`
const LaundryCard = ({ locationObject }) => {
  const [expanded, setExpanded] = useState(false)

  const { halls, location } = locationObject

  // Check if the hall has only one location
  if (halls.length === 1) {
    return (
      <StyledLink to={`/laundry/${halls[0].id}`} key={uuid()}>
        <LaundryCardHeader title={location} />
        <Line />
      </StyledLink>
    )
  }

  return (
    <div>
      <div //eslint-disable-line
        key={uuid()}
        onClick={() => setExpanded(!expanded)}
      >
        <LaundryCardHeader title={location} />
      </div>

      {expanded &&
        halls.map(({ hall_name: hallName, id }) => (
          <StyledLink to={`/laundry/${id}`} key={`laundry${id}`}>
            <Card padding="0.5rem 1rem" hoverable>
              <Row>
                <Col padding="0 0 0 1rem">
                  <Text marginBottom="0">{hallName}</Text>
                </Col>
              </Row>
            </Card>
          </StyledLink>
        ))}

      <Line />
    </div>
  )
}

LaundryCard.defaultProps = {
  locationObject: {},
}

LaundryCard.propTypes = {
  locationObject: PropTypes.shape({
    location: PropTypes.string,
    halls: PropTypes.arrayOf(
      PropTypes.shape({
        hall_name: PropTypes.string,
        id: PropTypes.number,
        location: PropTypes.string,
      })
    ),
  }),
}

export default LaundryCard
