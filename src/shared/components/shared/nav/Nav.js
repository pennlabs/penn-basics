import React, {Component} from 'react';
import Links from './Links';
import Menu from './Menu';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar" id="navbar">
        <div className="navbar-wrapper">
          { window.location.pathname !== "/" && <Menu /> }
          <Link to="/">
            <h1>
              PennBasics
            </h1>
          </Link>
        </div>
        <Links />
      </nav>
    )
  }
}

export default Nav;
