import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Row, Col } from '../shared'
import { NAV_HEIGHT } from '../../styles/sizes'
import Nav from './Nav'
import DiningVenue from './DiningVenue'
import { getFavorites } from '../../actions/dining_actions'

class App extends Component {
  constructor(props) {
    super(props)

    const { dispatchGetFavorites } = this.props
    dispatchGetFavorites()
  }

  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props

    const parsedVenueId = Number.isNaN(id) ? null : id

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Nav selectedVenueId={parsedVenueId} />

        <Col
          width="70%"
          overflowY="scroll"
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        >
          <DiningVenue venueId={parsedVenueId} />
        </Col>
      </Row>
    )
  }
}

App.defaultProps = {
  match: {},
}

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  dispatchGetFavorites: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
})

export default connect(
  null,
  mapDispatchToProps
)(App)
