import React from 'react';
import StudyCards from './StudyCards';

import '../../styles/home.scss'; // TODO Is this necessary?

// TODO why two study cards?

const Studyspaces = () => (
  <div className="tile is-child box">
    <h1 className="title is-4">
      Find a study space
    </h1>

    <h2 className="subtitle is-6">
      Book a room quickly across campus: at VP, Huntsman, Ed Commons, and more.
    </h2>

    <StudyCards />
    <StudyCards />
  </div>
);

export default Studyspaces;
