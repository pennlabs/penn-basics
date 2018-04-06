import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Component to render while page is loading
 */
class Loading extends Component {
  // Set the default props
  static defaultProps = {
    title: 'Loading, please wait',
  };

  // Render the component
  render() {
    return (
      <div className="center-div">
        {
          this.props.title ? (
            <h1 className="is-size-3 medium-gray-text marg-bot-2">
              {this.props.title}
            </h1>
          ) : null
        }
        <img className="marg-top-2" id="loading" src="https://i.imgur.com/Iq7qUnH.png" width="300px" />
      </div>
    );
  }
}

Loading.propTypes = {
  title: PropTypes.string,
};

export default Loading;
