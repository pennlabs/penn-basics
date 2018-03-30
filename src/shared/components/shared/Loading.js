import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component to render when a page is not found
 */
class Loading extends Component {
  // Set the default props
  static defaultProps = {
    title: 'Hang on, loading your data.',
    message: 'It seems like the content you are looking for was either moved or does not exist.',
  }

  // Render the component
  render() {
    return (
      <div>
        <h1 className="is-size-3 medium-gray-text">
          {this.props.title}
        </h1>
        <p>
          {this.props.message}
        </p>
      </div>
    );
  }
}

export default Loading
