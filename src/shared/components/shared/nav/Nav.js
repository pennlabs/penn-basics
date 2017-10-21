import React, {Component} from 'react';
import Links from './Links';
import Menu from './Menu';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar" id="navbar">
        <Menu />
        <a href="/">
          <h1>
            PennCentral
          </h1>
        </a>
        <Links />
      </nav>
    )
  }
}

export default Nav;
