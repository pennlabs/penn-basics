import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import DiningCards from './DiningCards';
import '../../styles/home.scss';

class Dining extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <article className="tile is-child notification whiteCard">
        <h1 className="title is-3">Dining</h1>
        <h3 className="subtitle is-5">1920 Commons looks like a great
          place to eat right now.</h3>
        <DiningCards name={"Kings Court English House"} type={0}/>
        <DiningCards name={"Pret a Manger"} type={1}/>
      </article>
    )
  }
}
export default Dining;
