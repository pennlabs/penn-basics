import React, { Component } from 'react';
import { connect } from 'react-redux';

import FavoriteCard from './FavoriteCard';
import { getFavorites } from '../../actions/laundry_actions';

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
    super(props);
    const { getFavorites } = this.props;
    getFavorites();
  }

  render() {
    const { favorites } = this.props;

    if (favorites && favorites.length > 0) {
      return (
        <div>
          <Card background={BABY_BLUE} padding="0">
            <NavSectionHeader className="title is-5"> Favorites </NavSectionHeader>
            <Line />
          </Card>

          {
            favorites.map(favorite => <FavoriteCard hallId={favorite.hallId} locationName={favorite.locationName} />)
          }
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  const { laundry } = state;
  return {
    favorites: laundry.favorites
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFavorites: () => dispatch(getFavorites())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
