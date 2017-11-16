import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Dining from './Dining';
import Laundry from './Laundry';
import Studyspaces from './Studyspaces';
import Reserve from './Reserve';

import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <div style={{padding: "40px"}}>
        <h1 className="title">Howdy Nihar!</h1>
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
