import React, {Component} from 'react';
import Card from '../shared/card/Card';

class App extends Component {
  render(){
    return(
      <div className="columns is-desktop">
        <Card title="Dining" subtitle="Get some grubbbb" url="/dining"/>
      </div>
    )
  }
}

export default App;
