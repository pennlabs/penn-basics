import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getLaundryHalls, getFavorites } from '../../actions/laundry_actions'


import {
  Card,
  Row,
  Col,
  Scrollbar,
  NavSectionHeader,
  Line,
} from '../shared'
import {
  BABY_BLUE,
  WHITE,
} from '../../styles/colors'
import PennLabsCredit from '../shared/PennLabsCredit'
import { NAV_HEIGHT } from '../../styles/sizes'
import LaundryCard from './LaundryCard'
import LaundryVenue from './LaundryVenue'
import Favorites from './Favorites'


class App extends Component {
  constructor(props) {
    super(props)
    const { dispatchGetLaundryHalls, dispatchGetFavorites } = this.props

    dispatchGetLaundryHalls()
    dispatchGetFavorites()
  }


  render() {
    const {
      laundryHalls,
      match: {
        params: {
          id,
        } = { params: { id: '' } },
      },
    } = this.props

    return (
      <Row maxHeight={`calc(100vh - ${NAV_HEIGHT})`}>
        <Scrollbar
          padding="0 0 .5rem 0"
          background={WHITE}
          overflowY="scroll"
          width="20%"
          borderRight
          minHeight={`calc(100vh - ${NAV_HEIGHT})`}
        >
          <Favorites />

          <Card background={BABY_BLUE} padding="0">
            <NavSectionHeader className="title is-5">Laundry Halls</NavSectionHeader>
            <Line />
          </Card>

          {laundryHalls && laundryHalls.map(locationObject => (
            <LaundryCard
              locationObject={locationObject}
              hallURLId={id}
            />
          ))}
          <PennLabsCredit />
        </Scrollbar>

        <Col width="80%" overflowY="scroll">
          <LaundryVenue hallURLId={id} />
        </Col>
      </Row>
    )
  }
}


const mapStateToProps = ({ laundry }) => {
  const { laundryHalls } = laundry
  return { laundryHalls }
}


const mapDispatchToProps = dispatch => ({
  dispatchGetLaundryHalls: () => dispatch(getLaundryHalls()),
  dispatchGetFavorites: () => dispatch(getFavorites()),
})


App.defaultProps = {
  laundryHalls: null,
}


App.propTypes = {
  laundryHalls: PropTypes.arrayOf(PropTypes.shape({
    halls: PropTypes.array,
    location: PropTypes.string,
  })),
  match: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  dispatchGetFavorites: PropTypes.func.isRequired,
  dispatchGetLaundryHalls: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
