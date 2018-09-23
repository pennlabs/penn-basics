// DiningCards: card subcomponents that go into the homepage dining section.
// each card displays the information about the dining hall/retail.

import React from 'react';
import '../../styles/home.scss';
import PropTypes from 'prop-types';

// TODO remove imgur jawns

const DiningCards = ({
  name,
  hours,
  type,
}) => (
  <article className="media">
    <div className="media-left">
      <figure className="image is-64x64">
        {
          (type === 0)
            ? (<img src="https://i.imgur.com/K2s8V3j.png" alt="First" />)
            : (<img src="https://i.imgur.com/LSHIFmy.png" alt="Second" />)
        }
      </figure>
    </div>
    <div className="spacer-20" />
    <div className="media-content">
      <div className="content">
        <p className="is-size-6">
          <strong>{name}</strong>
          <br />
          <small>{hours}</small>
        </p>
      </div>
    </div>
  </article>
);

DiningCards.defaultProps = {
  name: 'Kings Court English House',
  hours: '24/7',
  type: 0,
};

// Prop validations
DiningCards.propTypes = {
  name: PropTypes.string,
  hours: PropTypes.string,
  type: PropTypes.number,
};

export default DiningCards;
