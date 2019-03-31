import React from 'react'
import StudyCards from './StudyCards'
import { BorderedCard } from '../shared'


// TODO why two study cards?
const Studyspaces = () => (
  <BorderedCard>
    <h1 className="title is-4">
      Find a study space
    </h1>

    <h2 className="subtitle is-6">
      Book a room quickly across campus: at VP, Huntsman, Ed Commons, and more.
    </h2>

    <StudyCards />
    <StudyCards />
  </BorderedCard>
)


export default Studyspaces
