import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import Section from './Section';

import tagDescriptions from './content/tagDescriptions';

class DiningMenu extends Component {
  constructor(props) {
    super(props);
    this.renderSections = this.renderSections.bind(this);
  }

  renderSections() {
    const { sectionsObj } = this.props;

    if (!sectionsObj) return null;
    const sectionTitles = Object.keys(sectionsObj);

    return sectionTitles.map((title) => {
      // Check if this section should be a list or not
      // This is dependent on the format of data
      const shouldBeList = [
        'breakfast kettles',
        'Coffee',
        'beverages',
        'cereal',
        'fruit plus',
        'toast bar',
        'condiments and toppings',
      ].includes(title);

      const descriptionsOnly = [
        'commons deli',
        'pizza',
      ].includes(title);

      // Return the section formatted
      return (
        <Section
          title={title}
          items={sectionsObj[title]}
          shouldBeList={shouldBeList}
          descriptionsOnly={descriptionsOnly}
          key={uuid()}
        />
      );
    });
  }

  render() {
    return (
      <div className="menu">
        {this.renderSections()}

        <div className="legend">
          <strong>Legend:</strong>

          {
            tagDescriptions.forEach(tagDescription => (
              <div className="legend-item" key={tagDescription.className}>
                <span className="tag {tagDescription.className}">{tagDescription.title}</span>
                <br />

                {tagDescription.description}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

DiningMenu.defaultProps = {
  sectionsObj: null,
};

DiningMenu.propTypes = {
  sectionsObj: PropTypes.shape({
    title: PropTypes.string,
  }),
};

export default DiningMenu;
