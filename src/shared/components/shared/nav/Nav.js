import React, {Component} from 'react';
import Links from './Links';
import Menu from './Menu';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar" id="navbar">
        <Menu />
        <Link to="/">
          <h1>
            PennBasics
          </h1>
        </Link>
        <Links />
      </nav>
    )
  }
}

export default Nav;
