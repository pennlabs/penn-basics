import React, {Component} from 'react';

class Check extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({active: !this.state.active});
  }

  render(){
    return(
      <div className="checkWrapper" onClick={this.handleClick}>
        <span className={ this.state.active ? "check active" : "check"}></span> <p>{this.props.description}</p>
      </div>
    )
  }
}

export default Check;
