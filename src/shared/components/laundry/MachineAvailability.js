import React from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'

// TODO split this into components

import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
  BLUE,
} from '../../styles/colors'
import StatusPill from './StatusPill'
import { Row, LaundryOverview } from '../shared'

const Table = s.table`
  margin-bottom: 0;
`

const RemindedBellIcon = s.span`
  line-height: 1;
  height: 1rem;
  color: ${BLUE};

  opacity:  0.5;
  &:hover {
    opacity: 0.75;
  }
`

const BellIcon = s.span`
  cursor: pointer;
  line-height: 1;
  height: 1rem;

  opacity:  0.5;
  &:hover {
    opacity: 0.75;
  }
`
const handleReminder = (
  machineID,
  hallID,
  hallName,
  dispatchAddReminder,
  reminded
) => {
  if (!reminded) {
    dispatchAddReminder(machineID, hallID, hallName)
  }
}

const Bell = ({enableReminder, timeRemaining, reminded, id, laundryHallId, dispatchAddReminder, hallName}) => {
  console.log(timeRemaining === 0)
  console.log(!enableReminder)
  if (!enableReminder || timeRemaining === 0){
    return null
  }
  if (timeRemaining !== 0 && !reminded) {
    return (
      <BellIcon
        className="icon"
        onClick={() =>
          handleReminder(
            id,
            laundryHallId,
            hallName,
            dispatchAddReminder,
            reminded
          )
        }
      >
        <i className="far fa-bell" />
      </BellIcon>
    )
  }
  if (reminded) {
    return (
      <RemindedBellIcon className="icon">
        <i className="fas fa-bell" />
      </RemindedBellIcon>
    )
  }
}

const MachineAvailability = ({
  displayDetails,
  machineData,
  machineType,
  allMachines,
  laundryHallId,
  hallName,
  reminders,
  dispatchAddReminder,
  enableReminder,
}) => {
  const tableMachines = allMachines.filter(
    machine => machine.type === machineType
  )
  const {
    open = 0,
    running = 0,
    out_of_order: outOfOrder = 0,
    offline = 0,
  } = machineData

  return (
    <>
      <Row justifyContent="space-between">
        {[
          [open, 'Available', GREEN, LIGHT_GREEN],
          [running, 'Busy', MUSTARD, LIGHT_YELLOW],
          [outOfOrder + offline, 'Broken', MEDIUM_GRAY, FOCUS_GRAY],
        ].map(([number, title, color, background]) => (
          <LaundryOverview
            width="30%"
            key={title}
            color={color}
            background={background}
          >
            <h1>{number}</h1>
            <p>{title}</p>
          </LaundryOverview>
        ))}
      </Row>

      {displayDetails && (
        <Table className="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Minutes left</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {tableMachines.map(
              ({ status, time_remaining: timeRemaining, id }) => {
                const reminded = reminders.some(
                  reminder =>
                    reminder.machineID === id &&
                    reminder.hallID === laundryHallId
                )
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>
                      <StatusPill status={status} />
                    </td>
                    <td>{status === 'Not online' ? '-' : timeRemaining}</td>
                    <td>
                      <Bell
                        enableReminder={enableReminder}
                        timeRemaining={timeRemaining}
                        reminded={reminded}
                        id={id}
                        laundryHallId={laundryHallId}
                        dispatchAddReminder={dispatchAddReminder}
                        hallName={hallName}
                      />
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </Table>
      )}
    </>
  )
}

MachineAvailability.defaultProps = {
  displayDetails: false,
  machineData: {},
  machineType: '',
  allMachines: [],
  laundryHallId: null,
  hallName: '',
  reminders: [],
  enableReminder: false,
}

MachineAvailability.propTypes = {
  displayDetails: PropTypes.bool,
  machineData: PropTypes.shape({
    open: PropTypes.number,
    running: PropTypes.number,
    out_of_order: PropTypes.number,
    offline: PropTypes.number,
  }),
  machineType: PropTypes.string,
  allMachines: PropTypes.array, // eslint-disable-line
  laundryHallId: PropTypes.number,
  hallName: PropTypes.string,
  reminders: PropTypes.arrayOf(PropTypes.object),
  dispatchAddReminder: PropTypes.func.isRequired,
  enableReminder: PropTypes.bool,
}

export default MachineAvailability
