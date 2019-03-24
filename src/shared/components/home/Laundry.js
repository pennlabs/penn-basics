import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BorderedCard } from '../shared';

class Laundry extends Component {
  renderFavorites() {
    if (!this.props.favortes) {
      return null
    }
    return (
      this.props.favorites.map((favorite, index, array) => {
        if (index >= 3) {
          return (null);
        }

        if (index === array.length-1) {
          return (
              <div className="columns">
                <div className="column">
                  <h1 className="title is-6"> {`${index+1}. ${favorite.locationName}`} </h1>
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
                <h1 className="title is-6"> {`${index+1}. ${favorite.locationName}`} </h1>
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
            style={{ width: '50%'}}
            alt="Laundry"
          />
          <h1 className="title is-5"> Your Favorite Laundry Halls </h1>
          <h3 className="subtitle is-6">Only the first 3 favorites will be shown</h3>
          <br/>
        </article>
        {this.renderFavorites()}

      </BorderedCard>

    )


  }

}

const mapStateToProps = ({ laundry }) => {
  const { favorites } = laundry;
  return {
    favorites
  };
};

export default connect(mapStateToProps, null)(Laundry);
