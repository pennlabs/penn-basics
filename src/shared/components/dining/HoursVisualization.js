import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import s from 'styled-components'
import moment from 'moment'

import ErrorMessage from '../shared/ErrorMessage'
import { LIGHTER_BLUE, BORDER } from '../../styles/colors'

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

const convertDate = time => {
  const hour = parseInt(time.substring(0, time.indexOf(':')))
  const minute = parseInt(time.substring(time.indexOf(':') + 1))

  if (hour == 12) {
    return minute == 0 ? '12pm' : `12:${minute}pm`
  }

  if (hour >= 13) return minute == 0 ? `${hour - 12}pm` : `${hour - 12}:${minute}pm`
  return minute == 0 ? `${hour}am` : `${hour}:${minute}am`
}

const pad = (number) => {
  return number < 10 ? `0${number}` : `${number}`
}

class HoursVisualization extends Component {
  constructor(props) {
    super(props)
  }

  getDay(date) {
    const week = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const obj = moment(date)
    const dayNum = obj.day()
    const today = moment().day()

    if (today === dayNum) return 'Today'
    if (dayNum === (today + 1) % 7) return 'Tomorrow'

    return week[dayNum]
  }

  isRightNow(meal, date) {
    if (!meal) {
      return false
    }

    const { starttime, endtime } = meal
    const dateObj = new Date()
    const currTime = pad(dateObj.getHours()) + ':' + pad(dateObj.getMinutes())

    const today = this.getDay(dateObj)

    // console.log(today)
    // console.log(date)
    // console.log(starttime)
    // console.log(currTime)
    // console.log(endtime)

    return today == date && starttime <= currTime && currTime <= endtime
  }

  renderList() {
    const { venueHours } = this.props

    // Don't return anything if there are no hours
    if (!venueHours || !venueHours.length) {
      return null
    }

    venueHours.forEach(venueHour => {
      venueHour.date = this.getDay(venueHour.date)
    })

    // Else, return the hours in a table
    return (
      <table className="table is-fullwidth marg-bot-0">
        <tbody>
          {venueHours.map((venueHour, idx) => {
            const meals = venueHour.dayparts
            return (
              <React.Fragment key={`${venueHour.date}-${idx}`}>
                <HeaderRow>
                  <th style={{ width: '12rem' }}>{venueHour.date}</th>
                  <th>{idx === 0 && 'Meal'}</th>
                  <th>{idx === 0 && 'From'}</th>
                  <th>{idx === 0 && 'To'}</th>
                </HeaderRow>
                {meals.map(meal => (
                  <BodyRow
                    key={`${meal.label}-${meal.starttime}-${meal.endtime}`}
                    className={
                      this.isRightNow(meal, venueHour.date) && 'selected'
                    }
                  >
                    <td style={{ width: '12rem' }} />
                    <td>{meal.label}</td>
                    <td>{convertDate(meal.starttime)}</td>
                    <td>{convertDate(meal.endtime)}</td>
                  </BodyRow>
                ))}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    const { venueHours } = this.props

    if (!venueHours) {
      return <ErrorMessage message="Failed to load hours of operation." />
    }

    return this.renderList()
  }
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
