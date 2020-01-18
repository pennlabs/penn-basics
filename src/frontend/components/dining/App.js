import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col } from '../shared'
import { NAV_HEIGHT } from '../../styles/sizes'
import Nav from './Nav'
import DiningVenue from './DiningVenue'
import { getFavorites, getVenueHours } from '../../actions/dining_actions'

class App extends Component {
  componentDidMount() {
    const { dispatchGetFavorites, dispatchGetVenueHours } = this.props
    dispatchGetFavorites()
    dispatchGetVenueHours()
  }

  render() {
    const { id } = this.props

    const parsedVenueId = Number.isNaN(id) ? null : id

    return (
      <Row fullHeightDesktop>
        <Nav selectedVenueId={parsedVenueId} />

        <Col
          sm={12}
          md={8}
          overflowY="scroll"
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
          hideOnMobile={!parsedVenueId}
        >
          <DiningVenue venueId={parsedVenueId} />
        </Col>
      </Row>
    )
  }
}

App.defaultProps = {
  id: '',
}

App.propTypes = {
  id: PropTypes.string,
  dispatchGetFavorites: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchGetVenueHours: () => dispatch(getVenueHours()),
})

export default connect(
  null,
  mapDispatchToProps
)(App)
