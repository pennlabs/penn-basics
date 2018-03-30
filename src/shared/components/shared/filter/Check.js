import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Check extends Component {
  state = {
    active: false
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <div
        className={this.state.active ? "checkWrapper active" : "checkWrapper"}
        onClick={this.handleClick}
      >
        <span className="check" />
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}

Check.propTypes = {
  description: PropTypes.string,
};

export default Check;
