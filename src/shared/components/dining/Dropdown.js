import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

/**
 * Show a dropdown item
 */
class Dropdown extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };

    // Bind this to helper functions
    this.handleChangeState = this.handleChangeState.bind(this);
  }

  // When the component updates
  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      if (this.props.callback) {
        this.props.callback(this.state.selected);
      }
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
    const content = this.props.values.map((value, index) => {
      // Find the text for the dropdown option
      // NOTE that this is different from the value
      let text = '';
      if (this.props.options && this.props.options.length > index) {
        text = this.props.options[index];
      } else text = value;

      if (value === this.state.selected) {
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
        <select className="dropdown" id="meal" onChange={this.handleChangeState} value={this.state.selected}>
          { content }
        </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.array,
  values: PropTypes.array,
  selected: PropTypes.string,
  callback: PropTypes.func,
};

export default Dropdown;
