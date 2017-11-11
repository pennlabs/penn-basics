import React, {Component} from 'react';
import MenuItem from './MenuItem';
import uuid from 'uuid/v4';

const Section = ({title, items, shouldBeList }) => {
  let sectionItems = "";

  if (!shouldBeList) {
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
