import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Dining from './Dining';
import Laundry from './Laundry';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';
import Notification from './Notification';
import axios from 'axios';

import '../../styles/home.scss';

/**
 * Component to render the home page
 */
class Home extends Component {
  // Set the state
  state = {
    show: true,
    notification: [],
    dining: false,
  }

  // When the component mounts
  componentDidMount() {
    axios.post('/api/events', {
      start: Date.now(),
    })
      .then(resp => {
        if (resp.data.events.length === 0) {
          this.setState({ show: false });
        } else {
          this.setState({
            show: true,
            notification: resp.data.events
          });
        }
      })
      .catch(err => {
        // TODO handle this better
        console.log(err);
      });
  }

  // Close the notification
  close = () => {
    this.setState({ show: false });
  }

  // Render the homepage
  render() {
    return (
      <div>
        {
          this.state.show && (
            <Notification show={this.close} text={this.state.notification} />
          )
        }
        <div style={{ padding: "60px" }}>
          <div className="tile is-ancestor">
            <div className="tile is-parent is-6">
              <Dining show={this.state.dining} />
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
