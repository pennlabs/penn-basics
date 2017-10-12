import React, {Component} from 'react';
import ListItem from './ListItem';

class List extends Component {
  render(){
    return(
      <ul>
        <ListItem name="1920 Commons" isOpen={true} />
        <ListItem name="Hill" isOpen={true} />
        <ListItem name="New College House" isOpen={false} />
      </ul>
    )
  }
}

export default List;
