import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import MachineAvailability from './MachineAvailability'
import { BorderedCard, Row, Col } from '../shared'
import ErrorMessage from '../shared/ErrorMessage'
import FavoriteButton from '../shared/favorites/FavoriteButton'
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

const Buttons = s.div`
  float: right;
`

class LaundryVenue extends Component {
  constructor(props) {
    super(props)

    const {
      hallURLId, // passed during a click
      laundryHallId, // reducer
      hallIntervalID,
      dispatchGetLaundryHall,
      dispatchGetReminders,
    } = this.props

    if (hallURLId) {
      dispatchGetLaundryHall(hallURLId, hallIntervalID)
    } else if (laundryHallId) {
      dispatchGetLaundryHall(laundryHallId, hallIntervalID)
    }

    dispatchGetReminders()
  }

  componentDidUpdate(prevProps) {
    const { dispatchGetLaundryHall, hallURLId, hallIntervalID } = this.props

    const prevHallURLId = prevProps.hallURLId

    if (prevHallURLId !== hallURLId) {
      dispatchGetLaundryHall(hallURLId, hallIntervalID)
    }
  }

  componentWillUnmount() {
    // clear the interval when another component is rendered
    const { hallIntervalID, reminderIntervalID } = this.props
    clearInterval(hallIntervalID)
    clearInterval(reminderIntervalID)
  }

  render() {
    const {
      error,
      browserError,
      laundryHallInfo,
      favorites,
      laundryHallId, // reducer
      reminders,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
      dispatchAddReminder,
      dispatchRemoveReminder,
    } = this.props

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
        <ErrorMessage message={browserError} />
        <ErrorMessage message={error} />

        <div style={{ marginBottom: '1rem' }}>
          <Buttons>
            <FavoriteButton
              isFavorited={isFavorited}
              addFunction={dispatchAddFavorite}
              removeFunction={dispatchRemoveFavorite}
              addParams={{ laundryHallId, location, hallName }}
              removeParams={{ laundryHallId }}
            />
            {browserError || reminders.length === 0 ? null : (
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
              <MachineAvailability
                displayDetails
                machineData={washers}
                machineType="washer"
                allMachines={machines}
                laundryHallId={laundryHallId}
                hallName={hallName}
                reminders={reminders}
                dispatchAddReminder={dispatchAddReminder}
                enableReminder={!browserError}
              />
            </BorderedCard>
          </Col>

          <Col lg={6} sm={12} margin={MARGIN}>
            <BorderedCard>
              <p className="title is-4">Dryers</p>
              <MachineAvailability
                displayDetails
                machineData={dryers}
                machineType="dryer"
                allMachines={machines}
                laundryHallId={laundryHallId}
                hallName={hallName}
                reminders={reminders}
                dispatchAddReminder={dispatchAddReminder}
                enableReminder={!browserError}
              />
            </BorderedCard>
          </Col>
        </Row>
      </Wrapper>
    )
  }
}

LaundryVenue.defaultProps = {
  error: null,
  browserError: null,
  laundryHallInfo: null,
  laundryHallId: null,
  hallURLId: null,
  reminders: [],
  favorites: [],
  hallIntervalID: null,
  reminderIntervalID: null,
}

LaundryVenue.propTypes = {
  error: PropTypes.string,
  browserError: PropTypes.string,
  dispatchAddReminder: PropTypes.func.isRequired,
  dispatchRemoveReminder: PropTypes.func.isRequired,
  reminders: PropTypes.arrayOf(PropTypes.object),
  dispatchGetReminders: PropTypes.func.isRequired,
  hallIntervalID: PropTypes.number,
  reminderIntervalID: PropTypes.number,
  laundryHallInfo: PropTypes.shape({
    hall_name: PropTypes.string,
    location: PropTypes.string,
    machines: PropTypes.object,
  }),
  laundryHallId: PropTypes.number,
  hallURLId: PropTypes.string,
  dispatchAddFavorite: PropTypes.func.isRequired,
  dispatchRemoveFavorite: PropTypes.func.isRequired,
  dispatchGetLaundryHall: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      locationName: PropTypes.string,
      hallId: PropTypes.number,
    })
  ),
}

const mapStateToProps = ({ laundry }) => {
  const {
    error,
    browserError,
    laundryHallInfo,
    pending,
    laundryHallId,
    laundryHalls,
    favorites,
    reminders,
    hallIntervalID,
    reminderIntervalID,
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
    error,
    browserError,
    laundryHallInfo,
    pending,
    laundryHallId: id,
    laundryHalls,
    favorites,
    reminders,
    hallIntervalID,
    reminderIntervalID,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchAddFavorite: ({ laundryHallId, location, hallName }) =>
    dispatch(addFavorite(laundryHallId, location, hallName)),
  dispatchRemoveFavorite: ({ laundryHallId }) =>
    dispatch(removeFavorite(laundryHallId)),
  dispatchGetLaundryHall: (hallId, intervalID) =>
    dispatch(getLaundryHall(hallId, intervalID)),
  dispatchAddReminder: (machineID, hallID, hallName) =>
    dispatch(addReminder(machineID, hallID, hallName)),
  dispatchRemoveReminder: () => dispatch(removeReminder()),
  dispatchGetReminders: () => dispatch(getReminders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaundryVenue)
