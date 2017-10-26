import React, {Component} from 'react';
import Card from '../shared/card/Card';

class App extends Component {
  render(){
    return(
      <div className="columns is-desktop">
        <Card title="Dining" subtitle="Get some grubbbb" url="/dining" />
        <Card title="Laundry" subtitle="Clean yo self upp" url="/laundry" />
        <Card title="Study spaces" subtitle="Get studious af" url="/studyspaces" />
        <Card title="Reserve a room" subtitle="Assemble the boys" url="/reservations" />
      </div>
    )
  }
}

export default App;
