import React, {Component} from 'react';
import Links from './Links';

class Footer extends Component {
    render(){
        return(
          <footer>
            <h2>
              I am the footer
            </h2>
            <Links />
          </footer>
        )
    }
}

export default Footer;
