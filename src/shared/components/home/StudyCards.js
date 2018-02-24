import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';
import PropTypes from 'prop-types';

class StudyCards extends Component {
  static defaultProps = {
    name: 'Huntsman 380 Computer Lab',
    hours: '24/7',
    noise: 0,
    groups: 2,
    outlets: 1
  }

  renderNoise() {
    if (this.props.noise === 0) {
      return (
        <span className="tag tag-is-blue">
          Silent
        </span>
      );
    } else if (this.props.noise === 1) {
      return (
        <span className="tag tag-is-yellow">
          Moderate
        </span>
      );
    }

    return (<span className="tag tag-is-green">Loud</span>);
  }

  renderGroups() {
    if (this.props.groups === 0) {
      return (<span className="tag is-info">No</span>);
    } else if (this.props.groups === 1) {
      return (<span className="tag tag-is-yellow">Okay</span>);
    }

    return (<span className="tag tag-is-green">Yes</span>);
  }

  renderOutlets() {
    if (this.props.outlets === 0) {
      return (<span className="tag is-info">None</span>);
    } else if (this.props.outlets === 1) {
      return (<span className="tag tag-is-yellow">Sparse</span>);
    }

    return (<span className="tag tag-is-green">Plenty</span>);
  }

  render() {
    return (
      <article className="media">
        <div className="media-content">
          <div className="content" >
            <p className="is-size-5">
              <strong>{this.props.name}</strong>
              <br />
              <small>Hours: {this.props.hours}</small>
              <br />
              <small>Noise Level: {this.renderNoise()}
              </small> <br />
              <small>Good for groups: {this.renderGroups()}</small>
              <br />
              <small>Outlets: {this.renderOutlets()}</small>
            </p>
          </div>
        </div>
      </article>
    );
  }
}

StudyCards.propTypes = {
  name: PropTypes.string,
  hours: PropTypes.string,
  noise: PropTypes.number,
  groups: PropTypes.number,
  outlets: PropTypes.number,
};

export default StudyCards;
