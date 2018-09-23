import React from 'react';
import '../../styles/home.scss';
import PropTypes from 'prop-types';

// Render the notification component for the home page
const Notification = ({
  show,
  text,
}) => (
  <div className="notification is-info">
    <button type="button" className="delete" onClick={show} />

    <p style={{ textAlign: 'center' }}>
      { "⚡ It's currently ~~lit o'clock~~ " }
      <strong>
        {text}
      </strong>
      ⚡
    </p>
  </div>
);

// Prop validations
Notification.propTypes = {
  show: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Notification;
