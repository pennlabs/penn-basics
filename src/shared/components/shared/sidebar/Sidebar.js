import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import SidebarSection from './SidebarSection';

import {
  sidebarDining,
  sidebarLaundry,
  sidebarReservations,
  sidebarStudyspaces
} from '../../../actions/action_types';

class Sidebar extends Component {
  static propTypes = {
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        links: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            isOpen: PropTypes.bool,
            venueID: PropTypes.number
          })
        )
      })
    )
  }

  renderSections() {
    return this.props.sections.map(section => <SidebarSection {...section} key={uuid()} />);
  }

  render() {
    return (
      <div className="sidebar" id="sidebar">
        {this.renderSections()}
      </div>
    );
  }
}

const mapStateToProps = ({ dining: { sidebarInfo: diningSidebarInfo }, sidebar }) => {
  switch (sidebar) {
    case sidebarDining:
      return { sections: diningSidebarInfo };
    default:
      throw Error('Sidebar does not yet handle info from non-dining sections');
  }
};

export default connect(mapStateToProps)(Sidebar);
