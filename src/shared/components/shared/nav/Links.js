import React, { Component } from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render() {
    return (
      <ul>
        <LinkItem url="/dining" name="Dining" />
        <LinkItem url="/laundry" name="Laundry" />
        <LinkItem url="/studyspaces" name="Studyspaces" />
      </ul>
    );
  }
}

export default Links;
