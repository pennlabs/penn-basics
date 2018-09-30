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
          description: '1920 Commons, the largest café on campus, is located on Locust Walk, right across the 38th Street Bridge. Serving lunch and dinner during the week and brunch and dinner on weekends, 1920 Commons offers a variety of dishes sure to please the pickiest of palates.  Enjoy a bountiful, seasonal salad bar; made-to-order deli; fresh, hot pizzas; comfort cuisine; savory soups; veggie, chicken, and beef burgers grilled to perfection; an ever-changing action station; or delectable desserts.  It’s all here!',
          image: 'https://s3.amazonaws.com/media.34s.dpn/11308_commonsf.JPG',
        },
        {
          name: 'Hill',
          id: 636,
          image: 'https://www.thelightingpractice.com/wp-content/uploads/2016/08/Hill-2-AW-4337-2600x1734.jpg',
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
