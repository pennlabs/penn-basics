import React, { Component } from 'react';
import axios from 'axios';
import Dining from './Dining';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';
import Notification from './Notification';

import '../../styles/home.scss'; // TODO is this necessary?

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      notification: '',
      dining: false,
    };
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/events/${Date.now()}`)
      .then((resp) => {
        if (resp.data.events.length === 0) {
          this.setState({
            show: false,
          });
        } else {
          this.setState({
            show: true,
            notification: resp.data.events[0].event,
          });
        }
      })
      .catch((err) => {
        console.log(err); // eslint-disable-line

        // TODO better error handling
      });
  }

  close() {
    this.setState({ show: false });
  }

  render() {
    // TODO less bulma madness
    const { dining, show, notification } = this.state;

    return (
      <div>
        {show && (
          <Notification show={this.close} text={notification} />
        )}

        <div className="tile is-ancestor">
          <div className="tile is-parent is-vertical">
            <div className="card box">
              <h1 className="title is-4">
                <span role="img" aria-label="sun">☀️</span>
                Good morning!
              </h1>

              <p className="content is-medium">
                Insert some inspirational quote here from various people at Penn.
                It will make people happy and give everyone some life.
              </p>
            </div>

            <Reserve />
          </div>
          <div className="tile is-5 is-vertical is-parent">
            <Dining show={dining} />

            <Studyspaces />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
