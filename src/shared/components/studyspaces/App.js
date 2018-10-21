import React, { Component } from 'react';
import axios from 'axios';

import SpaceCard from './SpaceCard';

class App extends Component {
  static openOrNot(space, time, day) {
    const { start, end } = space;
    const startTime = start[day];
    const endTime = end[day] || 24;

    return (time > startTime && time < endTime);
  }

  constructor(props) {
    super(props);

    this.state = {
      spaces: {},
    };
  }

  componentDidMount() {
    const today = new Date();
    const day = today.getDay();
    const time = today.getHours() + (today.getMinutes() / 60);

    axios.get('/api/spaces/all')
      .then((res) => {
        const formattedSpaces = {};
        const { spaces } = res.data;

        spaces.forEach((space) => {
          const spaceObj = Object.assign({}, space);
          spaceObj.open = App.openOrNot(space, time, day);
          formattedSpaces[spaceObj._id] = spaceObj; // eslint-disable-line no-underscore-dangle
        });

        this.setState({
          spaces: formattedSpaces,
        });
      });
  }

  render() {
    const { spaces } = this.state;

    if (!spaces || !Object.keys(spaces).length) return null;

    return (
      <div>
        {Object.keys(spaces).map((spaceId) => {
          const space = spaces[spaceId];
          return (
            <SpaceCard
              {...space}
              key={spaceId}
            />
          );
        })}
      </div>
    );
  }
}


export default App;
