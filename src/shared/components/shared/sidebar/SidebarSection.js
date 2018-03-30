import React, { Component } from 'react';
import List from './List';
import PropTypes from 'prop-types';

class SidebarSection extends Component {
  state = {
    isExpanded: false
  }

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ isExpanded: !this.state.isExpanded });
  }

  render() {
    return (
      <div className="sidebarSection" onClick={this.onClick}>
        <h2 className="sidebarSectionTitle">{this.props.title}</h2>
        {this.state.isExpanded && <List links={this.props.links} />}
      </div>
    );
  }
}

SidebarSection.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
};

export default SidebarSection;
