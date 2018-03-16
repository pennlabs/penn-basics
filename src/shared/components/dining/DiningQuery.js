import React, { Component } from 'react';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

/**
 * Render selection fields for filtering by days
 */
const DiningQuery = ({ meals, days, meal, day, mealCallback, dayCallback }) => {
  // Ensure that all props are defined
  if (!meals || !meals.length || !days || !days.length || !meal || !mealCallback || !dayCallback) {
    return null;
  }

  return(
    <div className="diningQuery">
      <p>
        What's for
      </p>
      <Dropdown
        selected={ meal }
        options={ meals }
        callback={ mealCallback }
      />
      <Dropdown
        selected={ day }
        options={ days }
        callback={ dayCallback }
      />
    </div>
  );
};

DiningQuery.propTypes = {
  meal: PropTypes.string,
  meals: PropTypes.array,
  day: PropTypes.string,
  days: PropTypes.array,
  mealCallback: PropTypes.func,
  dayCallback: PropTypes.func,
};

export default DiningQuery;
