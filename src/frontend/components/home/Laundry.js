import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'

import {
  BorderedCard,
  Text,
  Title,
  Subtext,
  Col,
  Row,
  ColSpace,
  Subtitle,
} from '../shared'
import MachineAvailability from '../laundry/MachineAvailability'

import { getFavoritesHomePage } from '../../actions/laundry_actions'

class Laundry extends Component {
  componentDidMount() {
    const { dispatchGetFavoritesHomePage } = this.props
    dispatchGetFavoritesHomePage()
  }

  renderFavorites() {
    const { favoritesHome } = this.props

    if (!favoritesHome || favoritesHome.length === 0) {
      return (
        <Link href="/laundry">
          <a>
            <h4>Select your favorite Laundry hall</h4>
          </a>
        </Link>
      )
    }

    return favoritesHome.map(favorite => {
      const { washers, dryers } = favorite.machines

      return (
        <BorderedCard
          key={`laundryFavorite-${favorite.id}`}
          padding="1rem 1rem 0 1rem"
        >
          <Link href={`/laundry/${favorite.id}`} as={`/laundry/${favorite.id}`}>
            <a>
              <Subtitle>{`${favorite.location}: ${favorite.hall_name}`}</Subtitle>
            </a>
          </Link>
          <Row>
            <Col>
              <Text>Washer</Text>
              <MachineAvailability
                displayDetails={false}
                machineData={washers}
              />
            </Col>
            <ColSpace />
            <Col>
              <Text>Dryer</Text>
              <MachineAvailability
                displayDetails={false}
                machineData={dryers}
              />
            </Col>
          </Row>
        </BorderedCard>
      )
    })
  }

  render() {
    return (
      <BorderedCard>
        <Link href="/laundry">
          <a>
            <Title>Laundry</Title>
          </a>
        </Link>
        <Subtext>Status of your favorite halls</Subtext>

        <br />
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
