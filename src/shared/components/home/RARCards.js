import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class RARCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || 'Education Commons 247',
      hours: this.props.hours || '8:30pm to 10:00pm',
      type: this.props.type || 0,
    };
  }
  render() {
    return (
      <article className="media">
        <div className="media-left">
          <a className="button is-primary is-medium">
            <span className="icon">
              <i className="fa fa-hand-peace-o" />
            </span>
            <span style={{width: '5px'}} />
            Book Now
          </a>
        </div>
        <div className="spacer-20" />
        <div className="media-content">
          <div className="content" >
            <p className="is-size-5">
              <strong>{this.state.name}</strong>
              <br/>
              <small>{this.state.hours}</small>
            </p>
          </div>
        </div>
      </article>
    );
  }
}
export default RARCards;
