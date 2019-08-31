import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import Loading from '../shared/Loading'
import StatusPill from './StatusPill'
import {
  BorderedCard,
  Row,
  LaundryOverview,
} from '../shared'
import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
} from '../../styles/colors'
import { addFavorite, removeFavorite, getLaundryHall, handleReminder } from '../../actions/laundry_actions'

const Wrapper = s.div`
  padding: 1rem;
`


const Table = s.table`
  margin-bottom: 0;
`

const renderMachineAvailabilities = (machineData, machineType, allMachines, laundryHallId, register, reminded, dispatchHandleReminder) => {
  const tableMachines = allMachines.filter(machine => machine.type === machineType)
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
          <LaundryOverview width="30%" key={title} color={color} background={background}>
            <h1>{number}</h1>
            <p>{title}</p>
          </LaundryOverview>
        ))}
      </Row>

      <div className="columns">
        <div className="column is-12">
          <Table className="table is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Minutes left</th>
              </tr>
            </thead>
            <tbody>
              {tableMachines.map(({ status, time_remaining: timeRemaining, id }) => (
                <tr key={id} onClick={() => dispatchHandleReminder(id, laundryHallId, register, reminded)}>
                  <td>{id}</td>
                  <td><StatusPill status={status} /></td>
                  <td>{(status === 'Not online') ? '-' : timeRemaining}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}


class LaundryVenue extends Component {
  constructor(props) {
    super(props)

    const { dispatchGetLaundryHall, hallURLId } = this.props

    if (hallURLId) {
      dispatchGetLaundryHall(hallURLId)
    }
  }

  componentWillUpdate(newProps) {
    const { dispatchGetLaundryHall, hallURLId } = this.props
    const newHallURLId = newProps.hallURLId

    if (hallURLId !== newHallURLId) {
      dispatchGetLaundryHall(newHallURLId)
    }
  }


  render() {
    const {
      laundryHallInfo,
      pending,
      laundryHallId,
      dispatchAddFavorite,
      dispatchRemoveFavorite,
      dispatchHandleReminder,
      favorites,
      register,
      reminded
    } = this.props

    const isFavorited = favorites.some(({ hallId }) => hallId === laundryHallId)

    if (!laundryHallInfo) {
      return (
        <div className="columns is-vcentered is-centered" style={{ height: 'calc(100% - 57px' }}>
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

    if (pending) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      )
    }

    return (
      <Wrapper>
        <div className="columns">
          <div className="column is-12">
            <h1 className="title">{hallName}</h1>
            {isFavorited ? (
              <span // eslint-disable-line
                className="button is-danger"
                onClick={() => dispatchRemoveFavorite(laundryHallId)}
              >
                Unfavorite
              </span>
            ) : (
                <span // eslint-disable-line
                  className="button is-warning"
                  onClick={() => dispatchAddFavorite(laundryHallId, location, hallName)}
                >
                  Favorite
              </span>
              )}
          </div>
        </div>

        <div className="columns">
          <div className="column is-6">
            <BorderedCard>
              <p className="title is-4">Washers</p>
              {renderMachineAvailabilities(washers, 'washer', machines, laundryHallId, register, reminded, dispatchHandleReminder)}
            </BorderedCard>
          </div>

          <div className="column is-6">
            <BorderedCard>
              <p className="title is-4">Dryers</p>
              {renderMachineAvailabilities(dryers, 'dryer', machines, laundryHallId, register, reminded, dispatchHandleReminder)}
            </BorderedCard>
          </div>
        </div>
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
    register,
    reminded
  } = laundry

  return {
    laundryHallInfo,
    pending,
    laundryHallId,
    laundryHalls,
    favorites,
    register,
    reminded
  }
}


const mapDispatchToProps = dispatch => ({
  dispatchAddFavorite: (laundryHallId, location, hallName) => dispatch(
    addFavorite(laundryHallId, location, hallName),
  ),
  dispatchRemoveFavorite: laundryHallId => dispatch(removeFavorite(laundryHallId)),
  dispatchGetLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
  dispatchHandleReminder: (machineID, hallID, register, reminded) => dispatch(handleReminder(machineID, hallID, register, reminded))
})


export default connect(mapStateToProps, mapDispatchToProps)(LaundryVenue)
