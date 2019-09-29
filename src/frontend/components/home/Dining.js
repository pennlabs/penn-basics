import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { BorderedCard, Row, Col, Title, Subtext } from '../shared'
import DiningCard from '../dining/DiningCard'
import { getFavorites } from '../../actions/dining_actions'

class Dining extends Component {
  constructor(props) {
    super(props)

    const { dispatchGetFavorites } = this.props

    dispatchGetFavorites()
  }

  render() {
    const { favorites } = this.props

    return (
      <BorderedCard>
        <Link to="/dining" className="link">
          <Title>Dining</Title>
        </Link>

        <Subtext>Status of your favorite dining halls</Subtext>
        <br />

        <Row>
          {favorites.map((id, index) => {
            if (index <= 2) {
              return (
                <Col key={id}>
                  <DiningCard venueId={id} />
                </Col>
              )
            }

            return null
          })}
        </Row>
      </BorderedCard>
    )
  }
}

Dining.propTypes = {
  dispatchGetFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string),
}

Dining.defaultProps = {
  favorites: [],
}

const mapStateToProps = ({ dining }) => {
  const { favorites } = dining

  return {
    favorites,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dining)
