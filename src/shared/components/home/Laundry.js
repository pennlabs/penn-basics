import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BorderedCard } from '../shared';
import {
  getFavoritesHomePage,
} from '../../actions/laundry_actions';

class Laundry extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getFavoritesHomePage } = this.props;
    getFavoritesHomePage(JSON.parse(localStorage.getItem('laundry_favorites')));
  }

  renderFavorites() {
    // console.log(this.props.favoritesHome);
    const { favoritesHome } = this.props;

    return (
      favoritesHome.map((favorite, index, array) => {
        if (index >= 3) {
          return (null);
        }

        if (index === array.length - 1) {
          return (
            <div className="columns">
              <div className="column">
                <h1 className="title is-6"> {`${index + 1}. ${favorite.location}: ${favorite.hall_name}`} </h1>
              </div>
              <div className="column is-4">
                <h1 className="subtitle is-4"> Washers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.machines.washers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.machines.washers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.machines.washers.out_of_order} </h1>
              </div>
              <div className="column is-5">
                <h1 className="subtitle is-4"> Dryers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.machines.dryers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.machines.dryers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.machines.dryers.out_of_order} </h1>
              </div>
            </div>
          )
        }

        return (
          <>
            <div className="columns">
              <div className="column">
                <h1 className="title is-6"> {`${index + 1}. ${favorite.location}: ${favorite.hall_name}`} </h1>
              </div>
              <div className="column is-4">
                <h1 className="subtitle is-4"> Washers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.machines.washers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.machines.washers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.machines.washers.out_of_order} </h1>
              </div>
              <div className="column is-5">
                <h1 className="subtitle is-4"> Dryers Availability </h1>
                <h1 className="subtitle is-6"> Available: {favorite.machines.dryers.open} </h1>
                <h1 className="subtitle is-6"> Busy: {favorite.machines.dryers.running} </h1>
                <h1 className="subtitle is-6"> Out of Order: {favorite.machines.dryers.out_of_order} </h1>
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
          <br/>
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
  const { favoritesHome } = laundry;
  return {
    favoritesHome
  };
};

const mapDispatchToProps = (dispatch) => { //eslint-disable-line
  return {
    getFavoritesHomePage: (laundryHalls) => dispatch(getFavoritesHomePage(laundryHalls)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Laundry);
