import React, {Component} from 'react';
import List from './List';

class Sidebar extends Component {
  render(){
    const open = [
      {
        "name": "1920 Commons",
        "isOpen": true,
      },
      {
        "name": "Hill",
        "isOpen": true,
      },
    ];

    const closed = [
      {
        "name": "Kings Court",
        "isOpen": false,
      },
      {
        "name": "New College House",
        "isOpen": false,
      },
      {
        "name": "Bridge",
        "isOpen": false,
      },
    ];

    return(
      <div className="sidebar" id="sidebar">
        <h2>OPEN NOW</h2>
        <List links={open} />
        <div className="space-1"></div>
        <h2>OPEN SOON</h2>
        <List links={closed} />
      </div>
    )
  }
}

export default Sidebar;
