import React, { Component } from 'react';
import Links from './Links';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <div className="text">
            <Link to="/">
              <h1>
                PennBasics
              </h1>
            </Link>
            <p className="marg-bot-05">
              A centralized source of information at Penn.
            </p>
            <p className="light-gray-text is-size-7">
              Copyright &copy; 2017
              <a href="http://pennlabs.org" target="_blank">
                PennLabs.
              </a>
            </p>
          </div>
          <Links />
        </div>
      </footer>
    );
  }
}

export default Footer;
