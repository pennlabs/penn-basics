import React, { Component } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

class MenuItem extends Component {
  renderFormattedDescription(description) {
    // Fomat the description properly
    // Descriptions starting with 1 should be excluded
    // Descriptions with line breaks need to be parsed
    const descriptions = description.split('<br />');
    let formattedDescription = '';
    if (descriptions.length <= 3) {
      // If the description is 3 paragraphs or less
      // Display each paragraph in its own p tag
      formattedDescription = descriptions.map((value) => {
        if (value && value.length > 0 && !value.startsWith('1')) {
          return (
            <p className="description" key={uuid()}>
              {value}
            </p>
          );
        }
        return '';
      });
    } else {
      // If the description is longer than 3 paragraphs
      // Comma separate each paragraph
      formattedDescription = descriptions.map((value, index) => {
        if (value && value.length > 0 && !value.startsWith('1')) {
          if (index !== descriptions.length - 1) {
            return `${value}, `;
          }
          return value;
        }
        return '';
      });
    }
    return (
      formattedDescription ? (
        <div className="description">
          {formattedDescription}
        </div>
      ) : null
    );
  }

  renderFormattedTags(tags) {
    // Format the tags
    return tags.map((oldTag) => {
      let tagClass = '';
      let tag = '';
      switch (oldTag) {
        case 'Made without Gluten- Containing Ingredients':
          tag = 'Gluten Free*';
          tagClass = 'gluten-free';
          break;
        case 'In Balance':
          tag = 'Balanced';
          tagClass = 'balanced';
          break;
        case 'Vegan':
          tagClass = 'vegan';
          break;
        case 'Vegetarian':
          tagClass = 'vegetarian';
          break;
        case 'Farm to Fork':
          tagClass = 'farm-to-fork';
          break;
        case 'Humane':
          tagClass = 'humane';
          break;
        case 'Seafood Watch':
          tagClass = 'seafood-watch';
          break;
        case 'Jain':
          tagClass = 'jain';
          break;
        case 'Locally Crafted':
          tag = 'Local';
          tagClass = 'local';
          break;
        default:
          break;
      }
      return (
        <span className={`tag ${tagClass}`} key={uuid()}>{tag || oldTag}</span>
      );
    });
  }

  render() {
    return (
      <div className="menuItem">
        <p className="title">
          {this.props.title}
        </p>
        {this.renderFormattedTags(this.props.tags)}
        {this.renderFormattedDescription(this.props.description)}
      </div>
    );
  }
}

MenuItem.propTypes = {
  tags: PropTypes.array,
  description: PropTypes.string,
  title: PropTypes.string,
};

export default MenuItem;
