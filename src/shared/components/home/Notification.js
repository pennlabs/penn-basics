import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';

class Notification extends Component {

  static defaultProps = {
    text: []
  }

  render() {
    return (
      <div className="notification is-info">
        <button className="delete" onClick={this.props.show}></button>
        <p style={{ textAlign: 'center' }}>
          ⚡ It's currently
          <strong> {this.props.text.join(', ')} </strong>⚡
        </p>
      </div>
    )
  }
}

export default Notification;
