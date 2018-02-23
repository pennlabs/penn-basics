import React, { Component } from 'react';
import MenuItem from './MenuItem';
import uuid from 'uuid/v4';

const Section = ({ title, items, shouldBeList, descriptionsOnly }) => {
  let sectionItems = "";
  if (title === "salad bar" || title === "grill") {
    // If only the first item should be displayed
    sectionItems = (
      <MenuItem
        title={items[0].title}
        description={items[0].description}
        tags={items[0].tags} key={uuid()}
      />
    );
  } else if (title === "fruit salad" || title === "commons deli") {
    // If items wihtout descriptions should not be displayed
    sectionItems = items.map(item => {
      if (item.description && item.description.length && !item.description.startsWith("1")) {
        return (
          <MenuItem
            title={item.title}
            description={item.description}
            tags={item.tags}
            key={uuid()}
          />
        );
      }
      return "";
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
      if (index == items.length - 1) {
        return item.title;
      }
      return item.title + ", ";
    });
  }

  return (
    <div className="menuSectionWrapper">
      <div className="menuSection card">
        <h3 className="title">
          {title}
        </h3>
        {
          shouldBeList
            ? <p className="description marg-bot-1">
              {sectionItems}
            </p>
            : sectionItems
        }
      </div>
    </div>
  );
};

export default Section;
