import React, {Component} from 'react';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';

class App extends Component {
    render() {
        return(
<<<<<<< HEAD
            <div className="container is-fluid">
                <div className="notification">
                    This container is <strong>fluid</strong>: it will have a 24px gap on either side, on any viewport size.
                </div>
=======
            <div>
              <Nav />
              <Sidebar />
              <div id="app">
                <h1>I am React!</h1>
              </div>
              <Footer />
>>>>>>> component_structure
            </div>
        )
    }
}

export default App;
