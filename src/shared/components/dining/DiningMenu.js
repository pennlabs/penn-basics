import React, {Component} from 'react';
import Section from './Section';
import uuid from 'uuid/v4';

const DiningMenu = ({sectionsObj}) => {
  const sectionTitles = Object.keys(sectionsObj);
  const sections = sectionTitles.map(title => {
    // Check if this section should be a list or not
    let shouldBeList = [
      "breakfast kettles",
      "Coffee",
      "beverages",
      "cereal",
      "fruit plus",
      "toast bar",
      "condiments and toppings"
    ].includes(title);

    let descriptionsOnly = title.includes("commons deli");

    // Return the section formatted
    return (
      <Section
        title={ title }
        items={sectionsObj[title]}
        shouldBeList={ shouldBeList }
        descriptionsOnly={ descriptionsOnly}
        key={ uuid() }
      />
    );
  });

  return (
    <div className="menu">
      { sections }
    </div>
  );
};

export default DiningMenu;
