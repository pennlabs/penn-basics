import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class Studyspaces extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <article className="tile is-child notification whiteCard">
        <h1 className="title is-3">Studyspaces</h1>
        <h3 className="subtitle is-5">How about studying at VP?</h3>
      </article>
    )
  }
}
export default Studyspaces;
