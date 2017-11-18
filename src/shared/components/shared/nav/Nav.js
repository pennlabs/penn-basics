import React, {Component} from 'react';
import Links from './Links';
import Menu from './Menu';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar" id="navbar">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Menu />
            <figure className="image is-48x48" style={{margin: '10px'}}>
              <img src="https://i.imgur.com/JhifMZc.png"/>
            </figure>
            <h1>PennBasics</h1>
          </div>
          <Links />
        </div>
      </nav>
    )
  }
}

export default Nav;
