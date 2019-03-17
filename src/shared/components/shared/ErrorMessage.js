import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message = '' }) => {
  if (!message) return null;

  return (
    <div className="notification is-danger">
      <button className="delete" type="button" />

      { message || 'Oops, there was an error' }
    </div>
  );
};

ErrorMessage.defaultProps = {
  message: '',
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
