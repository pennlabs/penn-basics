import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  getLaundryHalls,
  getFavorites,
  checkBrowserCompatability,
} from '../../actions/laundry_actions'
import { Card, Row, Col, Scrollbar, NavSectionHeader, Line } from '../shared'
import { BABY_BLUE } from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import Favorites from '../shared/favorites/Favorites'
import { NAV_HEIGHT } from '../../styles/sizes'
import LaundryCard from './LaundryCard'
import LaundryVenue from './LaundryVenue'
import FavoriteCard from './FavoriteCard'

class App extends Component {
  constructor(props) {
    super(props)
    const {
      dispatchGetLaundryHalls,
      dispatchGetFavorites,
      dispatchCheckBrowser,
    } = this.props

    dispatchGetLaundryHalls()
    dispatchGetFavorites()
    dispatchCheckBrowser()
  }

  render() {
    const {
      laundryHalls,
      match: {
        params: { id } = {
          params: { id: '-1' },
        },
      },
      favorites,
    } = this.props

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Scrollbar
          padding="0 0 .5rem 0"
          width="20%"
          borderRight
          height={`calc(100vh - ${NAV_HEIGHT})`}
        >
          <Favorites
            favorites={favorites}
            FavoriteCard={FavoriteCard}
            inputName="favorite"
          />

          <Card background={BABY_BLUE} padding="0">
            <NavSectionHeader className="title is-5">
              Laundry Halls
            </NavSectionHeader>
            <Line />
          </Card>

          {laundryHalls &&
            laundryHalls.map(locationObject => (
              <LaundryCard
                locationObject={locationObject}
                key={locationObject.location}
              />
            ))}

          <PennLabsCredit />
        </Scrollbar>

        <Col
          width="80%"
          overflowY="auto"
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        >
          <LaundryVenue hallURLId={Number.isNaN(id) ? null : id} />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ laundry }) => {
  const { laundryHalls, favorites } = laundry
  return { laundryHalls, favorites }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetLaundryHalls: () => dispatch(getLaundryHalls()),
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchCheckBrowser: () => dispatch(checkBrowserCompatability()),
})

App.defaultProps = {
  laundryHalls: null,
  favorites: [],
}

App.propTypes = {
  laundryHalls: PropTypes.arrayOf(
    PropTypes.shape({
      halls: PropTypes.array,
      location: PropTypes.string,
    })
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      hallId: PropTypes.number,
      locationName: PropTypes.string,
    })
  ),
  dispatchGetFavorites: PropTypes.func.isRequired,
  dispatchGetLaundryHalls: PropTypes.func.isRequired,
  dispatchCheckBrowser: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
