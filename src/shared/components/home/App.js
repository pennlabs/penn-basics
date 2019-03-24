import React, { Component } from 'react';
import axios from 'axios';
import s from 'styled-components';

import Dining from './Dining';
import Laundry from './Laundry';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';
import Notification from './Notification';
import { BorderedCard } from '../shared';

const Wrapper = s.div`
  padding: 1rem;
`;

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
    // TODO reduxify this

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
      <Wrapper>
        {show && (
          <Notification show={this.close} text={notification} />
        )}
        <BorderedCard>
          <h1 className="title is-4">
            <span role="img" aria-label="sun">☀️</span>
            Gooob morning!
          </h1>

          <p className="content is-medium">
            Insert some inspirational quote here from various people at Penn.
            It will make people happy and give everyone some life.
          </p>
        </BorderedCard>

        <Reserve />

        <Dining show={dining} />

        <Laundry/>

        <Studyspaces />
      </Wrapper>
    );
  }
}
export default Home;
