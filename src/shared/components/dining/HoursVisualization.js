import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DiningOverview extends Component {
  render() {
    return(
      <div>
        <div className="hoursWrapper">
          <div className="hours">
            <div className="hour">9</div>
            <div className="hour">10</div>
            <div className="hour">11</div>
            <div className="hour">12</div>
          </div>
        </div>
        <div className="hoursVisualization">
          <div className="days">
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
            <div className="day">Sun</div>
          </div>
          <div className="grid">
            <div className="hoursRow">
              <div className="hoursCol open-right" />
              <div className="hoursCol open" />
              <div className="hoursCol open-left" />
              <div className="hoursCol" />
            </div>
            <div className="hoursRow">
              <div className="hoursCol open" />
              <div className="hoursCol open" />
              <div className="hoursCol" />
              <div className="hoursCol" />
            </div>
            <div className="hoursRow">
              <div className="hoursCol open" />
              <div className="hoursCol open" />
              <div className="hoursCol" />
              <div className="hoursCol" />
            </div>
            <div className="hoursRow">
              <div className="hoursCol open" />
              <div className="hoursCol open" />
              <div className="hoursCol" />
              <div className="hoursCol" />
            </div>
            <div className="hoursRow">
              <div className="hoursCol open" />
              <div className="hoursCol open" />
              <div className="hoursCol" />
              <div className="hoursCol" />
            </div>
            <div className="hoursRow">
              <div className="hoursCol open" />
              <div className="hoursCol open" />
              <div className="hoursCol" />
              <div className="hoursCol" />
            </div>
            <div className="hoursRow">
              <div className="hoursCol open" />
              <div className="hoursCol open" />
              <div className="hoursCol" />
              <div className="hoursCol" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DiningOverview.propTypes = {
  id: PropTypes.string,
};

export default DiningOverview;
