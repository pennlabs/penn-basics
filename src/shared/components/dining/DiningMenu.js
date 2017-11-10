import React, {Component} from 'react';
import Section from './Section';
import uuid from 'uuid/v4';

const DiningMenu = ({diningData, dateFormatted, meal}) => {
  const sectionsObj = diningData[dateFormatted][meal];
  const hi = "hi";
  console.log(sectionsObj);
  const sectionTitles = Object.keys(sectionsObj);
  const sections = sectionTitles.map(title => (
    <Section title={ title } items={sectionsObj[title]} key={ uuid() } />
  ));

  return (
    <div className="menu">
      { sections }
    </div>
  );
};

export default DiningMenu;
