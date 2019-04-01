import React, { Component } from 'react'
import PropTypes from 'prop-types'


class StudyCards extends Component {
  constructor(props) {
    super(props);

    this.renderNoise = this.renderNoise.bind(this);
    this.renderGroups = this.renderGroups.bind(this);
    this.renderOutlets = this.renderOutlets.bind(this);
  }


  renderNoise() {
    const { noise } = this.props

    if (noise === 0) {
      return (
        <span className="tag tag-is-blue">
          Silent
        </span>
      );
    }

    if (noise === 1) {
      return (
        <span className="tag tag-is-yellow">
          Moderate
        </span>
      )
    }

    return (
      <span className="tag tag-is-green">
        Loud
      </span>
    )
  }


  renderGroups() {
    const { groups } = this.props;

    if (groups === 0) {
      return (
        <span className="tag is-info">No</span>
      )
    }

    if (groups === 1) {
      return (
        <span className="tag tag-is-yellow">Okay</span>
      )
    }

    return (
      <span className="tag tag-is-green">Yes</span>
    )
  }


  renderOutlets() {
    const { outlets } = this.props;

    if (outlets === 0) {
      return (
        <span className="tag is-info">None</span>
      )
    }

    if (outlets === 1) {
      return (
        <span className="tag tag-is-yellow">Sparse</span>
      )
    }

    return (
      <span className="tag tag-is-green">Plenty</span>
    )
  }


  render() {
    const {
      name,
      hours,
    } = this.props

    return (
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p className="is-size-6">
              <strong>{name}</strong>

              <br />

              <small>
                Hours:
                {hours}
              </small>

              <br />

              <small>
                Noise Level:
                {this.renderNoise()}
              </small>

              <br />

              <small>
                Good for groups:
                {this.renderGroups()}
              </small>

              <br />

              <small>
                Outlets:
                {this.renderOutlets()}
              </small>
            </p>
          </div>
        </div>
      </article>
    )
  }
}


StudyCards.defaultProps = {
  name: 'Huntsman 380 Computer Lab',
  hours: '24/7',
  noise: 0,
  groups: 2,
  outlets: 1,
}


StudyCards.propTypes = {
  name: PropTypes.string,
  hours: PropTypes.string,
  noise: PropTypes.number,
  groups: PropTypes.number,
  outlets: PropTypes.number,
}


export default StudyCards
