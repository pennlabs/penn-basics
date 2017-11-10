import React, {Component} from 'react';


const DiningMenu = ({diningData, dateFormatted, meal}) => {
  console.dir(diningData[dateFormatted[meal]]);

  return (
    <div className="menu">
      <h2>
        Dan's daily dish
      </h2>
    </div>
  );
};

export default DiningMenu;
