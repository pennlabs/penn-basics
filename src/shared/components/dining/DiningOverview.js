import React, {Component} from 'react';
import HoursVisualization from './HoursVisualization';

const DiningOverview = () => (
  <div className="diningOverview overview">
    <p>
      Serving dinner for <strong>1 hr, 27 min</strong> until <strong>9pm</strong>
    </p>

    <HoursVisualization />
  </div>
);

export default DiningOverview;
