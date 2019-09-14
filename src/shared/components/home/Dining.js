import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { BorderedCard } from '../shared'
import DiningCards from './DiningCards'
import venueData from '../../../server/database/venue_info.json'


class Dining extends Component {
  constructor(props) {
    super(props)
    this.state = { object: false }
  }


  render() {
    const { object } = this.state

    return (
      <BorderedCard>
        <Link to="/dining" className="link">
          <h1 className="title is-4">Dining</h1>
          <h2 className="subtitle is-6">Status of Dining Halls</h2>
        </Link>

        <div className="space-1" />
        {(object === null) ? (
          <img
            src="https://i.imgur.com/fFniYax.png"
            alt="No dining cards"
            width="500px"
          />
        ) : (
            <div>
              <DiningCards name="Kings Court English House" type={0} />
              <DiningCards name="Pret a Manger" type={1} />
            </div>
          )}
      </BorderedCard>
    );
  }
}

export default Dining;
