import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import uuid from 'uuid/v4';
import ErrorMessage from '../shared/ErrorMessage';

class DiningOverview extends Component {
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

  cleanTime(time) {
    // Return the passed in time as AM / PM without seconds
    const formattedTime = time.substring(0, time.lastIndexOf(":"));
    const hours = parseInt(formattedTime.substring(0, formattedTime.indexOf(":")), 10);
    if (hours > 12) {
      return (hours - 12) + formattedTime.substring(formattedTime.indexOf(":")) + " PM";
    }
    return formattedTime + " AM";
  }

  updateHours(date, time) {
    // Update the hours of the passed in date to the time passed in along with it
    // NOTE time is of the form "HH:MM:SS"
    const hours = time.substring(0, time.indexOf(":"));
    const minutes = time.substring(time.indexOf(":" + 1), time.lastIndexOf(":"));
    date.setHours(hours, minutes, 0, 0);
  }

  isRightNow(meal) {
    if (!meal) return false;

    // Return true if the meal is being served right now
    const currentTime = Date.now();
    const mealStart = new Date(meal.date);
    this.updateHours(mealStart, meal.open);
    const mealEnd = new Date(meal.date);
    this.updateHours(mealEnd, meal.close);
    const start = mealStart.getTime();
    const end = mealEnd.getTime();
    return (start < currentTime && end > currentTime);
  }

  getDay(date) {
    // Return the day as a string of the passed in date
    // Note the passed in date is in Date.toString() format
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const obj = new Date(date);
    const dayNum = obj.getDay();
    const today = new Date().getDay();
    if (today === dayNum) return "Today";
    else if (dayNum === (today + 1) % 7) return "Tomorrow";
    return week[obj.getDay()];
  }

  renderList() {
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
            this.props.venueHours.map(meal => {
              return (
                <tr key={uuid()} className={this.isRightNow(meal) ? "is-selected" : ""}>
                  <td>{this.getDay(meal.date)}</td>
                  <td>{meal.type}</td>
                  <td>{this.cleanTime(meal.open)}</td>
                  <td>{this.cleanTime(meal.close)}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  render() {
    if (!this.props.venueHours) {
      return (
        <ErrorMessage message="Failed to load hours of operation." />
      );
    }
    return this.renderList();
  }
}

DiningOverview.propTypes = {
  id: PropTypes.string,
  venueHours: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    venueHours: state.dining.venueHours,
  };
};

// Redux config
DiningOverview = connect(
  mapStateToProps,
)(DiningOverview);

export default DiningOverview;
