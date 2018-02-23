import React, { Component } from 'react';
import '../../styles/home.scss';
import PropTypes from 'prop-types';

// Card to reserve a room
class RARCards extends Component {
  static defaultProps = {
    name: 'Education Commons 247',
    hours: '8:30pm to 10:00pm',
    type: 0,
  }

  render() {
    return (
      <article className="media">
        <div className="media-left">
          <a className="button is-primary is-medium">
            <span className="icon">
              <i className="fa fa-hand-peace-o" />
            </span>
            <span style={{ width: '5px' }} />
            Book Now
          </a>
        </div>
        <div className="spacer-20" />
        <div className="media-content">
          <div className="content" >
            <p className="is-size-5">
              <strong>
                {this.props.name}
              </strong>
              <br />
              <small>
                {this.props.hours}
              </small>
            </p>
          </div>
        </div>
      </article>
    );
  }
}

RARCards.propTypes = {
  name: PropTypes.string,
  hours: PropTypes.string,
};

export default RARCards;
