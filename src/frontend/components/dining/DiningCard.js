import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'
import axios from 'axios'
import moment from 'moment'

import { convertDate, pad } from '../../helperFunctions'
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

const CardSubtext = ({ venueId, stateVenueHours }) => {
  const showMealLabels = venueData[venueId].isRetail
    ? venueData[venueId].showMealLabels || false
    : true

  // get the array of hours that are opened today
  const date = new Date()
  const currTime = `${pad(date.getHours())}:${pad(date.getMinutes())}`
  const openHours = stateVenueHours.filter(hour => {
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

const DiningCard = ({ venueId, isFavorited, selected, showLine, style }) => {
  // use React Hook to initialize state in a functional component
  const [stateVenueHours, setVenueHours] = useState([])

  // useEffect behaves like componentDidMount/Update/Unmount that takes in a function as
  // the first argument and an array as a second argument
  // useEffect will be triggered only if values in the second argument is modified
  // using an empty array ensures that useEffect is called only once
  useEffect(() => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    axios
      .get(`https://api.pennlabs.org/dining/hours/${venueId}`, {
        cancelToken: source.token,
      })
      .then(response => {
        let venueHours = response.data.cafes[venueId].days
        let currDate = moment().format()
        currDate = currDate.substring(0, currDate.indexOf('T'))
        venueHours = venueHours.filter(hour => hour.date === currDate)

        if (venueHours) {
          venueHours = venueHours[0].dayparts
          setVenueHours(venueHours) // set venueHours in state
        }
      })
      .catch(() => {})
    return () => {
      source.cancel()
    }
  }, [])

  if (!stateVenueHours) {
    return null
  }

  const { name, image } = venueData[venueId]

  // Images are served through the public folder
  const img = `/img/venue_images/${image}`

  if (isFavorited) {
    return null
  }

  return (
    <StyledLink to={`/dining/${venueId}`}>
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
              <CardSubtext
                venueId={venueId}
                stateVenueHours={stateVenueHours}
              />
            </Content>
          </Col>
        </FlexRow>
      </Card>
      {showLine && <Line />}
    </StyledLink>
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
