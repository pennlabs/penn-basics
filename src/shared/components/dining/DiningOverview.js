import React from 'react';
import PropTypes from 'prop-types';
import HoursVisualization from './HoursVisualization';

const DiningOverview = ({ id }) => (
  <div className="diningOverview overview">
    <p style={{ marginBottom: '1rem' }}>
      Put some text here about what this venue is and what they offer
    </p>
    <HoursVisualization id={id} />
  </div>
);

DiningOverview.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DiningOverview;
