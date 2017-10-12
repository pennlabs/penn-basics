import React, {Component} from 'react';
import Links from './Links';

class Nav extends Component {
    render(){
        return(
            <nav>
              <h1>
                PennCentral
              </h1>
              <Links />
            </nav>
        )
    }
}

export default Nav;
