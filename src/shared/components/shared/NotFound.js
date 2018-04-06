import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Component to render when a page is not found
 */
class NotFound extends Component {
  // Set the default props
  static defaultProps = {
    title: '404: Content not found',
    message: 'It seems like the content you are looking for was either moved or does not exist.',
    urlText: 'Back to home',
    url: '/'
  }

  // Render the component
  render() {
    return (
      <div className="center-div">
        <img className="marg-bot-2" src="https://i.imgur.com/PMJ4fDJ.png" width="400px" />
        <h1 className="is-size-3 medium-gray-text">
          {this.props.title}
        </h1>
        <p>
          {this.props.message}
        </p>
        <Link to={this.props.url} className="btn marg-top-1">
          {this.props.urlText}
        </Link>
      </div>
    );
  }
}

NotFound.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  url: PropTypes.string,
  urlText: PropTypes.string,
};

export default NotFound;
