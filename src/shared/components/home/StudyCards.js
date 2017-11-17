import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class StudyCards extends Component {
  constructor(props) {
    super (props);
      this.state = {
        name: this.props.name || 'Huntsman 380 Computer Lab',
        hours: this.props.hours || '24/7',
        noise: this.props.noise || 5,
        groups: this.props.type || true,
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
              <small>Noise Level: {this.state.noise.toString()}</small> <br/>
              <small>{this.state.groups && <span className="tag is-danger">Groups</span>}</small>
              <small>{this.state.noise > 3 && <span className="tag is-warning">Loud</span>}</small>
            </p>
          </div>
        </div>
      </article>
    )
  }
}
export default StudyCards;
