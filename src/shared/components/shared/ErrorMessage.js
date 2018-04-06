import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display an error to the user
 */
const ErrorMessage = ({ message }) => (
  <div className="notification is-danger">
    <button className="delete" />
    { message ? message : "Oops, there was an error" }
  </div>
);

// Validate props
ErrorMessage.propTypes = {
  message: PropTypes.string,
};

// Export this component
export default ErrorMessage;
