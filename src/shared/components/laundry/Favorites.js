import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import FavoriteCard from './FavoriteCard'
import { getFavorites } from '../../actions/laundry_actions'
import {
  Card,
  Line,
  NavSectionHeader,
} from '../shared';
import { BABY_BLUE } from '../../styles/colors'


class Favorites extends Component {
  constructor(props) {
    super(props)

    const { dispatchGetFavorites } = this.props
    dispatchGetFavorites()
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

        {favorites.map(({ hallId, locationName }) => (
          <FavoriteCard
            key={hallId}
            hallId={hallId}
            locationName={locationName}
          />
        ))}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  const { laundry: { favorites = [] } } = state
  return { favorites }
}


const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
})


Favorites.defaultProps = {
  favorites: null,
}


Favorites.propTypes = {
  dispatchGetFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    hallId: PropTypes.string,
    locationName: PropTypes.string,
  })),
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
