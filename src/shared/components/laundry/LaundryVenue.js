import React from 'react';
import { connect } from 'react-redux';


const machineStatusTypes = ['Available', 'End of cycle', 'In use', 'Ready to start', 'Out of order'];
const availableMachineStyle = {width:'25px',height:'25px',borderRadius:'50%',backgroundColor:'green',display:'inline-block',marginRight:'5px'};
const unavailableMachineStyle = {width:'25px',height:'25px',borderRadius:'50%',backgroundColor:'red',display:'inline-block',marginRight:'5px'};

const renderMachineAvailabilities = (machineData) => {
  const availableMachineCount = machineData.open;
  const unavailableMachineCount = machineData.offline + machineData.out_of_order + machineData.running;
  const availableMachines = Array.from(Array(availableMachineCount)).map(() => <div style={availableMachineStyle}></div>);
  const unavailableMachines = Array.from(Array(unavailableMachineCount)).map(() => <div style={unavailableMachineStyle}></div>);
  return availableMachines.concat(unavailableMachines);
};

const LaundryVenue = ({ laundryHallInfo }) => {
  if (laundryHallInfo) {
    console.log(laundryHallInfo)
    const {hall_name} = laundryHallInfo;
    const machineStatuses = laundryHallInfo.machines.details;
    const {washers,dryers} = laundryHallInfo.machines;
    const individualWashers = machineStatuses.filter(machine => machine.type === 'washer');
    const individualDryers = machineStatuses.filter(machine => machine.type === 'dryer');
    return (
      <div className="laundryOverview overview">
        <h1 className="title">
          {hall_name}
        </h1>
        <div className="columns">
          <div className="column is-6">
            <p className="title is-4">Washers</p>
            {/* Rendering the green and red dots displaying machine availability */}
            <div>
              {
                renderMachineAvailabilities(washers)
              }
            </div>
            
          </div>
          <div className="column is-6">
            <p className="title is-4">Dryers</p>
            <div>
              {
                renderMachineAvailabilities(dryers)
              }
            </div>
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
