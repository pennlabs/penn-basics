import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuid from 'uuid'
import s from 'styled-components'
import { getLaundryHall } from '../../actions/laundry_actions'


import {
  Card,
  Text,
  Row,
  Line,
  Col,
} from '../shared'


import { DARK_GRAY } from '../../styles/colors'


const StyledLink = s(Link)`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`


class FavoriteCard extends Component {
  handleKeyPress(event) {
    if (event.keyCode === 32) {
      this.toggleModal()
    }
  }


  render() {
    const { hallId, locationName } = this.props

    return (
      <StyledLink to={`/laundry/${hallId}`} key={uuid()}>
        <Card padding="0.5rem 1rem" hoverable>
          <Row>
            <Col padding="0">
              <Text medium color={DARK_GRAY} marginBottom="0">
                {locationName}
              </Text>
            </Col>
          </Row>
        </Card>
        <Line />
      </StyledLink>
    )
  }
}


FavoriteCard.defaultProps = {
  hallId: null,
  locationName: null,
}


FavoriteCard.propTypes = {
  hallId: PropTypes.string,
  locationName: PropTypes.string,
}


const mapDispatchToProps = dispatch => ({
  dispatchGetLaundryHall: hallId => dispatch(getLaundryHall(hallId)),
})


export default connect(null, mapDispatchToProps)(FavoriteCard)
