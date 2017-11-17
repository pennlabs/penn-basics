import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class Notification extends Component {
  constructor(props) {
    super (props);
  }
  render () {
    return (
      <div className="notification is-info">
        <button className="delete" onClick={this.props.show}></button>
        <p style={{textAlign: 'center'}}>
          ⚡ It's currently
          <strong> Advanced Registration </strong>⚡
          <br/> Dates: <small>10/18/17 – 11/12/17</small>
        </p>
      </div>
    )
  }
}
export default Notification;
