import React, { Component } from 'react';
import PropTypes from 'prop-types'
import uuid from 'uuid/v4';
import SidebarSection from './SidebarSection';

class Sidebar extends Component {

  static defaultProps = {
    sections: [{
      "title": "Open now",
      "links": [
        {
          "name": "1920 Commons",
          "isOpen": true,
          "venueID": 593,
        },
        {
          "name": "Hill",
          "isOpen": true,
          "venueID": 636,
        },
      ],
    }, {
      "title": "Closed",
      "links": [
        {
          "name": "Kings Court",
          "isOpen": false,
        },
        {
          "name": "New College House",
          "isOpen": false,
        },
        {
          "name": "Bridge",
          "isOpen": false,
        },
      ],
    }]
  }

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
    return this.props.sections.map(section =>
      <SidebarSection
        {...section}
        key={uuid()}
      />
    );
  }

  render() {
    return (
      <div className="sidebar" id="sidebar">
        {this.renderSections()}
      </div>
    )
  }
}

export default Sidebar;
