import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import {
  GREEN,
  MUSTARD,
  MEDIUM_GRAY,
  FOCUS_GRAY,
  LIGHT_GREEN,
  LIGHT_YELLOW,
} from '../../styles/colors'
import { Row, LaundryOverview } from '../shared'

import { BorderedCard } from '../shared'
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

    return (
      favoritesHome.map((favorite, index) => {
        const {
          open = 0,
          running = 0,
          out_of_order: outOfOrder = 0,
          offline = 0,
        } = favorite.machines.washers

        return (
          <>
            <div className="column">
              <h1 className="title is-6">
                {`${index + 1}. ${favorite.location}: ${favorite.hall_name}`}
              </h1>
            </div>
            <div className="columns" key={uuid()}>
              <Row justifyContent="space-between">
                {[
                  [open, 'Available', GREEN, LIGHT_GREEN],
                  [running, 'Busy', MUSTARD, LIGHT_YELLOW],
                  [outOfOrder + offline, 'Broken', MEDIUM_GRAY, FOCUS_GRAY],
                ].map(([number, title, color, background]) => (
                  <LaundryOverview
                    width="30%"
                    key={title}
                    color={color}
                    background={background}
                  >
                    <h1>{number}</h1>
                    <p>{title}</p>
                  </LaundryOverview>
                ))}
              </Row>

              {index === favoritesHome.length - 1 ? null : <hr />}
            </div>
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
          <h3 className="subtitle is-6">Status of favorite halls</h3>
          <br />
        </article>
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
