import React, {Component} from 'react';
import ListItem from './ListItem';

class List extends Component {

  render(){
    const links = this.props.links;
    const list = links.map((link, index) =>
      <ListItem name={link.name} isOpen={link.isOpen} venueID={link.venueID} key={index} />
    );

    return(
      <ul>
        { list }
      </ul>
    )
  }
}

export default List;
