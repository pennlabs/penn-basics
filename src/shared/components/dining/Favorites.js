import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uuid from 'uuid'


import DiningCard from './DiningCard'
import venueData from '../../../server/database/venue_info.json'
import {
  Card,
  Line,
  NavSectionHeader,
} from '../shared';
import { BABY_BLUE } from '../../styles/colors'


class Favorites extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    const { favorites } = this.props

    if (!favorites || !favorites.length) return null

    return (
      <div>
        <Card background={BABY_BLUE} padding="0">
          <NavSectionHeader className="title is-5"> Favorites </NavSectionHeader>
          <Line />
        </Card>

        {favorites.map(id => {
          return (
            <DiningCard
              key={uuid()}
              venueId={id}
              name={venueData[id].name}
              image={venueData[id].image}
            />
          )
        })}
      </div>
    )
  }
}


const mapStateToProps = ({ dining }) => {
  const {
    favorites
  } = dining

  return {
    favorites
  }
}


export default connect(mapStateToProps, null)(Favorites)
