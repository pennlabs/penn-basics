import React, { Component } from 'react';

import FavoriteCard from './FavoriteCard';

// TODO hours for the day?

class Favorites extends Component {
  constructor(props) {
    super(props);
    const favorites = localStorage.getItem('favorites');
    this.state = {
      favorites: JSON.parse(favorites),
    };
  }

  render() {
    const { favorites } = this.state;
    if (favorites && favorites.length > 0) {
      return (
        <>
          {
            favorites.map(favorite => <FavoriteCard hallId={favorite.hallId} />)
          }
        </>
      );
    }
    return null;
  }
}

export default Favorites;
