import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class SmallCards extends Component {
  constructor(props) {
    super (props);
      this.state = {
        name: this.props.name || 'Kings Court English House',
        hours: this.props.hours || '24/7',
        type: this.props.type || 0,
      }
  }
  render () {
    return (
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src='https://i.imgur.com/K2s8V3j.png' alt="Image"/>
          </figure>
        </div>
        <div className="spacer-20"></div>
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
    )
  }
}
export default SmallCards;
