import React from 'react';
import Section from './Section';
import uuid from 'uuid/v4';

const DiningMenu = ({ sectionsObj }) => {
  const sectionTitles = Object.keys(sectionsObj);
  const sections = sectionTitles.map(title => {
    // Check if this section should be a list or not
    const shouldBeList = [
      "breakfast kettles",
      "Coffee",
      "beverages",
      "cereal",
      "fruit plus",
      "toast bar",
      "condiments and toppings"
    ].includes(title);

    const descriptionsOnly = [
      "commons deli",
      "pizza",
    ].includes(title);

    // Return the section formatted
    return (
      <Section
        title={title}
        items={sectionsObj[title]}
        shouldBeList={shouldBeList}
        descriptionsOnly={descriptionsOnly}
        key={uuid()}
      />
    );
  });

  return (
    <div className="menu">
      {sections}

      <div className="legend">
        <strong>Legend:</strong>

        <div className="legend-item">
          <span className="tag vegetarian">Vegetarian</span><br />

          Contains no meat, fish, poultry, shellfish or products derived from these sources but may contain dairy or eggs
        </div>

        <div className="legend-item">
          <span className="tag seafood-watch">Seafood Watch</span><br />

          Contains seafood that meets the Monterey Bay Aquarium's Seafood Watch guidelines for commercial buyers.
        </div>

        <div className="legend-item">
          <span className="tag balance">Balance</span><br />

          Contains a balanced portion of whole grains, fresh fruits and vegetables, and lean protein with a minimum amount of healthy fat
        </div>

        <div className="legend-item">
          <span className="tag gluten-free">Gluten free*</span><br />

          Due to our open kitchens that handle gluten, we cannot guarantee that items made without gluten-containing ingredients are “gluten-free,” as defined by the FDA. We make every effort to avoid gluten cross-contact; however there is always the potential for cross-contact with other gluten-containing food items, particularly in our self-serve facilities. We encourage guests to speak to the chef or manager regarding any questions about ingredients.
        </div>

        <div className="legend-item">
          <span className="tag humane">Humane</span><br />

          Contains humanely raised meat, poultry, or eggs. Must be certified by a credible third-party animal welfare organization.
        </div>

        <div className="legend-item">
          <span className="tag vegan">Vegan</span><br />

          Contains absolutely no animal or dairy products.
        </div>

        <div className="legend-item">
          <span className="tag jain">Jain</span><br />

          Contains only ingredients allowed in accordance with Jain principles.
        </div>
      </div>
    </div>
  );
};

export default DiningMenu;
