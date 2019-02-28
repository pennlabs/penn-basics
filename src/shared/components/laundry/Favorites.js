import React, { Component } from 'react';
import {connect} from 'react-redux';

import FavoriteCard from './FavoriteCard';
import {getFavorites} from '../../actions/laundry_actions';

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
    const { getFavorites } = this.props;
    getFavorites();
  }

  render() {
    const { favorites } = this.props;
    
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

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);
