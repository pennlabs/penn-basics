import React, { Component } from 'react';
import uuid from 'uuid/v4';

class Dropdown extends Component {
  render() {
    const content = this.props.options.map(option => {
      return <option key={uuid()} value={option}>{option}</option>;
    });

    return (
      <div className="select">
        <select className="dropdown" id="meal">
          {content}
        </select>
      </div>
    );
  }
}

export default Dropdown;
