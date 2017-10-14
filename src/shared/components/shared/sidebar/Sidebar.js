import React, {Component} from 'react';
import List from './List';

class Sidebar extends Component {
  render(){
    return(
      <div className="sidebar" id="sidebar">
        <h2>OPEN NOW</h2>
        <List />
        <div className="space-1"></div>
        <h2>OPEN SOON</h2>
        <List />
      </div>
    )
  }
}

export default Sidebar;
