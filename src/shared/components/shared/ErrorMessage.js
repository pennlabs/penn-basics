import React from 'react';
import PropTypes from 'prop-types';

// Display an error to the user
const ErrorMessage = ({ message = '' }) => {
  if (!message) return null;

  return (
    <div className="notification is-danger">
      <button className="delete" type="button" />

      { message || 'Oops, there was an error' }
    </div>
  );
};

ErrorMessage.defautProps = {
  message: '',
};

// Validate props
ErrorMessage.propTypes = {
  message: PropTypes.string,
};

// Export this component
export default ErrorMessage;
