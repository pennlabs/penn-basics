import React, { Component } from 'react';

class Check extends Component {

  state = {
    active: false
  }

  handleClick = (e) => {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <div
        className={this.state.active ? "checkWrapper active" : "checkWrapper"}
        onClick={this.handleClick}
      >
        <span className="check"></span>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default Check;
