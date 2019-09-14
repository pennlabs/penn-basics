// Import frameworks
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import s from 'styled-components'
import axios from 'axios'
import moment from 'moment'

import { Row, Col, Card, Subtitle, Subtext, Line, Circle } from '../shared'
import { DARK_GRAY } from '../../styles/colors'

const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`
const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
`
const FavoriteIcon = s.i`
  opacity: 0.75;
  color: orange
`

const convertDate = time => {
  const hour = parseInt(time.substring(0, time.indexOf(':')))
  const minute = parseInt(time.substring(time.indexOf(':') + 1))

  if (hour == 12) {
    return minute == 0 ? '12pm' : `12:${minute}pm`
  }

  if (hour >= 13)
    return minute == 0 ? `${hour - 12}pm` : `${hour - 12}:${minute}pm`
  return minute == 0 ? `${hour}am` : `${hour}:${minute}am`
}

const pad = number => {
  return number < 10 ? `0${number}` : `${number}`
}

class DiningCard extends Component {
  constructor(props) {
    super(props)
    const { venueId } = this.props

    this.state = { venueHours: [] }

    if (venueId) {
      axios
        .get(`https://api.pennlabs.org/dining/hours/${venueId}`)
        .then(response => {
          let venueHours = response.data.cafes[venueId].days
          let currDate = moment().format()
          currDate = currDate.substring(0, currDate.indexOf('T'))
          venueHours = venueHours.filter(hour => hour.date === currDate)

          if (venueHours) {
            venueHours = venueHours[0].dayparts
            this.setState({ venueHours })
          }
        })
        .catch(() => {
          this.setState({ hours: [] })
        })
    }
  }

  renderSubtext() {
    const { showMealLabels } = this.props
    const { venueHours } = this.state

    // get the array of hours that are opened today
    const date = new Date()
    const currTime = pad(date.getHours()) + ':' + pad(date.getMinutes())
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

  render() {
    const { venueId, name, image, isFavorited } = this.props

    // Images are served through the public folder
    const img = `/img/venue_images/${image}`

    return (
      <StyledLink to={`/dining/${venueId}`}>
        <Card padding="0.5rem 1rem" hoverable key={venueId}>
          <Row>
            {image && (
              <Col backgroundImage={img} width="30%" borderRadius="4px" />
            )}
            <Col padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}>
              <Content>
                <Subtitle marginBottom="0">
                  {isFavorited ? <FavoriteIcon className="fas fa-star"/> : null}
                  &nbsp;
                  {name}
                </Subtitle>

                {this.renderSubtext()}
              </Content>
            </Col>
          </Row>
        </Card>
        <Line />
      </StyledLink>
    )
  }
}

DiningCard.defaultProps = {
  image: null,
  showMealLabels: true,
}

DiningCard.propTypes = {
  image: PropTypes.string,
  venueId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  showMealLabels: PropTypes.bool,
}

export default DiningCard
