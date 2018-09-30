import React from 'react';
import PropTypes from 'prop-types';

import HoursVisualization from './HoursVisualization';
import venueData from './content/venueData';

const DiningOverview = ({ id }) => {
  const { description } = venueData[id];

  return (
    <div className="diningOverview overview">
      {description && (
        <p style={{ marginBottom: '1rem' }}>
          { description }
        </p>
      )}
      <HoursVisualization id={id} />
    </div>
  );
};

DiningOverview.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DiningOverview;
