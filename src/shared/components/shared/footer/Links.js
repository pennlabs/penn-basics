import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render(){
    return(
      <ul>
        <LinkItem url="#" name="Home"/>
        <LinkItem url="#" name="About"/>
        <LinkItem url="#" name="Dining"/>
      </ul>
    )
  }
}

export default Links;
