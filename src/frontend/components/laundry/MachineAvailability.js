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
import { FlexRow, LaundryOverview } from '../shared'

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
  dispatchAddReminder,
  reminded,
  machineType,
  timeRemaining
) => {
  if (!reminded) {
    dispatchAddReminder(machineID, hallID, machineType, timeRemaining)
  }
}

// TODO add prop types and use the linter
const Bell = ({
  enableReminder,
  timeRemaining,
  reminded,
  id,
  laundryHallId,
  dispatchAddReminder,
  machineType,
}) => {
  if (!enableReminder || timeRemaining <= 0 || !dispatchAddReminder) {
    return null
  }
  if (timeRemaining > 0 && !reminded) {
    return (
      <BellIcon
        className="icon"
        onClick={() =>
          handleReminder(
            id,
            laundryHallId,
            dispatchAddReminder,
            reminded,
            machineType,
            timeRemaining
          )
        }
      >
        <i className="far fa-bell" />
      </BellIcon>
    )
  }

  // TODO is reminded the right word?
  if (reminded) {
    return (
      <RemindedBellIcon className="icon">
        <i className="fas fa-bell" />
      </RemindedBellIcon>
    )
  }

  return null
}

Bell.defaultProps = {
  enableReminder: false,
  timeRemaining: 0,
  reminded: false,
  id: null,
  laundryHallId: null,
  dispatchAddReminder: null,
  machineType: '',
}

Bell.propTypes = {
  enableReminder: PropTypes.bool,
  timeRemaining: PropTypes.number,
  reminded: PropTypes.bool,
  id: PropTypes.number,
  laundryHallId: PropTypes.number,
  dispatchAddReminder: PropTypes.func,
  machineType: PropTypes.string,
}

const MachineAvailability = ({
  displayDetails,
  machineData,
  machineType,
  allMachines,
  laundryHallId,
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
      <FlexRow margin="0.5rem">
        {[
          [open, 'Available', GREEN, LIGHT_GREEN],
          [running, 'Busy', MUSTARD, LIGHT_YELLOW],
          [outOfOrder + offline, 'Broken', MEDIUM_GRAY, FOCUS_GRAY],
        ].map(([number, title, color, background]) => (
          <LaundryOverview
            sm={4}
            margin="0.5rem"
            key={title}
            color={color}
            background={background}
          >
            <h1>{number}</h1>
            <p>{title}</p>
          </LaundryOverview>
        ))}
      </FlexRow>

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
                        machineType={machineType}
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
  reminders: [],
  enableReminder: false,
  dispatchAddReminder: null,
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
  reminders: PropTypes.arrayOf(PropTypes.object),
  dispatchAddReminder: PropTypes.func,
  enableReminder: PropTypes.bool,
}

export default MachineAvailability
