import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import s from 'styled-components'
import moment from 'moment'
import uuid from 'uuid'

import { ErrorMessage } from '../shared'
import { LIGHTER_BLUE, BORDER, MEDIUM_GRAY } from '../../styles/colors'
import { convertDate, pad } from '../../helperFunctions'

const HeaderRow = s.tr`
  background: transparent !important;
  border-bottom: 3px solid ${BORDER};
`

const BodyRow = s.tr`
  border-bottom: 0;

  td {
    border: 0;
  }

  &.selected {
    background: ${LIGHTER_BLUE};
    border-radius: 4px;

    &:hover,
    &:focus,
    &:active {
      background: ${LIGHTER_BLUE};
    }
  }
`

const week = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const getDay = date => {
  const obj = moment(date)
  const dayNum = obj.day()
  const today = moment().day()

  if (today === dayNum) return 'Today'
  if (dayNum === (today + 1) % 7) return 'Tomorrow'

  return week[dayNum]
}

const isRightNow = (meal, date) => {
  if (!meal) {
    return false
  }

  const { starttime, endtime } = meal
  const dateObj = new Date()
  const currTime = `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`

  const today = getDay(dateObj)

  return today === date && starttime <= currTime && currTime <= endtime
}

const List = ({ venueHours }) => {
  if (!venueHours || !venueHours.length) {
    return null
  }

  const formattedVenueHours = venueHours.map(venueHour => {
    return Object.assign({}, venueHour, {
      date: getDay(venueHour.date),
    })
  })

  // Else, return the hours in a table
  return (
    <table className="table is-fullwidth" style={{ marginBottom: 0 }}>
      <tbody>
        {formattedVenueHours.map((venueHour, idx) => {
          const meals = venueHour.dayparts
          meals.sort((a, b) => (a.starttime > b.starttime ? 1 : -1))
          return (
            <React.Fragment key={uuid()}>
              <HeaderRow>
                <th style={{ width: '12rem' }}>{venueHour.date}</th>
                <th>{idx === 0 && 'Meal'}</th>
                <th>{idx === 0 && 'From'}</th>
                <th>{idx === 0 && 'To'}</th>
              </HeaderRow>
              {meals.length ? (
                meals.map(meal => (
                  <BodyRow
                    key={`${meal.label}-${meal.starttime}-${meal.endtime}`}
                    className={isRightNow(meal, venueHour.date) && 'selected'}
                  >
                    <td style={{ width: '12rem' }} />
                    <td>{meal.label}</td>
                    <td>{convertDate(meal.starttime)}</td>
                    <td>{convertDate(meal.endtime)}</td>
                  </BodyRow>
                ))
              ) : (
                <BodyRow>
                  <td style={{ width: '12rem' }} />
                  <td>
                    <i style={{ color: MEDIUM_GRAY }}>Closed</i>
                  </td>
                  <td />
                  <td />
                </BodyRow>
              )}
            </React.Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

const HoursVisualization = ({ venueHours }) => {
  if (!venueHours) {
    return <ErrorMessage message="Failed to load hours of operation." />
  }

  return <List venueHours={venueHours} />
}

List.propTypes = {
  venueHours: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      type: PropTypes.string,
      open: PropTypes.string,
      close: PropTypes.string,
    })
  ).isRequired,
}

HoursVisualization.propTypes = {
  venueHours: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      type: PropTypes.string,
      open: PropTypes.string,
      close: PropTypes.string,
    })
  ).isRequired,
}

const mapStateToProps = state => ({
  venueHours: state.dining.venueHours,
})

export default connect(
  mapStateToProps,
  null
)(HoursVisualization)
