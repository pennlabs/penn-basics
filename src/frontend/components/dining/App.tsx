import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Dispatch, Action } from 'redux'

import { Row, Col } from '../shared'
import { NAV_HEIGHT } from '../../styles/sizes'
import Nav from './Nav'
import DiningVenue from './DiningVenue'
import { getFavorites, getVenueHours } from '../../actions/dining_actions'

interface IAppProps {
  dispatchGetFavorites: () => void
  dispatchGetVenueHours: () => void
  id: number
}

const App = ({ dispatchGetFavorites, dispatchGetVenueHours, id } : IAppProps) : React.ReactElement => {
  useEffect(() => {
    dispatchGetFavorites()
    dispatchGetVenueHours()
  }, [])

  const parsedVenueId = Number.isNaN(id) ? null : id

  return (
    <Row fullHeightDesktop>
      <Nav selectedVenueId={parsedVenueId} />

      <Col
        sm={12}
        md={8}
        overflowY="scroll"
        maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        hideOnMobile={Boolean(!parsedVenueId)}
      >
        <DiningVenue venueId={parsedVenueId} />
      </Col>
    </Row>
  )
}

App.defaultProps = {
  id: '',
}

App.propTypes = {
  id: PropTypes.string,
  dispatchGetFavorites: PropTypes.func.isRequired,
  dispatchGetVenueHours: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchGetVenueHours: () => dispatch(getVenueHours()),
})

export default connect(null, mapDispatchToProps)(App)
