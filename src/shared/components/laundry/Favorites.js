import React, { Component } from 'react';

import FavoriteCard from './FavoriteCard';

import {
  Card,
  Subtitle,
  Subtext,
  Row,
  Col,
} from '../shared';

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
        <div>
          <Card padding="0.5rem 1rem">
          <Row>
            <Col padding="0">
              <Subtitle marginBottom="0"> Favorites </Subtitle>
            </Col>
          </Row>
        </Card>

          {
            favorites.map(favorite => <FavoriteCard hallId={favorite.hallId} locationName={favorite.locationName}/>)
          }
        </div>
      );
    }
    return null;
  }
}

export default Favorites;
