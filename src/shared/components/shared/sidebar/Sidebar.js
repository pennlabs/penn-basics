import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import SidebarSection from './SidebarSection';

import {
  sidebarDining,
} from '../../../actions/action_types';

class Sidebar extends Component {
  renderSections() {
    const { sections } = this.props;

    return sections.map(section => (
      <SidebarSection {...section} key={uuid()} />
    ));
  }

  render() {
    return (
      <div className="sidebar" id="sidebar">
        {this.renderSections()}
      </div>
    );
  }
}

const mapStateToProps = ({ dining: { sidebarInfo: diningSidebarInfo }, sidebar, link }) => {
  switch (sidebar) {
    case sidebarDining:
      return { sections: diningSidebarInfo, link };
    default:
      throw Error('Sidebar does not yet handle info from non-dining sections');
  }
};

Sidebar.propTypes = {
  link: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          isOpen: PropTypes.bool,
          venueID: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Sidebar);
