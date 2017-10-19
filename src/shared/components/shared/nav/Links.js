import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render(){
    return(
      <ul>
        <LinkItem url="#" name="Dining"/>
        <LinkItem url="#" name="Laundry"/>
        <LinkItem url="#" name="Study spaces"/>
        <LinkItem url="#" name="Reserve a room"/>
      </ul>
    )
  }
}

export default Links;
