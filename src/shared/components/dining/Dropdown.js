import React from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

/**
 * Show a dropdown item
 */
class Dropdown extends React.Component {
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
      selected: event.target.value
    });
  }

  // Render the dropdown
  render() {
    const content = this.props.options.map(option => {
      if (option === this.state.selected) {
        return (
          <option key={ uuid() } value={ option } defaultValue>
            { option }
          </option>
        );
      }
      return (
        <option key={ uuid() } value={ option }>
          { option }
        </option>
      );
    });

    return (
      <div className="select">
        <select className="dropdown" id="meal" onChange={ this.handleChangeState } value={ this.state.selected }>
          { content }
        </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.array,
  selected: PropTypes.string,
  callback: PropTypes.func,
};

export default Dropdown;
