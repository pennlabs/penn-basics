import React, {Component} from 'react';
import Nav from './shared/Nav';
import Footer from './shared/Footer';

class App extends Component {
    render(){
        return(
            <div>
              <Nav />
              <h1>I am React!</h1>
              <Footer />
            </div>
        )
    }
}

export default App;
