// Import frameworks
import React, { Component } from 'react';
import uuid from 'uuid/v4';

import Filter from '../shared/filter/Filter';
import DiningVenuePreview from './DiningVenuePreview';

class App extends Component {
  // TODO remove dummy state
  constructor(props) {
    super(props);

    this.state = {
      venues: [
        {
          name: '1920 Commons',
          id: 593,
          image: 'https://s3.amazonaws.com/media.34s.dpn/11308_commonsf.JPG',
        },
        {
          name: 'Hill',
          id: 636,
          image: 'http://www.admissions.upenn.edu/images/uploads/hero/744x300_HillDiningHall.jpg',
        },
      ],
    };
  }

  renderPreviews() {
    const { venues } = this.state;

    return venues.map(venue => (
      <DiningVenuePreview
        name={venue.name}
        id={venue.id}
        image={venue.image}
        key={uuid()}
      />
    ));
  }

  render() {
    return (
      <div>
        <Filter />
        <div className="dining-venue-previews columns">
          {this.renderPreviews()}
        </div>
      </div>
    );
  }
}

export default App;
