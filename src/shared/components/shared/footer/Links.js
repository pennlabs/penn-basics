import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render() {
    return(
      <div className="footer-nav">
        <h3>Navigation</h3>
        <ul>
          <LinkItem url="./" name="Home"/>
          <LinkItem url="/dining" name="Dining"/>
          <LinkItem url="/laundry" name="Laundry"/>
          <LinkItem url="/studyspaces" name="Study spaces"/>
          <LinkItem url="/reservations" name="Reserve a room"/>
        </ul>
      </div>
    );
  }
}

export default Links;
