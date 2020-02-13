import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Row, Col } from '../shared'
import { NAV_HEIGHT } from '../../styles/sizes'
import Nav from './Nav'
import DiningVenue from './DiningVenue'
import { getFavorites, getVenueHours } from '../../actions/dining_actions'

interface IAppProps {
  dispatchGetFavorites: () => void
  dispatchGetVenueHours: () => void
  id: string
}

const App = ({ dispatchGetFavorites, dispatchGetVenueHours, id }: IAppProps): React.ReactElement => {
  useEffect(() => {
    dispatchGetFavorites()
    dispatchGetVenueHours()
  }, [])

  return (
    <Row fullHeightDesktop>
      <Nav selectedVenueId={id} />

      <Col
        sm={12}
        md={8}
        overflowY="scroll"
        maxHeight={`calc(100vh - ${NAV_HEIGHT} - 1px)`}
        hideOnMobile={Boolean(!id)}
      >
        <DiningVenue venueId={id} />
      </Col>
    </Row>
  )
}

const mapDispatchToProps = (dispatch: (action: any) => any) => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
  dispatchGetVenueHours: () => dispatch(getVenueHours()),
})

export default connect(null, mapDispatchToProps)(App)
