import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class StudyCards extends Component {
  constructor(props) {
    super (props);
      this.state = {
        name: this.props.name || 'Huntsman 380 Computer Lab',
        hours: this.props.hours || '24/7',
        noise: this.props.noise || 0,
        groups: this.props.type || 2,
        outlets: this.props.outlets || 1,
      }
  }
  noise () {
    if (this.state.noise === 0) {
      return <span className="tag is-info">Silent</span>
    } else if (this.state.noise === 1) {
      return <span className="tag is-warning">Moderate</span>
    } else {
      return <span className="tag is-danger">Loud</span>
    }
  }
  groups ()  {
    if (this.state.groups === 0) {
      return <span className="tag is-info">No</span>
    } else if (this.state.groups === 1) {
      return <span className="tag is-warning">Okay</span>
    } else {
      return <span className="tag is-danger">Yes</span>
    }
  }
  outlets () {
    if (this.state.outlets === 0) {
      return <span className="tag is-info">None</span>
    } else if (this.state.outlets === 1) {
      return <span className="tag is-warning">Sparse</span>
    } else {
      return <span className="tag is-danger">Plenty</span>
    }
  }
  render () {
    return (
      <article className="media">
        <div className="media-content">
          <div className="content" >
            <p className="is-size-5">
              <strong>{this.state.name}</strong>
              <br/>
              <small>Hours: {this.state.hours}</small> <br />
              <small>Noise Level: {this.noise()}
              </small> <br />
              <small>Good for groups: {this.groups()}</small> <br/>
              <small>Outlets: {this.outlets()}</small>
            </p>
          </div>
        </div>
      </article>
    )
  }
}
export default StudyCards;
