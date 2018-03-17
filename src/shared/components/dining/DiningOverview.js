import React from 'react';
import HoursVisualization from './HoursVisualization';
import PropTypes from 'prop-types';

const DiningOverview = ({ id }) => (
  <div className="diningOverview overview">
    <HoursVisualization id={id} />
  </div>
);

DiningOverview.propTypes = {
  id: PropTypes.string,
};

export default DiningOverview;
