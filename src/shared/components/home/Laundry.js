import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class Laundry extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <Link to={`/laundry`} className="link">
        <article className="tile is-child notification whiteCard">
          <h1 className="title is-3">Laundry</h1>
          <h3 className="subtitle is-5">Click to find an open machine.</h3>
          <img src="https://i.imgur.com/JDX9ism.png" style={{width: '50%'}}/>
        </article>
      </Link>
    )
  }
}
export default Laundry;
