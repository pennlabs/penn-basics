import React, {Component} from 'react';
import LinkItem from './LinkItem';

class Links extends Component {
  render(){
    return(
      <div className="footer-nav">
        <h3>Navigation</h3>
        <ul>
          <LinkItem url="#" name="Home"/>
          <LinkItem url="#" name="About"/>
          <LinkItem url="#" name="Dining"/>
        </ul>
      </div>
    )
  }
}

export default Links;
