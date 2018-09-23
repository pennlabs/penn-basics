import React, { Component } from 'react';
import axios from 'axios';

import Dining from './Dining';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';
import Notification from './Notification';

import '../../styles/home.scss';

/**
 * Component to render the home page
 */
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      notification: [],
      dining: false,
    };
  }

  // When the component mounts
  componentDidMount() {
    axios.post('/api/events', {
      start: Date.now(),
    })
      .then((resp) => {
        const {
          events,
        } = resp;
        if (resp.data.events.length === 0) {
          this.setState({ show: false });
        } else {
          this.setState({
            show: true,
            notification: events,
          });
        }
      })
      .catch(console.log); //eslint-disable-line
  }

  // Close the notification
  close() {
    this.setState({ show: false });
  }

  // Render the homepage
  render() {
    const {
      show,
      notification,
      dining,
    } = this.state;

    return (
      <div>
        {
          show && (
            <Notification show={() => this.close()} text={notification} />
          )
        }
        <div style={{ padding: '60px' }}>
          <div className="tile is-ancestor">
            <div className="tile is-parent is-6">
              <Dining show={dining} />
            </div>
            <div className="tile is-ancestor">
              <div className="tile is-parent is-6">
                <Studyspaces />
              </div>
              <div className="tile is-parent is-6">
                <Reserve />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
