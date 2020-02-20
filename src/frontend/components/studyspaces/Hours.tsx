import React from 'react'
import { Text } from '../shared'
import { getHours } from '../../../utils/helperFunctions'

interface IHoursProps {
  start: number[]
  end: number[]
}

export const Hours: React.FC<IHoursProps> = ({ start, end }) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const hoursArr = []

  let i
  for (i = 0; i < 7; i += 1) {
    hoursArr.push(getHours({ start, end }, i))
  }

  return (
    <div>
      <Text fullWidth>
        <strong>Hours</strong>
      </Text>

      <table className="table is-bordered is-fullwidth">
        <tbody>
          {hoursArr.map((str, idx) => (
            <tr key={days[idx]}>
              <td>{days[idx]}</td>
              <td>{str}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
