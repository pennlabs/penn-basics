import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import s from 'styled-components'


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


class HoursVisualization extends Component {
  /**
   * Return the passed in time as AM / PM without seconds
   *
   * @param time
   */
  static cleanTime(time) {
    const formattedTime = time.substring(0, time.lastIndexOf(':'))
    const colonIdx = formattedTime.indexOf(':')
    const hours = parseInt(formattedTime.substring(0, colonIdx), 10)
    const mins = formattedTime.substring(colonIdx)

    if (hours > 12) {
      return `${(hours - 12)}${mins} pm`
    }

    if (hours === 12) {
      return `${(hours)}${mins} pm`
    }

    return `${hours}${mins} am`
  }


  /**
   * Return the day as a string of the passed in date
   * Note the passed in date is in Date.toString() format
   *
   * @param date
   */
  static getDay(date) {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const obj = new Date(date)
    const dayNum = obj.getDay()
    const today = new Date().getDay()

    if (today === dayNum) return 'Today'
    if (dayNum === (today + 1) % 7) return 'Tomorrow'

    return week[obj.getDay()]
  }


  /**
   * Update the hours of the passed in date to the time passed in along with it
   * NOTE time is of the form "HH:MM:SS"
   *
   * @param date
   * @param time
   */
  static updateHours(date, time) {
    const firstIdxCol = time.indexOf(':')
    const lastIdxCol = time.lastIndexOf(':')
    const hours = time.substring(0, firstIdxCol)
    const minutes = time.substring(firstIdxCol + 1, lastIdxCol)

    date.setHours(hours, minutes, 0, 0)
  }


  /**
   * @param meal
   * @return true if the meal is being served right now
   */
  static isRightNow(meal) {
    if (!meal) return false
    const { date, open, close } = meal

    const currentTime = Date.now()
    const mealStart = new Date(date)
    const mealEnd = new Date(date)

    // Format the hours to match EST
    HoursVisualization.updateHours(mealStart, open)
    HoursVisualization.updateHours(mealEnd, close)

    // Get the time in milliseconds=
    const start = mealStart.getTime()
    const end = mealEnd.getTime()

    // Return if the current time is between start and end
    return (start <= currentTime && end >= currentTime)
  }


  static groupMealsByDay(meals) {
    const daysToMeals = {}

    const timeToInt = time => parseInt((time).split(':').join(''), 10)

    meals.forEach((meal) => {
      const { date } = meal
      const day = HoursVisualization.getDay(date)
      const dayMeals = daysToMeals[day]
      if (dayMeals) {
        dayMeals.push(meal)
      } else {
        daysToMeals[day] = [meal]
      }
    })

    const days = Object.keys(daysToMeals)
    days.forEach((day) => {
      daysToMeals[day].sort((a, b) => timeToInt(a.open) - timeToInt(b.open))
    })

    return daysToMeals
  }


  constructor(props) {
    super(props)
    this.renderList = this.renderList.bind(this)
  }


  renderList() {
    const { venueHours } = this.props

    // Don't return anything if there are no hours
    if (!venueHours || !venueHours.length) return null

    const mealsByDay = HoursVisualization.groupMealsByDay(venueHours)
    const days = Object.keys(mealsByDay)

    // Else, return the hours in a table
    return (
      <table className="table is-fullwidth marg-bot-0">
        <tbody>
          {days.map((day, idx) => {
            const meals = mealsByDay[day]
            return (
              <>
                <HeaderRow key={day}>
                  <th style={{ width: '12rem' }}>{day}</th>
                  <th>{idx === 0 && 'Meal'}</th>
                  <th>{idx === 0 && 'From'}</th>
                  <th>{idx === 0 && 'To'}</th>
                </HeaderRow>
                {meals.map(meal => (
                  <BodyRow
                    key={`${meal.date}-${meal.type}`}
                    className={HoursVisualization.isRightNow(meal) && 'selected'}
                  >
                    <td style={{ width: '12rem' }} />
                    <td>{meal.type}</td>
                    <td>{HoursVisualization.cleanTime(meal.open)}</td>
                    <td>{HoursVisualization.cleanTime(meal.close)}</td>
                  </BodyRow>
                ))}
              </>
            )
          })}
        </tbody>
      </table>
    )
  }


  render() {
    const { venueHours } = this.props

    if (!venueHours) {
      return (
        <ErrorMessage message="Failed to load hours of operation." />
      )
    }

    return this.renderList();
  }
}


HoursVisualization.propTypes = {
  venueHours: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      type: PropTypes.string,
      open: PropTypes.string,
      close: PropTypes.string,
    }),
  ).isRequired,
}


const mapStateToProps = state => ({
  venueHours: state.dining.venueHours,
})


export default connect(
  mapStateToProps,
)(HoursVisualization)
