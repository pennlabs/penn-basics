import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class Notification extends Component {
  constructor(props) {
    super (props);
      this.state = {
<<<<<<< HEAD
        text: this.props.text
=======
        text: this.props.text || []
>>>>>>> master
      }
  }
  print() {
    var ret;
    for (var i = 0; i < this.state.text.length; i++) {
      if (i === this.state.text.length - 1) {
        ret = ret + " " + this.state.text[i]
      } else {
        ret = ret + " " + this.state.text[i] + ","
      }
    }
    return ret;
  }
  render () {
    return (
      <div className="notification is-info">
        <button className="delete" onClick={this.props.show}></button>
        <p style={{textAlign: 'center'}}>
          ⚡ It's currently
          <strong> {this.print()} </strong>⚡
        </p>
      </div>
    )
  }
}
export default Notification;
