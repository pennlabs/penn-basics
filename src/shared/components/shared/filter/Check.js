import React, {Component} from 'react';

class Check extends Component {
  render(){
    return(
      <div className="checkWrapper">
        <span className="check"></span> <p>{this.props.description}</p>
      </div>
    )
  }
}

export default Check;
