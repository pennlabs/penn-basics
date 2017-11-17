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
        toast: true,
      }

  }
  render () {
    return (

      <div style={{padding: "40px"}}>
        <div className="horizontal">
          <h1 className="title" style={{width: '50%'}}>✌ Hey Nihar!</h1>
          {this.state.toast && <Notification show={this.state.toast}/>}
        </div>
        <div className="spacer"></div>
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
    )
  }
}
export default Home;
