import React from 'react'
import s from 'styled-components'

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
import BellSVG from '../../../../public/img/bell.svg'

import { IMachineInfo, ILaundryHallDetail, IReminder } from '../../../types'

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
  machineID: number,
  hallID: number,
  dispatchAddReminder: (machineID: number, hallID: number, machineType: string, timeRemaining: number) =>void,
  reminded: boolean,
  machineType: string,
  timeRemaining: number,
) => {
  if (!reminded) {
    dispatchAddReminder(machineID, hallID, machineType, timeRemaining)
  }
}

interface IBellProps {
  enableReminder: boolean
  timeRemaining: number
  reminded: boolean
  id: number
  laundryHallId: number
  dispatchAddReminder: (machineID: number, hallID: number, machineType: string, timeRemaining: number) =>void
  machineType: string
}

const Bell = ({
  enableReminder,
  timeRemaining,
  reminded,
  id,
  laundryHallId,
  dispatchAddReminder,
  machineType,
}: IBellProps) => {
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
        <BellSVG style={{ transform: 'scale(0.7) translateY(2px)' }} />
      </BellIcon>
    )
  }

  // TODO is reminded the right word?
  if (reminded) {
    return (
      <RemindedBellIcon className="icon">
        <BellSVG
          style={{ transform: 'scale(0.7) translateY(2px)' }}
          fill={BLUE}
        />
      </RemindedBellIcon>
    )
  }

  return null
}

interface IMachineAvailabilityProps {
  displayDetails: boolean
  machineData: IMachineInfo
  machineType: string
  allMachines: ILaundryHallDetail[]
  laundryHallId: number
  reminders: IReminder[]
  dispatchAddReminder: (machineID: number, hallID: number, machineType: string, timeRemaining: number) =>void
  enableReminder: boolean
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
}: IMachineAvailabilityProps) => {
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
            color={`${color}`}
            background={`${background}`}
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
              <th>Mins left</th>
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

export default MachineAvailability
