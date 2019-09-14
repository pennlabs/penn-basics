import React, { Component } from 'react'
import { connect } from 'react-redux'

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
        params: { id } = {
          params: { id: '-1' },
        },
      },
    } = this.props

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Nav />

        <Col
          width="70%"
          overflowY="scroll"
          maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        >
          <DiningVenue venueId={Number.isNaN(id) ? null : id} />
        </Col>
      </Row>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
})

export default connect(null, mapDispatchToProps)(App)
