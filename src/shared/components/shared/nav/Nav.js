import React, {Component} from 'react';
import Links from './Links';
import Menu from './Menu';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar">
        <Menu />
        <h1>
          PennCentral
        </h1>
        <Links />
      </nav>
    )
  }
}

export default Nav;
