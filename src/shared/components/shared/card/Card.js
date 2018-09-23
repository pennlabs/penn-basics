import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Render a card with a white background, slight dropshadow, and slightly rounded borders
const Card = ({
  title,
  subtitle = '',
  url,
}) => {
  const content = (
    <div className="card">
      <div className="card-content">
        <p className="title">
          {title}
        </p>
        {
          subtitle ? (
            <p className="subtitle medium-gray-text">
              {subtitle}
            </p>
          ) : null
        }
      </div>
    </div>
  );

  return (
    <div className="column is-half-desktop">
      {
        url ? (
          <Link to={url}>
            {content}
          </Link>
        ) : (
          content
        )
      }
    </div>
  );
};

Card.defaultProps = {
  subtitle: '',
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  url: PropTypes.string.isRequired,
};

export default Card;
