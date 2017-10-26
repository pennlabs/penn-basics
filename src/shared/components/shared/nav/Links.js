import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render(){
    return(
      <ul>
        <LinkItem url="/dining" name="Dining"/>
        <LinkItem url="/laundry" name="Laundry"/>
        <LinkItem url="/studyspaces" name="Study spaces"/>
        <LinkItem url="/reservations" name="Reserve a room"/>
      </ul>
    )
  }
}

export default Links;
