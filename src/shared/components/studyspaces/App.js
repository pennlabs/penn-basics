import React, { Component } from 'react';
import uuid from 'uuid/v4';
import axios from 'axios';
import SpaceCard from './SpaceCard';
import SpaceModal from './SpaceModal';

class App extends Component {
  static openOrNot(space, time, day) {
    const start = space.start[day];
    const end = space.end[day];
    return (time > start && time < end);
  }

  constructor(props) {
    super(props);

    this.state = {
      modalSpace: {},
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    axios.get('/api/spaces/all')
      .then((res) => {
        const spaces = {};
        const today = new Date();
        const day = today.getDay();
        const time = today.getHours() + (today.getMinutes() / 60);

        res.data.spaces.forEach((space) => {
          const spaceObj = Object.assign({}, space);

          spaceObj.open = App.openOrNot(space, time, day);
          spaces[spaceObj._id] = space; // eslint-disable-line no-underscore-dangle
        });

        this.setState({
          spaces,
        });
      });
  }

  closeModal() {
    this.setState({
      modalSpace: {},
    });
  }

  renderSpaceModal(id) {
    const { spaces } = this.state;
    const space = spaces[id];

    this.setState({
      modalSpace: {
        space,
      },
    });
  }

  render() {
    const { spaces, modalSpace } = this.state;
    return (
      <div>
        {
          spaces && Object.keys(spaces).map((spaceId) => {
            const space = spaces[spaceId];
            return (
              <SpaceCard
                {...space}
                key={uuid()}
                renderSpaceModal={() => this.renderSpaceModal(spaceId)}
              />
            );
          })
        }

        <SpaceModal
          {...modalSpace}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}


export default App;
