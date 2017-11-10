import React, {Component} from 'react';

const MenuItem = ({title, description, tags}) => {
  const descriptions = description.split("<br />");
  console.log(descriptions);
  const formattedDescription = descriptions.map(value => {
    if (value && value.length > 0) {
      return (
        <p className="description">
          { value }
        </p>
      );
    } else {
      return "";
    }
  });

  return (
    <div className="menuItem">
      <p className="title">
        { title }
      </p>
      { formattedDescription }
    </div>
  );
};

export default MenuItem;
