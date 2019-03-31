import React from 'react'
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'
import s from 'styled-components'


import MenuItem from './MenuItem'
import { BorderedCard } from '../shared'


const StyledBorderedCard = s(BorderedCard)`
  margin: 0 0.5rem;

  h3.title {
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
    color: $light-gray;
  }

  .menuItem {
    margin-bottom: 1rem;

    .title {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0.4rem;
      margin-right: 0.3rem;
      width: auto;
      display: inline-block;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
`

const Section = ({ title, items, shouldBeList = false }) => {
  let sectionItems = '';

  if (title === 'salad bar' || title === 'grill') {
    // If only the first item should be displayed
    sectionItems = (
      <MenuItem
        title={items[0].title}
        description={items[0].description}
        tags={items[0].tags}
        key={uuid()}
      />
    );
  } else if (title === 'fruit salad' || title === 'commons deli') {
    // If items wihtout descriptions should not be displayed
    sectionItems = items.map((item) => {
      if (item.description && item.description.length && !item.description.startsWith('1')) {
        return (
          <MenuItem
            title={item.title}
            description={item.description}
            tags={item.tags}
            key={uuid()}
          />
        );
      }

      return '';
    });
  } else if (!shouldBeList) {
    // If the items should not be in a list
    sectionItems = items.map(item => (
      <MenuItem
        title={item.title}
        description={item.description}
        tags={item.tags}
        key={uuid()}
      />
    ));
  } else {
    // Comma separate the items which should be in a list
    sectionItems = items.map((item, index) => {
      if (index === items.length - 1) {
        return item.title;
      }

      return `${item.title}, `;
    });
  }

  return (
    <div className="menuSectionWrapper">
      <StyledBorderedCard>
        <h3 className="title">
          {title}
        </h3>
        {
          shouldBeList ? (
            <p className="description marg-bot-1">
              {sectionItems}
            </p>
          ) : (sectionItems)
        }
      </StyledBorderedCard>
    </div>
  )
}


Section.defaultProps = {
  shouldBeList: false,
}


Section.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
  shouldBeList: PropTypes.bool,
}


export default Section;
