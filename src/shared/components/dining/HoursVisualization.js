import React, {Component} from 'react';

const DiningOverview = () => (
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
          <div className="hoursCol open-right"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol open-left"></div>
          <div className="hoursCol"></div>
        </div>
        <div className="hoursRow">
          <div className="hoursCol open"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol"></div>
          <div className="hoursCol"></div>
        </div>
        <div className="hoursRow">
          <div className="hoursCol open"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol"></div>
          <div className="hoursCol"></div>
        </div>
        <div className="hoursRow">
          <div className="hoursCol open"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol"></div>
          <div className="hoursCol"></div>
        </div>
        <div className="hoursRow">
          <div className="hoursCol open"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol"></div>
          <div className="hoursCol"></div>
        </div>
        <div className="hoursRow">
          <div className="hoursCol open"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol"></div>
          <div className="hoursCol"></div>
        </div>
        <div className="hoursRow">
          <div className="hoursCol open"></div>
          <div className="hoursCol open"></div>
          <div className="hoursCol"></div>
          <div className="hoursCol"></div>
        </div>
      </div>
    </div>
  </div>
)

export default DiningOverview;
