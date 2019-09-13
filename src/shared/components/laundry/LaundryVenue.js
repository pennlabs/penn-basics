import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import Loading from '../shared/Loading'
import StatusPill from './StatusPill'
import { BorderedCard, Row, LaundryOverview, Col } from '../shared'
import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
} from '../../styles/colors'
import {
  addFavorite,
  removeFavorite,
  getLaundryHall,
  getReminders,
  addReminder,
  removeReminder,
} from '../../actions/laundry_actions'

const MARGIN = '0.5rem'

const Wrapper = s.div`
  padding: 1rem;
`

const Table = s.table`
  margin-bottom: 0;
`

const Buttons = s.div`
  float: right;
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

const FavoriteIcon = s.i`
  opacity: 0.75;
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

const renderMachineAvailabilities = (
  machineData,
  machineType,
  allMachines,
  laundryHallId,
  hallName,
  reminders,
  dispatchAddReminder
) => {
  const tableMachines = allMachines.filter(
    machine => machine.type === machineType
  )
  const {
    open = 0,
    running = 0,
    out_of_order: outOfOrder = 0,
    offline = 0,
  } = machineData

  // navigator.serviceWorker.ready.then(registration => {
  //   registration.getNotifications().then(notifications => {
  //     console.log(notifications)
  //   })
  // })

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
                  reminder.machineID == id && reminder.hallID == laundryHallId
              )
              const showBell = !(timeRemaining == 0 || reminded)
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>
                    <StatusPill status={status} />
                  </td>
                  <td>{status === 'Not online' ? '-' : timeRemaining}</td>
                  <td>
                    {showBell ? (
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
                    ) : null}
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </Table>
    </>
  )
}

class LaundryVenue extends Component {
  constructor(props) {
    super(props)

    const {
      hallURLId,
      intervalID,
      dispatchGetLaundryHall,
      dispatchGetReminders
    } = this.props

    if (hallURLId) {
      dispatchGetLaundryHall(hallURLId, intervalID)
    }

    dispatchGetReminders()
  }

  componentDidUpdate(prevProps) {
    const {
      dispatchGetLaundryHall,
      hallURLId,
      intervalID
    } = this.props

    const prevHallURLId = prevProps.hallURLId

    if (prevHallURLId !== hallURLId) {
      console.log(intervalID)
      dispatchGetLaundryHall(hallURLId, intervalID)
    }
  }

  render() {
    const {
      laundryHallInfo,
      pending,
      favorites,
      laundryHallId,
      reminders,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
      dispatchAddReminder,
      dispatchRemoveReminder,
    } = this.props

    // console.log(reminders)

    const isFavorited = favorites.some(({ hallId }) => hallId === laundryHallId)

    if (!laundryHallInfo) {
      return (
        <div
          className="columns is-vcentered is-centered"
          style={{ height: 'calc(100% - 57px' }}
        >
          <div className="column is-7">
            <img src="https://i.imgur.com/JDX9ism.png" alt="Laundry" />
            <p style={{ opacity: 0.5, fontSize: '150%', textAlign: 'center' }}>
              Select a laundry hall to see information
            </p>
          </div>
        </div>
      )
    }

    const { hall_name: hallName, location } = laundryHallInfo
    const { washers, dryers, details: machines } = laundryHallInfo.machines

    return (
      <Wrapper>
        <div style={{ marginBottom: '1rem' }}>
          <Buttons>
            {isFavorited ? (
              <span // eslint-disable-line
                className="button is-info"
                onClick={() => dispatchRemoveFavorite(laundryHallId)}
              >
                <FavoriteIcon className="fa fa-heart" /> &nbsp; Favorited
              </span>
            ) : (
                <span // eslint-disable-line
                  className="button"
                  onClick={() =>
                    dispatchAddFavorite(laundryHallId, location, hallName)
                  }
                >
                  <FavoriteIcon className="far fa-heart" /> &nbsp; Make Favorite
              </span>
              )}
            {reminders.length == 0 ? null : (
              <span // eslint-disable-line
                className="button"
                style={{ marginLeft: '0.5rem' }}
                onClick={() => dispatchRemoveReminder()}
              >
                Remove Reminders
              </span>
            )}
          </Buttons>

          <h1 className="title">{hallName}</h1>
        </div>

        <Row margin={MARGIN}>
          <Col lg={6} sm={12} margin={MARGIN}>
            <BorderedCard>
              <p className="title is-4">Washers</p>
              {renderMachineAvailabilities(
                washers,
                'washer',
                machines,
                laundryHallId,
                hallName,
                reminders,
                dispatchAddReminder
              )}
            </BorderedCard>
          </Col>

          <Col lg={6} sm={12} margin={MARGIN}>
            <BorderedCard>
              <p className="title is-4">Dryers</p>
              {renderMachineAvailabilities(
                dryers,
                'dryer',
                machines,
                laundryHallId,
                hallName,
                reminders,
                dispatchAddReminder
              )}
            </BorderedCard>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

LaundryVenue.defaultProps = {
  laundryHallInfo: null,
  pending: true,
  laundryHallId: null,
  hallURLId: null,
}

LaundryVenue.propTypes = {
  laundryHallInfo: PropTypes.shape({
    hall_name: PropTypes.string,
    location: PropTypes.string,
    machines: PropTypes.object,
  }),
  laundryHallId: PropTypes.number,
  hallURLId: PropTypes.number,
  pending: PropTypes.bool,
  dispatchAddFavorite: PropTypes.func.isRequired,
  dispatchRemoveFavorite: PropTypes.func.isRequired,
  dispatchGetLaundryHall: PropTypes.func.isRequired,
  favorites: PropTypes.array, // eslint-disable-line
}

const mapStateToProps = ({ laundry }) => {
  const {
    laundryHallInfo,
    pending,
    laundryHallId,
    laundryHalls,
    favorites,
    reminders,
    intervalID
  } = laundry

  // Make sure that the ID is a number
  let id
  if (typeof laundryHallId === 'string') {
    try {
      id = parseInt(laundryHallId, 10)
    } catch (e) {
      id = null
    }
  } else {
    id = laundryHallId
  }

  return {
    laundryHallInfo,
    pending,
    laundryHallId: id,
    laundryHalls,
    favorites,
    reminders,
    intervalID
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchAddFavorite: (laundryHallId, location, hallName) =>
    dispatch(addFavorite(laundryHallId, location, hallName)),
  dispatchRemoveFavorite: laundryHallId =>
    dispatch(removeFavorite(laundryHallId)),
  dispatchGetLaundryHall: (hallId, intervalID) => dispatch(getLaundryHall(hallId, intervalID)),
  dispatchAddReminder: (machineID, hallID, hallName) =>
    dispatch(addReminder(machineID, hallID, hallName)),
  dispatchRemoveReminder: () => dispatch(removeReminder()),
  dispatchGetReminders: () => dispatch(getReminders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaundryVenue)
