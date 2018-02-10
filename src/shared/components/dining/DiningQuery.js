import React from 'react';
import Dropdown from './Dropdown';
import PropTypes from 'prop-types';

const DiningQuery = ({ meals, days, meal, day, mealCallback, dayCallback }) => {
  // Ensure that all props are defined
  if (!meals || !meals.length || !days || !days.length || !meal) {
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
