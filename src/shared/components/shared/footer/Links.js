import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render(){
    return(
      <div className="footer-nav">
        <h3>Navigation</h3>
        <ul>
          <LinkItem url="#" name="About"/>
          <LinkItem url="./dining" name="Dining"/>
          <LinkItem url="#" name="Laundry"/>
          <LinkItem url="#" name="Study spaces"/>
          <LinkItem url="#" name="Reserve a room"/>
        </ul>
      </div>
    )
  }
}

export default Links;
