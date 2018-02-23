import React, { Component } from 'react';
import '../../styles/home.scss';
import StudyCards from './StudyCards';

class Studyspaces extends Component {
  render() {
    return (
      <article className="tile is-child notification whiteCard">
        <h1 className="title is-3">Studyspaces</h1>
        <h3 className="subtitle is-5">How about studying at VP?</h3>
        <StudyCards />
        <StudyCards />
      </article>
    );
  }
}

export default Studyspaces;
