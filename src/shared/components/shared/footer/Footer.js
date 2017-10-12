import React, {Component} from 'react';
import Links from './Links';

class Footer extends Component {
    render(){
        return(
          <footer>
            <div className="container">
              <h1>
                PennCentral
              </h1>
              <p>
                A centralized source of information at Penn.
              </p>
              <Links />
            </div>
          </footer>
        )
    }
}

export default Footer;
