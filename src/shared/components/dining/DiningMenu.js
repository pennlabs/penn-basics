import React, {Component} from 'react';

class DiningMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { "active": "status", };
  }

  handleClick(e, tab) {
    this.setState({ "active": tab });
  }

  render(){
    return(
      <div className="menu">
        Menu!
      </div>
    )
  }
}

export default DiningMenu;
