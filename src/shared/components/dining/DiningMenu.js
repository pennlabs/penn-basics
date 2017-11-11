import React, {Component} from 'react';
import Section from './Section';
import uuid from 'uuid/v4';

const DiningMenu = ({diningData, dateFormatted, meal}) => {
  console.log(diningData)
  const sectionsObj = diningData[dateFormatted][meal];
  const hi = "hi";
  console.log(sectionsObj);
  const sectionTitles = Object.keys(sectionsObj);
  const sections = sectionTitles.map(title => {
    // Check if this section should be a list or not
    let shouldBeList = false;
    if (title == "breakfast kettles" ||
        title == "Coffee" ||
        title == "beverages" ||
        title == "cereal" ||
        title == "fruit plus" ||
        title == "toast bar" ||
        title == "condiments and toppings") {
      shouldBeList = true;
    }

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
