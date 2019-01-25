import React from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';
import Menu from './Menu';

// TODO replace imgur jawn with local jawn

const Nav = () => (
  <nav className="navbar" id="navbar">
    <Menu />
    <Link to="/" className="logo">
      <img src="https://i.imgur.com/JhifMZc.png" alt="logo" />
      <h1>
        Penn Basics
      </h1>
    </Link>
    <Links />
  </nav>
);

export default Nav;
