import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Component to render the not found component
 */
const NotFound = ({ title, message, url, urlText}) => {
  return(
    <div>
      <h1 className="is-size-3 medium-gray-text">
        { title ? title : '404: Content not found' }
      </h1>
      <p>
        { message ? message : 'It seems like the content you are looking for was either moved or does not exist.' }
      </p>
      <Link to={url ? url : '/'} className="btn marg-top-1">
        { urlText ? urlText : 'Back to home' }
      </Link>
    </div>
  );
};

// Prop validations
NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string,
  urlText: PropTypes.string,
};

export default NotFound;
