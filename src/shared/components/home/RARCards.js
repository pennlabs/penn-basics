import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';

class RARCards extends Component {

  static defaultProps = {
    name: 'Education Commons 247',
    hours: '8:30pm to 10:00pm',
    type: 0,
  }

  render() {
    return (
      <article className="media">
        <div className="media-left">
          <a className="button is-primary is-medium">
            <span className="icon">
              <i className="fa fa-hand-peace-o"></i>
            </span>
            <span style={{ width: '5px' }}></span>
            Book Now
          </a>
        </div>
        <div className="spacer-20"></div>
        <div className="media-content">
          <div className="content" >
            <p className="is-size-5">
              <strong>{this.props.name}</strong>
              <br />
              <small>{this.props.hours}</small>
            </p>
          </div>
        </div>
      </article>
    )
  }
}
export default RARCards;
