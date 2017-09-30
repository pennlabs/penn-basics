import React, {Component} from 'react';
import List from './List';

class Sidebar extends Component {
  render(){
    return(
      <div className="sidebar">
        <h2>I am the sidebar</h2>
        <List />
      </div>
    )
  }
}

export default Sidebar;
