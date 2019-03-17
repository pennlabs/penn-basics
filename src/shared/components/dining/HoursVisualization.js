import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import ErrorMessage from '../shared/ErrorMessage';

class HoursVisualization extends Component {
  static cleanTime(time) {
    // Return the passed in time as AM / PM without seconds
    const formattedTime = time.substring(0, time.lastIndexOf(':'));
    const hours = parseInt(formattedTime.substring(0, formattedTime.indexOf(':')), 10);
    if (hours > 12) {
      return `${(hours - 12) + formattedTime.substring(formattedTime.indexOf(':'))} PM`;
    }
    return `${formattedTime} AM`;
  }

  static getDay(date) {
    // Return the day as a string of the passed in date
    // Note the passed in date is in Date.toString() format
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const obj = new Date(date);
    const dayNum = obj.getDay();
    const today = new Date().getDay();

    if (today === dayNum) return 'Today';
    if (dayNum === (today + 1) % 7) return 'Tomorrow';

    return week[obj.getDay()];
  }

  static updateHours(date, time) {
    // Update the hours of the passed in date to the time passed in along with it
    // NOTE time is of the form "HH:MM:SS"
    const hours = time.substring(0, time.indexOf(':'));
    const minutes = time.substring(time.indexOf(':') + 1, time.lastIndexOf(':'));
    date.setHours(hours, minutes, 0, 0);
  }

  static isRightNow(meal) {
    if (!meal) return false;

    // Return true if the meal is being served right now
    const currentTime = Date.now();
    const mealStart = new Date(meal.date);
    const mealEnd = new Date(meal.date);

    // Format the hours to match EST
    HoursVisualization.updateHours(mealStart, meal.open);
    HoursVisualization.updateHours(mealEnd, meal.close);

    // Get the time in milliseconds=
    const start = mealStart.getTime();
    const end = mealEnd.getTime();

    // Return if the current time is between start and end
    return (start <= currentTime && end >= currentTime);
  }

  constructor(props) {
    super(props);
    this.renderList = this.renderList.bind(this);
  }

  // renderTable() {
  //   return (
  //     <div>
  //       <div className="hoursWrapper">
  //         <div className="hours">
  //           <div className="hour">9</div>
  //           <div className="hour">10</div>
  //           <div className="hour">11</div>
  //           <div className="hour">12</div>
  //         </div>
  //       </div>
  //       <div className="hoursVisualization">
  //         <div className="days">
  //           <div className="day">Mon</div>
  //           <div className="day">Tue</div>
  //           <div className="day">Wed</div>
  //           <div className="day">Thu</div>
  //           <div className="day">Fri</div>
  //           <div className="day">Sat</div>
  //           <div className="day">Sun</div>
  //         </div>
  //         <div className="grid">
  //           <div className="hoursRow">
  //             <div className="hoursCol open-right" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open-left" />
  //             <div className="hoursCol" />
  //           </div>
  //           <div className="hoursRow">
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol" />
  //             <div className="hoursCol" />
  //           </div>
  //           <div className="hoursRow">
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol" />
  //             <div className="hoursCol" />
  //           </div>
  //           <div className="hoursRow">
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol" />
  //             <div className="hoursCol" />
  //           </div>
  //           <div className="hoursRow">
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol" />
  //             <div className="hoursCol" />
  //           </div>
  //           <div className="hoursRow">
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol" />
  //             <div className="hoursCol" />
  //           </div>
  //           <div className="hoursRow">
  //             <div className="hoursCol open" />
  //             <div className="hoursCol open" />
  //             <div className="hoursCol" />
  //             <div className="hoursCol" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  renderList() {
    const { venueHours } = this.props;
    // Don't return anything if there are no hours
    if (!venueHours || !venueHours.length) return null;

    // Else, return the hours in a table
    return (
      <table className="table is-fullwidth marg-bot-0">
        <thead>
          <tr>
            <th>Day</th>
            <th>Meal</th>
            <th>From</th>
            <th>To</th>
          </tr>
        </thead>
        <tbody>
          {
            venueHours.map(meal => (
              <tr
                key={uuid()}
                className={HoursVisualization.isRightNow(meal) ? 'is-selected' : ''}
              >
                <td>{HoursVisualization.getDay(meal.date)}</td>
                <td>{meal.type}</td>
                <td>{HoursVisualization.cleanTime(meal.open)}</td>
                <td>{HoursVisualization.cleanTime(meal.close)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  render() {
    const { venueHours } = this.props;

    if (!venueHours) {
      return (
        <ErrorMessage message="Failed to load hours of operation." />
      );
    }

    return this.renderList();
  }
}

HoursVisualization.propTypes = {
  venueHours: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      type: PropTypes.string,
      open: PropTypes.string,
      close: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  venueHours: state.dining.venueHours,
});

// Redux config
export default connect(
  mapStateToProps,
)(HoursVisualization);
