import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class Laundry extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <article className="tile is-child notification whiteCard">
        <h1 className="title is-3">Laundry</h1>
        <h3 className="subtitle is-5">Rodin 5th floor is busy.</h3>
      </article>
    )
  }
}
export default Laundry;
