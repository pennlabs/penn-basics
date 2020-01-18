import React from 'react'
import PropTypes from 'prop-types'
import s from 'styled-components'
import moment from 'moment'

import { Text } from '../shared'
import { convertDate } from '../../../utils/helperFunctions'
import { LIGHTER_BLUE } from '../../styles/colors'

const BodyRow = s.tr`
  font-size: 80%;

  &.selected {
    background: ${LIGHTER_BLUE};

    &:hover,
    &:focus,
    &:active {
      background: ${LIGHTER_BLUE};
    }
  }
`

const todayIdx =
  moment().format('d') === '0' ? 6 : Number(moment().format('d')) - 1

const Hours = ({ start, end }) => {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  const hoursArr = []

  if (start.length && end.length) {
    days.forEach((_, idx) => {
      if (!start[idx]) {
        hoursArr.push(`Closed`)
      } else {
        hoursArr.push(`
          ${convertDate(start[idx])}
          -
          ${convertDate(end[idx])}
        `)
      }
    })
  }

  return (
    <div>
      <Text fullWidth>
        <strong>Hours</strong>
      </Text>

      <table className="table is-bordered is-fullwidth">
        <tbody>
          {days.map((str, idx) => (
            <BodyRow key={str} className={idx === todayIdx && 'selected'}>
              <td>{str}</td>
              <td> {hoursArr.length ? hoursArr[idx] : 'Not Available'} </td>
            </BodyRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}

Hours.propTypes = {
  start: PropTypes.arrayOf(PropTypes.number).isRequired,
  end: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default Hours
