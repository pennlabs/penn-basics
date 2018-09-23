import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from './List';

class SidebarSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { isExpanded } = this.state;
    this.setState({
      isExpanded: !isExpanded,
    });
  }

  handleKeyPress(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.keyCode === 32) {
      const { isExpanded } = this.state;
      this.setState({
        isExpanded: !isExpanded,
      });
    }
  }

  render() {
    const {
      tabIndex,
      title,
      links,
    } = this.props;
    const { isExpanded } = this.state;
    return (
      <div
        className="sidebarSection"
        onClick={e => this.handleClick(e)}
        onKeyPress={e => this.handleKeyPress(e)}
        role="button"
        tabIndex={tabIndex}
      >
        <h2 className="sidebarSectionTitle">
          {title}
        </h2>
        {isExpanded && (<List links={links} />)}
      </div>
    );
  }
}

SidebarSection.defaultProps = {
  tabIndex: -1,
};

SidebarSection.propTypes = {
  tabIndex: PropTypes.number,
  title: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default SidebarSection;
