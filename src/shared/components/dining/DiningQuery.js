import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { dateFormattedChange, selectedMealChangeFulfilled } from '../../actions/action_types';

const DiningQuery = ({
  meals, days, meal, day, mealCallback, dayCallback,
}) => {
  // Ensure that all props are defined
  if (!meals || !meals.length || !days || !days.length) {
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


const mapStateToProps = (state) => {
  const {
    meals,
    meal,
    dateFormatted,
    days,
  } = state.dining;
  return {
    meal,
    meals,
    dateFormatted,
    days,
  };
};

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    dayCallback: (newDate) => {
      dispatch({
        type: dateFormattedChange,
        newDate,
      });
    },
    mealCallback: (newMeal) => {
      dispatch({
        type: selectedMealChangeFulfilled,
        newMeal,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiningQuery);
