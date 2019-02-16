import React from 'react';
import PropTypes from 'prop-types';

import { BorderedCard } from '../shared';
import HoursVisualization from './HoursVisualization';
import venueData from './content/venueData';

const DiningOverview = ({ id }) => {
  const { description } = venueData[id];

  return (
    <BorderedCard>
      {description && (
        <p style={{ marginBottom: '1rem' }}>
          { description }
        </p>
      )}
      <HoursVisualization id={id} />
    </BorderedCard>
  );
};

DiningOverview.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DiningOverview;
