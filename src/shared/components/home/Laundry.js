import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BorderedCard } from '../shared';
import {
  getFavoritesHomePage1,
  getFavoritesHomePage2,
  getFavoritesHomePage3
} from '../../actions/laundry_actions';

class Laundry extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }

  renderFavorites() {
    const { getFavoritesHomePage1, getFavoritesHomePage2, getFavoritesHomePage3 } = this.props;
    const favoritesArray = JSON.parse(localStorage.getItem('laundry_favorites'));
    if (!favoritesArray) {
      return;
    }
    console.log(favoritesArray);
    getFavoritesHomePage1(favoritesArray[0]);
    getFavoritesHomePage2(favoritesArray[1]);
    getFavoritesHomePage3(favoritesArray[2]);
    
    const { favoriteHome1, favoriteHome2, favoriteHome3 } = this.props;
    const favoritesHome = [];
    if (favoriteHome1.locationName) {
      favoritesHome.push(favoriteHome1);
    }

    if (favoriteHome2.locationName) {
      favoritesHome.push(favoriteHome2);
    }

    if (favoriteHome3.locationName) {
      favoritesHome.push(favoriteHome3);
    }

    return (
      favoritesHome.map((favorite, index, array) => {
        if (index >= 3) {
          return (null);
        }

        if (index === array.length - 1) {
          return (
            <div className="columns">
              <div className="column">
                <h1 className="title is-6"> {`${index + 1}. ${favorite.locationName}`} </h1>
              </div>
              <div className="column is-4">
                <h1 className="subtitle is-4"> Washers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.washers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.washers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.washers.out_of_order} </h1>
              </div>
              <div className="column is-5">
                <h1 className="subtitle is-4"> Dryers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.dryers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.dryers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.dryers.out_of_order} </h1>
              </div>
            </div>
          )
        }

        return (
          <>
            <div className="columns">
              <div className="column">
                <h1 className="title is-6"> {`${index + 1}. ${favorite.locationName}`} </h1>
              </div>
              <div className="column is-4">
                <h1 className="subtitle is-4"> Washers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.washers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.washers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.washers.out_of_order} </h1>
              </div>
              <div className="column is-5">
                <h1 className="subtitle is-4"> Dryers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.dryers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.dryers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.dryers.out_of_order} </h1>
              </div>
            </div>
            <hr />
          </>
        )
      })

    )
  }

  render() {
    return (
      <BorderedCard>
        <article className="tile is-child">
          <Link to="/laundry" className="link">
            <h1 className="title is-4">Laundry</h1>
          </Link>
          <h3 className="subtitle is-6">Click to find an open machine.</h3>
          <img
            src="https://i.imgur.com/JDX9ism.png"
            style={{ width: '50%' }}
            alt="Laundry"
          />
          <h1 className="title is-5"> Your Favorite Laundry Halls </h1>
          <h3 className="subtitle is-6">Only the first 3 favorites will be shown</h3>
          <br />
        </article>
        {this.renderFavorites()}

      </BorderedCard>
    )
  }
}

const mapStateToProps = ({ laundry }) => {
  const { favoriteHome1, favoriteHome2, favoriteHome3 } = laundry;
  return {
    favoriteHome1,
    favoriteHome2,
    favoriteHome3
  };
};

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    getFavoritesHomePage1: (laundryHall) => dispatch(getFavoritesHomePage1(laundryHall)),
    getFavoritesHomePage2: (laundryHall) => dispatch(getFavoritesHomePage2(laundryHall)),
    getFavoritesHomePage3: (laundryHall) => dispatch(getFavoritesHomePage3(laundryHall))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laundry);
