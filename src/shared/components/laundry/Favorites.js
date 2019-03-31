import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FavoriteCard from './FavoriteCard'
import { getFavorites } from '../../actions/laundry_actions'
import {
  Card,
  Line,
  NavSectionHeader
} from '../shared';

import {
  BABY_BLUE,
} from '../../styles/colors'

// TODO hours for the day?

class Favorites extends Component {
  constructor(props) {
    super(props)

    const { dispatchGetFavorites } = this.props
    dispatchGetFavorites()
  }

  render() {
    const { favorites } = this.props

    if (favorites && favorites.length > 0) {
      return (
        <div>
          <Card background={BABY_BLUE} padding="0">
            <NavSectionHeader className="title is-5"> Favorites </NavSectionHeader>
            <Line />
          </Card>

          {favorites.map(({ hallId, locationName }) => (
            <FavoriteCard
              key={hallId}
              hallId={hallId}
              locationName={locationName}
            />
          ))}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  const { laundry } = state

  return { favorites: laundry.favorites }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
})

Favorites.defaultProps = {
  favorites: null,
}

// TODO proptypes for favorites

Favorites.propTypes = {
  dispatchGetFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.array, // eslint-disable-line
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
