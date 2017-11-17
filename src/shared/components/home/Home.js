import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Dining from './Dining';
import Laundry from './Laundry';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';
import Notification from './Notification';

import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super (props);
      this.state = {
        show: true,
      }
      this.close = this.close.bind(this);
  }
  close() {
    this.setState({show: false});
  }
  render () {
    return (
      <div>
        {this.state.show && <Notification show={this.close}/>}
      <div style={{padding: "30px"}}>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-6">
            <Dining />
          </div>
          <div className="tile is-parent is-6">
            <Laundry />
          </div>
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
    )
  }
}
export default Home;
