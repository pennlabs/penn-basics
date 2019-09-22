import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import { BorderedCard } from '../shared'
import MachineAvailability from '../laundry/MachineAvailability'

import { getFavoritesHomePage } from '../../actions/laundry_actions'

class Laundry extends Component {
  componentDidMount() {
    const { dispatchGetFavoritesHomePage } = this.props
    dispatchGetFavoritesHomePage()
  }

  renderFavorites() {
    const { favoritesHome } = this.props

    if (favoritesHome.length === 0) {
      return (
        <Link to="/laundry" className="link">
          <h4> Select your favorite Laundry hall </h4>
        </Link>
      )
    }

    return favoritesHome.map((favorite, index) => {
      const { washers, dryers } = favorite.machines

      return (
        <>
          <h1 className="title is-6">
            {`${favorite.location}: ${favorite.hall_name}`}
          </h1>
          <p> Washer </p>
          <MachineAvailability displayDetails={false} machineData={washers} />
          <p> Dryer </p>
          <MachineAvailability displayDetails={false} machineData={dryers} />
          {index === favoritesHome.length - 1 ? null : <hr />}
          <div className="columns" key={uuid()} />
        </>
      )
    })
  }

  render() {
    return (
      <BorderedCard>
        <article className="tile is-child">
          <Link to="/laundry" className="link">
            <h1 className="title is-4">Laundry</h1>
          </Link>
          <h3 className="subtitle is-6">Status of your favorite halls</h3>
        </article>
        <br />
        {this.renderFavorites()}
      </BorderedCard>
    )
  }
}

Laundry.defaultProps = {
  favoritesHome: [],
}

Laundry.propTypes = {
  favoritesHome: PropTypes.array, // eslint-disable-line
  dispatchGetFavoritesHomePage: PropTypes.func.isRequired,
}

const mapStateToProps = ({ laundry }) => {
  const { favoritesHome } = laundry
  return {
    favoritesHome,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavoritesHomePage: () => dispatch(getFavoritesHomePage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Laundry)
