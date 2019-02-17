import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from 'styled-components';
import _ from 'lodash';

import { Loading } from '../shared/Loading';
import { BorderedCard } from '../shared';

const Wrapper = s.div`
  padding: 1rem;
`;

const renderMachineAvailabilities = (machineData, machineType, allMachines) => {
  const tableMachines = allMachines.filter(machine => machine.type === machineType);
  const { open, running, out_of_order: outOfOrder } = machineData;
  return (
    <div>
      <div className="columns">
        <div className="column is-4">
          <h1 className="title is-5">
            # Available:&nbsp;
            {open}
          </h1>
        </div>
        <div className="column is-3">
          <h1 className="title is-5">
            # Busy:&nbsp;
            {running}
          </h1>
        </div>
        <div className="column is-5">
          <h1 className="title is-5">
            # Out of order:&nbsp;
            {outOfOrder}
          </h1>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Machine</th>
                <th>Status</th>
                <th>Time Remaining (min)</th>
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
                      <td className="has-text-centered">{timeRemaining}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const addFavoriteToLocalStorage = (laundryHallId, laundryHalls) => {
  const halls = _.flatten(laundryHalls.map(hall => hall.halls));
  console.log(halls);
}

const LaundryVenue = ({
  laundryHallInfo,
  pending,
  laundryHallId,
  laundryHalls,
}) => {
  if (laundryHallInfo) {
    const { hall_name: hallName } = laundryHallInfo;
    const { washers, dryers, details: machines } = laundryHallInfo.machines;
    if (pending) {
      return <div>Pending</div>;
    }
    return (
      <Wrapper>
        <div className="columns">
          <div className="column is-12">
            <h1 className="title">{hallName}</h1>
            <a className="button is-warning" onClick={() => addFavoriteToLocalStorage(laundryHallId, laundryHalls)}>Favorite</a>
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

  return null;
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

export default connect(mapStateToProps)(LaundryVenue);
