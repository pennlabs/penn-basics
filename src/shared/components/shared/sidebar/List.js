import React, {Component} from 'react';
import ListItem from './ListItem';

class List extends Component {

  render(){
    const links = this.props.links;
    const list = links.map((link) =>
      <ListItem name={link.name} isOpen={link.isOpen} />
    );

    return(
      <ul>
        { list }
      </ul>
    )
  }
}

export default List;
