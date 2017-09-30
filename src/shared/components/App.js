import React, {Component} from 'react';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';

class App extends Component {
    render(){
        return(
            <div>
              <Nav />
              <Sidebar />
              <div id="app">
                <h1>I am React!</h1>
              </div>
              <Footer />
            </div>
        )
    }
}

export default App;
