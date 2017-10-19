import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '../../styles/home.scss';

class Home extends Component {
  constructor(props) {
    super (props);

  }
  render () {
    return (
      <div style={{padding: "40px"}}>
        <h1 className="title">Howdy Nihar!</h1>
        <div className="spacer"></div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-6">
            <article className="tile is-child notification whiteCard">
              <h1 className="title is-3">Dining</h1>
              <h3 className="subtitle is-5">1920 Commons looks like a great
                place to eat right now.</h3>
            </article>
          </div>
          <div className="tile is-parent is-6">
            <article className="tile is-child notification whiteCard">
              <h1 className="title is-3">Laundry</h1>
              <h3 className="subtitle is-5">Rodin 5th floor is busy.</h3>
            </article>
          </div>
        </div>
        <div className="tile is-ancestor">
          <div className="tile is-parent is-6">
            <article className="tile is-child notification whiteCard">
              <h1 className="title is-3">Studyspaces</h1>
              <h3 className="subtitle is-5">How about studying at VP?</h3>
            </article>
          </div>
          <div className="tile is-parent is-6">
            <article className="tile is-child notification whiteCard">
              <h1 className="title is-3">Reserve a room</h1>
              <h3 className="subtitle is-5">Select one of the spaces below
              to book a room now.</h3>
            </article>
          </div>
        </div>
      </div>
    )
  }
}
export default Home;
