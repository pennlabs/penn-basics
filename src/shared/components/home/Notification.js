import React, { Component } from 'react';
import '../../styles/home.scss';
import PropTypes from 'prop-types';

/**
 * Render the notification component for the home page
 */
class Notification extends Component {
  static defaultProps = {
    text: []
  }

  render() {
    return (
      <div className="notification is-info">
        <button className="delete" onClick={this.props.show} />
        <p style={{ textAlign: "center" }}>
          { "⚡ It's currently ~~lit o'clock~~ " }
          <strong>
            {this.props.text.join(", ")}
          </strong>⚡
        </p>
      </div>
    );
  }
}

// Prop validations
Notification.propTypes = {
  show: PropTypes.func,
  text: PropTypes.array,
};

export default Notification;
