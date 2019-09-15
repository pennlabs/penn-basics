import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import uuid from 'uuid'

import venueData from '../../../server/database/venue_info.json'

import { BorderedCard, Row, Col } from '../shared'
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
          <h1 className="title is-4">Dining</h1>
          <h2 className="subtitle is-6">Status of your favorite dining halls</h2>
        </Link>
        <br />

        <Row>
          {
            favorites.map((id, index) => {
              if (index <= 2) {
                return (
                  <Col>
                    <DiningCard
                      key={uuid()}
                      venueId={id}
                      name={venueData[id].name}
                      image={venueData[id].image}
                    />
                  </Col>
                )
              }
            })
          }
        </Row>
      </BorderedCard>
    );
  }
}

const mapStateToProps = ({ dining }) => {
  const {
    favorites
  } = dining

  return {
    favorites
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFavorites: () => dispatch(getFavorites()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dining)
