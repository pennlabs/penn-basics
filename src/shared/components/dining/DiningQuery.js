import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';

const DiningQuery = ({
  meals, days, meal, day, mealCallback, dayCallback,
}) => {
  // Ensure that all props are defined
  if (!meals || !meals.length || !days || !days.length || !meal || !mealCallback || !dayCallback) {
    return null;
  }

  // Find days as names
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysFormatted = days.map((d) => {
    const date = new Date(d);
    return week[date.getDay()];
  });
  daysFormatted[0] = 'Today';
  daysFormatted[1] = 'Tomorrow';

  return (
    <div className="diningQuery">
      <p>
        {'What\'s for'}
      </p>
      <Dropdown
        selected={meal}
        values={meals}
        callback={mealCallback}
      />
      <Dropdown
        selected={day}
        options={daysFormatted}
        values={days}
        callback={dayCallback}
      />
    </div>
  );
};

DiningQuery.defaultProps = {
  meal: null,
  meals: null,
  day: null,
  days: null,
  mealCallback: null,
  dayCallback: null,
};

DiningQuery.propTypes = {
  meal: PropTypes.string,
  meals: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  day: PropTypes.string,
  days: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  mealCallback: PropTypes.func,
  dayCallback: PropTypes.func,
};

export default DiningQuery;
