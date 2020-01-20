import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import BellIcon from '../../../../public/img/bell.svg'
import MachineAvailability from './MachineAvailability'
import {
  BorderedCard,
  Row,
  Col,
  Subtext,
  NoData,
  ErrorMessage,
} from '../shared'
import NotFound from '../shared/NotFound'

import FavoriteButton from '../shared/favorites/FavoriteButton'
import {
  addFavorite,
  removeFavorite,
  getLaundryHall,
  getReminders,
  addReminder,
  removeReminder,
} from '../../actions/laundry_actions'
import { isValidNumericId } from '../../../utils/helperFunctions'
import { maxWidth, PHONE } from '../../styles/sizes'

const MARGIN = '0.5rem'

const Wrapper = s.div`
  padding: 1rem;
`

const Buttons = s.div`
  float: right;

  ${maxWidth(PHONE)} {
    float: none;
    width: 100%;
  }
`

class LaundryVenue extends Component {
  componentDidMount() {
    const {
      hallURLId,
      hallIntervalID,
      dispatchGetLaundryHall,
      dispatchGetReminders,
    } = this.props

    const isValidHallURLId = isValidNumericId(hallURLId)
    if (isValidHallURLId) {
      dispatchGetLaundryHall(hallURLId, hallIntervalID)
    }

    dispatchGetReminders()
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
    // TODO store image locally
    return (
      <NoData
        image="/img/laundry.png"
        imageAlt="Laundry machine"
        text="Select a laundry hall to see information"
      />
    )
  }

  render() {
    const {
      error,
      browserError,
      laundryHallInfo,
      favorites,
      hallURLId,
      reminders,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
      dispatchAddReminder,
      dispatchRemoveReminder,
    } = this.props

    if (!isValidNumericId(hallURLId) || !laundryHallInfo) {
      return LaundryVenue.renderNoHall()
    }

    if (hallURLId < 0 || hallURLId > 52) {
      return (
        <Wrapper>
          <NotFound />
        </Wrapper>
      )
    }

    const isFavorited = favorites.some(({ hallId }) => hallId === hallURLId)

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
              addParams={{ hallURLId, location, hallName }}
              removeParams={{ hallURLId }}
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
                laundryHallId={hallURLId}
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
                laundryHallId={hallURLId}
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
              <BellIcon style={{ transform: 'scale(0.7) translateY(10px)' }} />
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
    laundryHalls,
    favorites,
    reminders,
    hallIntervalID,
    reminderIntervalID,
  } = laundry

  return {
    error,
    browserError,
    laundryHallInfo,
    pending,
    laundryHalls,
    favorites,
    reminders,
    hallIntervalID,
    reminderIntervalID,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchAddFavorite: ({ hallURLId, location, hallName }) =>
    dispatch(addFavorite(hallURLId, location, hallName)),
  dispatchRemoveFavorite: ({ hallURLId }) =>
    dispatch(removeFavorite(hallURLId)),
  dispatchGetLaundryHall: (hallId, intervalID) =>
    dispatch(getLaundryHall(hallId, intervalID)),
  dispatchAddReminder: (machineID, hallID, machineType, timeRemaining) =>
    dispatch(addReminder(machineID, hallID, machineType, timeRemaining)),
  dispatchRemoveReminder: () => dispatch(removeReminder()),
  dispatchGetReminders: () => dispatch(getReminders()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaundryVenue)
