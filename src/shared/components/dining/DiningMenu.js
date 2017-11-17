import React, {Component} from 'react';
import Section from './Section';
import uuid from 'uuid/v4';

<<<<<<< Updated upstream
const DiningMenu = ({sectionsObj}) => {
  const hi = "hi";
=======
const DiningMenu = ({diningData, dateFormatted, meal}) => {
  console.log(diningData)
  const sectionsObj = diningData[dateFormatted][meal];
  console.log(sectionsObj);
>>>>>>> Stashed changes
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
