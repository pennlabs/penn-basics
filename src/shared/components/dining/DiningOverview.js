import React from 'react';
import HoursVisualization from './HoursVisualization';
import PropTypes from 'prop-types';

const DiningOverview = ({ id }) => (
  <div className="diningOverview overview">
    <p style={{marginBottom: "1rem"}}>
      Put some text here about what this venue is and what they offer
    </p>
    <HoursVisualization id={id} />
  </div>
);

DiningOverview.propTypes = {
  id: PropTypes.string,
};

export default DiningOverview;
