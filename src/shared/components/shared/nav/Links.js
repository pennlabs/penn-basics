import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render(){
    return(
      <ul>
<<<<<<< HEAD
        <LinkItem url="dining" name="Dining"/>
        <LinkItem url="laundry" name="Laundry"/>
        <LinkItem url="studyspaces" name="Study Spaces"/>
        <LinkItem url="rar" name="Reserve a Room"/>
=======
        <LinkItem url="/dining" name="Dining"/>
        <LinkItem url="/laundry" name="Laundry"/>
        <LinkItem url="/studyspaces" name="Study spaces"/>
        <LinkItem url="/reservations" name="Reserve a room"/>
>>>>>>> master
      </ul>
    )
  }
}

export default Links;
