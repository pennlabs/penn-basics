import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';

class DiningCards extends Component {

  static defaultProps = {
    name: 'Kings Court English House',
    hours: '24/7',
    type: 0,
  }

  render() {
    return (
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            {
              this.props.type === 0
                ? <img src='https://i.imgur.com/K2s8V3j.png' alt="Image" />
                : <img src='https://i.imgur.com/LSHIFmy.png' alt="Image" />
            }
          </figure>
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
export default DiningCards;
