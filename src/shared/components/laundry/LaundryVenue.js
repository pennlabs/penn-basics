import React from 'react';
import { connect } from 'react-redux';

const renderMachineAvailabilities = (machineData) => {
  const availableMachineCount = machineData.open;
  const busyMachinesList = machineData.time_remaining;
  const unavailableMachineCount = machineData.offline + machineData.out_of_order;
  const availableMachines = Array.from(Array(availableMachineCount)).map(() => (
    <div className="column is-2">
      <img width="100%" src="/img/washer_open.png" />
    </div>
  ));
  const busyMachines = busyMachinesList.map(time => (
    <div className="column is-2" style={{position: 'relative'}}>
      <img width="100%" src="/img/washer_busy.png" />
      <p style={{position: 'absolute', top: '25px', left: '30px'}}>{time}</p>
    </div>
  ));

  const unavailableMachines = Array.from(Array(unavailableMachineCount)).map(() => (
    <div className="column is-2">
      <img width="100%" src="/img/washer_busy.png" />
    </div>
    ));
  const containerDiv = (
    <div className="columns is-multiline">
      <div className="column is-12">
        <p className="subtitle">Available</p>
        <div className="columns is-multiline">
          {availableMachines.length ? availableMachines : <div className="column is-2"><p className="subtitle">None</p></div>}
        </div>
      </div>
      <div className="column is-12">
        <p className="subtitle">Busy</p>
        <div className="columns is-multiline">
        {busyMachines.length ? busyMachines : <div className="column is-2"><p className="subtitle">None</p></div>}
        </div>
      </div>
      <div className="column is-12">
        <p className="subtitle">Out of order</p>
        <div className="columns is-multiline">
        {unavailableMachines.length ? unavailableMachines : <div className="column is-2"><p className="subtitle">None</p></div>}
        </div>
      </div>
    </div>
  )
  return containerDiv
  return availableMachines.concat(claimedMachines).concat(unavailableMachines);
};

const LaundryVenue = ({ laundryHallInfo }) => {
  if (laundryHallInfo) {
    const { hall_name } = laundryHallInfo;
    const machineStatuses = laundryHallInfo.machines.details;
    const { washers, dryers } = laundryHallInfo.machines;
    console.log(washers);

    return (
      <div className="laundryOverview overview">
        <h1 className="title">
          {hall_name}
        </h1>
        <div className="columns">
          <div className="column is-6">
            <p className="title is-4">Washers</p>
            {/* Rendering the green and red dots displaying machine availability */}
            {renderMachineAvailabilities(washers)}

          </div>
        </div>
        <div className="columns">
          <div className="column is-6">
            <p className="title is-4">Dryers</p>
            {/* Rendering the green and red dots displaying machine availability */}
            {renderMachineAvailabilities(dryers)}

          </div>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = ({ laundry }) => {
  const { laundryHallInfo } = laundry;
  return {
    laundryHallInfo,
  };
};

export default connect(mapStateToProps)(LaundryVenue);
