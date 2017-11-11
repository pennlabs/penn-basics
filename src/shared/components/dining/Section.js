import React, {Component} from 'react';
import MenuItem from './MenuItem';
import uuid from 'uuid/v4';

const Section = ({title, items, shouldBeList }) => {
  let sectionItems = "";

  if (title == "salad bar") {
    sectionItems = <MenuItem title={items[0].title} description={items[0].description} tags={items[0].tags} key={ uuid() } />
  } else if (title == "fruit salad") {
    sectionItems = items.map(item => {
      if (item.description) {
        return (
          <MenuItem title={item.title} description={item.description} tags={item.tags} key={ uuid() } />
        );
      } else {
        return "";
      }
    });
  } else if (!shouldBeList) {
    sectionItems = items.map(item => (
      <MenuItem title={item.title} description={item.description} tags={item.tags} key={ uuid() } />
    ));
  } else {
    // Comma separate the items
    sectionItems = items.map((item, index) => {
      if (index == items.length - 1) {
        return item.title;
      } else {
        return item.title + ", ";
      }
    });
  }


  return (
    <div className="menuSectionWrapper">
      <div className="menuSection card">
        <h3 className="title">
          { title }
        </h3>
        {
          shouldBeList ?
          <p className="description marg-bot-1">
            { sectionItems }
          </p>
          :
          sectionItems
        }
      </div>
    </div>
  );
};

export default Section;
