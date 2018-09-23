import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/home.scss';

const Laundry = () => (
  <article className="tile is-child notification whiteCard">
    <Link to="/laundry" className="link">
      <h1 className="title is-4">Laundry</h1>
    </Link>
    <h3 className="subtitle is-6">Click to find an open machine.</h3>
    <img
      src="https://i.imgur.com/JDX9ism.png"
      style={{ width: '50%' }}
      alt="Laundry"
    />
  </article>
);

export default Laundry;
