import React, {Component} from 'react';
import uuid from 'uuid/v4';

const MenuItem = ({title, description, tags}) => {
  // Fomat the description properly
  // Descriptions starting with 1 should be excluded
  // Descriptions with line breaks need to be parsed
  const descriptions = description.split("<br />");
  let formattedDescription= ""
  if (descriptions.length <= 3) {
    // If the description is 3 paragraphs or less
    // Display each paragraph in its own p tag
    formattedDescription = descriptions.map(value => {
      if (value && value.length > 0 && !value.startsWith("1")) {
        return (
          <p className="description" key={ uuid() }>
            { value }
          </p>
        );
      } else {
        return "";
      }
    });
  } else {
    // If the description is longer than 3 paragraphs
    // Comma separate each paragraph
    formattedDescription = descriptions.map((value, index) => {
      if (value && value.length > 0 && !value.startsWith("1")) {
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

  // Format the tags
  const formattedTags = tags.map(tag => {
    let tagClass = "";
    switch(tag) {
      case "Made without Gluten- Containing Ingredients" :
        tag = "Gluten Free";
        tagClass = "gluten-free";
        break;
      case "In Balance" :
        tag = "Balanced";
        tagClass = "balanced";
        break;
      case "Vegan" :
        tagClass = "vegan";
        break;
      case "Vegetarian" :
        tagClass = "vegetarian";
        break;
      case "Farm to Fork" :
        tagClass = "farm-to-fork";
        break;
      case "Humane" :
        tagClass = "humane";
        break;
      case "Seafood Watch" :
        tagClass = "seafood-watch";
        break;
      case "Jain" :
        tagClass = "jain";
        break;
      case "Locally Crafted" :
        tag = "Local";
        tagClass = "local"
        break;
      default :
        break;
    }

    return(
      <span className={ "tag " + tagClass } key={ uuid() }>{ tag }</span>
    );
  });

  return (
    <div className="menuItem">
      <p className="title">
        { title }
      </p>
      { formattedTags }
      {
        formattedDescription &&
        <div className="description">
          { formattedDescription }
        </div>
      }
    </div>
  );
};

export default MenuItem;
