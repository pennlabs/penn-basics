import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import s from 'styled-components'

import Loading from '../shared/Loading';
import { BorderedCard, Row, Col } from '../shared'
import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
} from '../../styles/colors'
import { addFavorite, removeFavorite } from '../../actions/laundry_actions'

const Wrapper = s.div`
  padding: 1rem;
`

const Overview = s(Col)`
  margin-bottom: 1rem;
  border-radius: 4px;
  padding: 0.5rem 0;

  h1, p {
    color: ${({ color }) => color};
    text-align: center;
  }

  p {
    font-weight: 500;
  }

  h1 {
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 0.2rem;
    line-height: 1;
  }
`

const Table = s.table`
  margin-bottom: 0;
`

const renderMachineAvailabilities = (machineData, machineType, allMachines) => {
  const tableMachines = allMachines.filter(machine => machine.type === machineType);
  const { open, running, out_of_order: outOfOrder } = machineData;
  return (
    <div>
      <Row justifyContent="space-between">
        {[
          [open, 'Available', GREEN, LIGHT_GREEN],
          [running, 'Busy', MUSTARD, LIGHT_YELLOW],
          [outOfOrder, 'Broken', MEDIUM_GRAY, FOCUS_GRAY],
        ].map(([number, title, color, background]) => (
          <Overview width="30%" key={title} color={color} background={background}>
            <h1>{number}</h1>
            <p>{title}</p>
          </Overview>
        ))}
      </Row>

      <div className="columns">
        <div className="column is-12">
          <Table className="table is-fullwidth">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Time left (min)</th>
              </tr>
            </thead>
            <tbody>
              {
                tableMachines.map((machine) => {
                  const { status, time_remaining: timeRemaining, id } = machine;
                  return (
                    <tr>
                      <td>{id}</td>
                      <td>{status}</td>
                      <td>{timeRemaining}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const LaundryVenue = ({
  laundryHallInfo,
  pending,
  laundryHallId,
  addFavorite,
  removeFavorite,
  favorites,
}) => {
  console.log(laundryHallId)
  const isFavorited = favorites.some(favorite => favorite.hallId === laundryHallId);
  if (laundryHallInfo) {
    const { hall_name: hallName, location } = laundryHallInfo;
    const { washers, dryers, details: machines } = laundryHallInfo.machines;

    if (pending) {
      return (
        <Wrapper>
          <Loading />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <div className="columns">
          <div className="column is-12">
            <h1 className="title">{hallName}</h1>
            {isFavorited && (
              <span className="button is-danger" onClick={() => removeFavorite(laundryHallId)}>
                Unfavorite
              </span>
            )}

            {!isFavorited && (
              <span className="button is-warning" onClick={() => addFavorite(laundryHallId, location, hallName)}>
                Favorite
              </span>
            )}

          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <BorderedCard>
              <p className="title is-4">Washers</p>
              {renderMachineAvailabilities(washers, 'washer', machines)}
            </BorderedCard>
          </div>

          <div className="column is-6">
            <BorderedCard>
              <p className="title is-4">Dryers</p>
              {renderMachineAvailabilities(dryers, 'dryer', machines)}
            </BorderedCard>
          </div>
        </div>
      </Wrapper>
    );
  }

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
};

LaundryVenue.defaultProps = {
  laundryHallInfo: null,
  pending: true,
};

LaundryVenue.propTypes = {
  laundryHallInfo: PropTypes.shape({
    hall_name: PropTypes.string,
    location: PropTypes.string,
    machines: PropTypes.object,
  }),
  pending: PropTypes.bool,
};

const mapStateToProps = ({ laundry }) => {
  const {
    laundryHallInfo,
    pending,
    laundryHallId,
    laundryHalls,
    favorites,
  } = laundry;

  return {
    laundryHallInfo,
    pending,
    laundryHallId,
    laundryHalls,
    favorites,
  };
};

const mapDispatchToProps = dispatch => ({
  addFavorite: (laundryHallId, location, hallName) => dispatch(
    addFavorite(laundryHallId, location, hallName),
  ),
  removeFavorite: laundryHallId => dispatch(removeFavorite(laundryHallId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LaundryVenue)
