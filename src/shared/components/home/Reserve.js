import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';
import RARCards from './RARCards';

class Reserve extends Component {
  render() {
    return (
      <div className="tile is-child box">
        <h1 className="title is-3">Reserve a room</h1>
        <h2 className="subtitle is-5">Book a room quickly across campus: at VP,
          Huntsman, Ed Commons, and more.</h2>
        <RARCards />
        <RARCards />
        <RARCards />
        <RARCards />
        <RARCards />
      </div>
    )
  }
}

export default Reserve;
