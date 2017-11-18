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

    // Return the section formatted
    return (
      <Section title={ title } items={sectionsObj[title]} shouldBeList={ shouldBeList } key={ uuid() } />
    );
  });

  return (
    <div className="menu">
      { sections }
    </div>
  );
};

export default DiningMenu;
