import React from 'react';
import HoursVisualization from './HoursVisualization';
import PropTypes from 'prop-types';

const DiningOverview = ({ id }) => (
  <div className="diningOverview overview">
    <p>
      Serving dinner for <strong>1 hr, 27 min</strong> until <strong>9pm</strong>
    </p>

    <HoursVisualization id={id} />
  </div>
);

DiningOverview.propTypes = {
  id: PropTypes.string,
};

export default DiningOverview;
