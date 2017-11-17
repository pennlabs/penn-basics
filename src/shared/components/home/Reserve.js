import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';
import RARCards from './RARCards';

class Reserve extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <article className="tile is-child notification whiteCard">
        <h1 className="title is-3">Reserve a room</h1>
        <h3 className="subtitle is-5">Select one of the spaces below
        to book a room now.</h3>
        <RARCards />
        <RARCards />
        <RARCards />
      </article>
    )
  }
}
export default Reserve;
