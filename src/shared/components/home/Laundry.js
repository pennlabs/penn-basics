import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.scss';

class Laundry extends Component {
  render() {
    return (
      <article className="tile is-child notification whiteCard">
        <Link to={`/laundry`} className="link">
          <h1 className="title is-3">Laundry</h1>
        </Link>
        <h3 className="subtitle is-5">Click to find an open machine.</h3>
        <img src="https://i.imgur.com/JDX9ism.png" style={{width: '50%'}}/>
      </article>
    );
  }
}
export default Laundry;
