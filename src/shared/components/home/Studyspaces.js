import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import '../../styles/home.scss';
import StudyCards from './StudyCards';

class Studyspaces extends Component {
  render() {
    return (
      <div className="tile is-child box">
        <h1 className="title is-3">Studyspaces</h1>
        <h2 className="subtitle is-5">Book a room quickly across campus: at VP,
          Huntsman, Ed Commons, and more.</h2>
          <StudyCards/>
          <StudyCards/>
      </div>
    )
  }
}

export default Studyspaces;
