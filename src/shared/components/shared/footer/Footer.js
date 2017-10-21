import React, {Component} from 'react';
import Links from './Links';

class Footer extends Component {
    render(){
        return(
          <footer>
            <div className="container">
              <div className="text">
                <a href="/">
                  <h1>
                    PennCentral
                  </h1>
                </a>
                <p className="marg-bot-05">
                  A centralized source of information at Penn.
                </p>
                <p className="light-gray-text is-size-7">
                  Copyright &copy; 2017 PennLabs.
                </p>
              </div>
              <Links />
            </div>
          </footer>
        )
    }
}

export default Footer;
