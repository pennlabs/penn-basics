import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';
import StudyCards from './StudyCards';

class Studyspaces extends Component {
  render() {
    return (
      <div className="home">
        <article className="tile is-child notification white-card">
          <h1 className="title is-3">Studyspaces</h1>
          <StudyCards />
          <StudyCards />
        </article>
      </div>
    )
  }
}

export default Studyspaces;
