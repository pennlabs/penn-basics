import React, {Component} from 'react';
import List from './List';

class SidebarSection extends Component {
  render() {
    return(
      <div className="sidebarSection">
        <h2>{this.props.title}</h2>
        <List links={this.props.links} />
      </div>
    );
  }
}

export default SidebarSection;
