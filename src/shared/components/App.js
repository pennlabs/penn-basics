import React, {Component} from 'react';
import Nav from './shared/nav/Nav';
import Sidebar from './shared/sidebar/Sidebar';
import Footer from './shared/footer/Footer';
import Card from './shared/card/Card';

class App extends Component {
  render() {
    return(
      <div>
        <Nav />
        <div id="wrapper">
          <Sidebar />
          <div id="app">
            <div className="columns is-desktop">
              <Card title="Dining" subtitle="Find something good to eat"/>
              <Card title="Study spaces" subtitle="Get on the grind"/>
            </div>
            <div className="columns is-desktop">
              <Card title="Laundry" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
