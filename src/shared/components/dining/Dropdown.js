import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  // Constructor
  constructor(props) {
    super(props);

    const { selected } = this.props;

    this.state = {
      selected,
    };

    // Bind this to helper functions
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  // When the component updates
  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state;
    const { callback } = this.props;

    if (prevState.selected !== selected && callback) {
      callback(selected);
    }
  }

  // Handle a change to the dropdown state
  handleChangeState(event) {
    this.setState({
      selected: event.target.value,
    });
  }

  // Render the dropdown
  render() {
    const { values, options } = this.props;
    const { selected } = this.state;

    const content = values.map((value, index) => {
      // Find the text for the dropdown option
      // NOTE that this is different from the value
      let text = '';

      if (options && options.length > index) {
        text = options[index];
      } else text = value;

      if (value === selected) {
        return (
          <option key={uuid()} value={value} defaultValue>
            { text }
          </option>
        );
      }
      return (
        <option key={uuid()} value={value}>
          { text }
        </option>
      );
    });

    return (
      <div className="select">
        <select
          className="dropdown"
          id="meal"
          onChange={this.handleChangeState}
          value={selected}
        >
          { content }
        </select>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  callback: () => {},
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  callback: PropTypes.func,
};

export default Dropdown;
