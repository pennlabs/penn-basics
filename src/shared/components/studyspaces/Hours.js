import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '../shared';
import { getHours } from './mapper';

const Hours = ({ start, end }) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const hoursArr = [];

  let i;
  for (i = 0; i < 7; i += 1) {
    hoursArr.push(getHours({ start, end }, i));
  }

  return (
    <div>
      <Text fullWidth>
        <strong>Hours:</strong>
      </Text>
      <table className="table is-bordered is-fullwidth">
        <tbody>
          {hoursArr.map((str, idx) => (
            <tr key={days[idx]}>
              <td>
                {days[idx]}
              </td>
              <td>
                {str}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Hours.propTypes = {
  start: PropTypes.arrayOf(PropTypes.number).isRequired,
  end: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Hours;
