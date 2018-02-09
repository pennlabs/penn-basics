import React, {Component} from 'react';
import Links from './Links';
import Menu from './Menu';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar" id="navbar">
        <Menu />
        <figure className="image is-48x48" style={{margin: '10px'}}>
          <img src="https://i.imgur.com/JhifMZc.png"/>
        </figure>
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
