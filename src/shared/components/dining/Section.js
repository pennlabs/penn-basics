import React, {Component} from 'react';
import MenuItem from './MenuItem';
import uuid from 'uuid/v4';

const Section = ({title, items}) => {
  const sectionItems = items.map(item => (
    <MenuItem title={item.title} description={item.description} tags={item.tags} key={ uuid() } />
  ));

  return (
    <div className="menuSection card">
      <h3 className="title">
        { title }
      </h3>
      { sectionItems }
    </div>
  );
};

export default Section;
