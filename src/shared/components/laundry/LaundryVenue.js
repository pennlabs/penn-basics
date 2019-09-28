import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import MachineAvailability from './MachineAvailability'
import { BorderedCard, Row, Col, Subtext } from '../shared'
import ErrorMessage from '../shared/ErrorMessage'
import { NAV_HEIGHT } from '../../styles/sizes'
import FavoriteButton from '../shared/favorites/FavoriteButton'
import {
  addFavorite,
  removeFavorite,
  getLaundryHall,
  getReminders,
  addReminder,
  removeReminder,
} from '../../actions/laundry_actions'
import { isValidNumericId } from '../../helperFunctions'

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

    // TODO why are there two hall IDs??? this should be documented
    const isValidHallURLId = isValidNumericId(hallURLId)
    const isValidLaundryHallId = isValidNumericId(laundryHallId)
    if (isValidHallURLId) {
      dispatchGetLaundryHall(hallURLId, hallIntervalID)
    } else if (isValidLaundryHallId) {
      dispatchGetLaundryHall(laundryHallId, hallIntervalID)
    }

    // TODO is this check useful?? Should we always get reminders?
    if (isValidHallURLId || isValidLaundryHallId) {
      // TODO what is this getting reminders for?
      dispatchGetReminders()
    }
  }

  componentDidUpdate(prevProps) {
    const { dispatchGetLaundryHall, hallURLId, hallIntervalID } = this.props

    if (!isValidNumericId(hallURLId)) return

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

  static renderNoHall() {
    return (
      <div
        className="columns is-vcentered"
        style={{ height: `calc(100% - ${NAV_HEIGHT}` }}
      >
        <Row>
          <Col sm={12} offsetMd={2} md={8} offsetLg={3} lg={6}>
            <img src="https://i.imgur.com/JDX9ism.png" alt="Laundry" />
            <p style={{ opacity: 0.5, fontSize: '150%', textAlign: 'center' }}>
              Select a laundry hall to see information
            </p>
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    const {
      error,
      browserError,
      laundryHallInfo,
      favorites,
      laundryHallId,
      reminders,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
      dispatchAddReminder,
      dispatchRemoveReminder,
    } = this.props

    if (
      laundryHallId === null ||
      laundryHallId === undefined ||
      !laundryHallInfo
    )
      return LaundryVenue.renderNoHall()

    const isFavorited = favorites.some(({ hallId }) => hallId === laundryHallId)

    const { hall_name: hallName, location } = laundryHallInfo
    const { washers, dryers, details: machines } = laundryHallInfo.machines
    const enableReminder = !browserError

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
                enableReminder={enableReminder}
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
                enableReminder={enableReminder}
              />
            </BorderedCard>
          </Col>
        </Row>

        {enableReminder && (
          <Subtext>
            <span>
              <i className="far fa-bell" />
            </span>
            &nbsp; Click the bell icon to send you a reminder when that machine
            is done running.
          </Subtext>
        )}
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
  hallURLId: PropTypes.number,
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
