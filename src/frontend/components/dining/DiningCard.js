import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'
import moment from 'moment'
import Link from 'next/link'

import { convertDate, pad } from '../../../utils/helperFunctions'
import {
  StyledLink,
  FlexRow,
  Col,
  Card,
  Subtitle,
  Subtext,
  Line,
  Circle,
} from '../shared'

import venueData from '../../../server/resources/dining/venue_info.json'

const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
`

const CardSubtext = ({ venueId, venueHours }) => {
  const showMealLabels = venueData[venueId].isRetail
    ? venueData[venueId].showMealLabels || false
    : true

  // get the array of hours that are opened today
  const date = new Date()
  const currTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  const openHours = venueHours.filter(hour => {
    return hour.starttime <= currTime && currTime <= hour.endtime
  })

  if (openHours.length === 0) {
    return (
      <>
        <Subtext marginBottom="0">Closed</Subtext>
        <Circle open={false} />
      </>
    )
  }

  return (
    <>
      <Subtext marginBottom="0">
        {openHours.map(({ starttime, endtime, label }, index) => (
          <span key={`${starttime}-${endtime}-${label}`}>
            {`${convertDate(starttime)} - ${convertDate(endtime)}${
              showMealLabels ? ` • ${label}` : ''
            }`}
            {index === openHours.length - 1 ? null : <br />}
          </span>
        ))}
      </Subtext>
      <Circle open />
    </>
  )
}

CardSubtext.defaultProps = {
  venueId: '',
  stateVenueHours: [],
}

CardSubtext.propTypes = {
  venueId: PropTypes.string,
  stateVenueHours: PropTypes.array, //eslint-disable-line
}

const DiningCard = ({
  venueId,
  selected,
  isFavorited,
  venueHours,
  showLine,
  style,
}) => {
  if (!venueHours) return null

  let currDate = moment().format()
  currDate = currDate.substring(0, currDate.indexOf('T'))
  let venueHour = venueHours[venueId]
  venueHour = venueHour.filter(hour => hour.date === currDate)

  venueHours = venueHour[0].dayparts

  const { name, image } = venueData[venueId]

  // Images are served through the public folder
  const img = `/img/venue_images/${image}`

  if (isFavorited) {
    return null
  }

  return (
    <Link href={`/dining?id=${venueId}`} as={`/dining/${venueId}`}>
      <StyledLink>
        <Card
          padding="0.5rem 1rem"
          hoverable
          key={venueId}
          selected={selected}
          style={style}
        >
          <FlexRow>
            {image && (
              <Col backgroundImage={img} width="30%" borderRadius="4px" />
            )}
            <Col padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}>
              <Content>
                <Subtitle marginBottom="0">{name}</Subtitle>
                <CardSubtext venueId={venueId} venueHours={venueHours} />
              </Content>
            </Col>
          </FlexRow>
        </Card>
        {showLine && <Line />}
      </StyledLink>
    </Link>
  )
}

DiningCard.defaultProps = {
  showLine: true,
  isFavorited: false,
  selected: false,
  style: {},
}

DiningCard.propTypes = {
  showLine: PropTypes.bool,
  venueId: PropTypes.string.isRequired,
  isFavorited: PropTypes.bool,
  selected: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line
}

export default DiningCard
