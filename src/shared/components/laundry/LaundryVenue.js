import React, { Component } from 'react';
import LaundryOverview from './LaundryOverview';

class LaundryVenue extends Component {
  render() {
    return (
      <div>
        <h1 className="title">
          Laundry venue name
        </h1>
        <LaundryOverview />
      </div>
    );
  }
}

export default LaundryVenue;
