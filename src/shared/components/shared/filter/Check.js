import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Check extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if (event.keyCode === 32) {
      const { active } = this.state;

      this.setState({
        active: !active,
      });
    }
  }

  handleClick() {
    const { active } = this.state;

    this.setState({
      active: !active,
    });
  }

  render() {
    const { description, tabIndex } = this.props;
    const { active } = this.state;

    return (
      <div
        tabIndex={tabIndex}
        className={active ? 'checkWrapper active' : 'checkWrapper'}
        onClick={this.handleClick}
        onKeyPress={this.handleKeyPress}
        aria-checked={active}
        role="checkbox"
      >
        <span className="check" />
        <p>
          {description}
        </p>
      </div>
    );
  }
}

Check.defaultProps = {
  tabIndex: -1,
};

Check.propTypes = {
  tabIndex: PropTypes.number,
  description: PropTypes.string.isRequired,
};

export default Check;
