import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/spinner.scss';

/**
 * Component to render while page is loading
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
        <h1 className="is-size-3 medium-gray-text marg-bot-2">
          {this.props.title}
        </h1>
        <img className="marg-top-2" id="loading" src="https://i.imgur.com/Iq7qUnH.png" width="300px" />
      </div>
    );
  }
}

export default Loading
