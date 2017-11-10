import React, {Component} from 'react';

const MenuItem = ({title, description, tags}) => {
  const descriptions = description.split("<br />");
  console.log(descriptions);
  let formattedDescription= ""
  if (descriptions.length <= 3) {
    formattedDescription = descriptions.map(value => {
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
  } else {
    formattedDescription = descriptions.map((value, index) => {
      if (value && value.length > 0) {
        if (index != descriptions.length - 1) {
          return value + ", ";
        } else {
          return value;
        }
      } else {
        return "";
      }
    });
  }

  return (
    <div className="menuItem">
      <p className="title">
        { title }
      </p>
      <p className="description">
        { formattedDescription }
      </p>
    </div>
  );
};

export default MenuItem;
