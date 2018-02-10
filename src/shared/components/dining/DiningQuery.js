import React from 'react';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

const DiningQuery = ({ meals, days, meal }) => {
  // Ensure that all props are defined
  if (!meals || !meals.length || !days || !days.length || !meal) {
    return null;
  }

  return(
    <div className="diningQuery">
      <p>What's for</p>
      <Dropdown
        selected={ meal }
        options={ meals }
      />
      <Dropdown
        options={ days }
      />
    </div>
  );
};

DiningQuery.propTypes = {
  meal: PropTypes.string,
  meals: PropTypes.array,
  days: PropTypes.array,
};

export default DiningQuery;
