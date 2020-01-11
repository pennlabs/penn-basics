import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { BorderedCard, Row, Col, Title, Subtext } from '../shared'
import DiningCard from '../dining/DiningCard'
import { getFavorites } from '../../actions/dining_actions'
import { BORDER } from '../../styles/colors'

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
        <Link href="/dining">
          <a>
            <Title>Dining</Title>
          </a>
        </Link>

        <Subtext>Status of your favorite dining halls</Subtext>
        <br />

        <Row margin="0.5rem">
          {favorites.map((id, index) => {
            if (index <= 2) {
              return (
                <Col margin="0.5rem" key={id}>
                  <DiningCard
                    venueId={id}
                    showLine={false}
                    style={{
                      border: `1px solid ${BORDER}`,
                      borderRadius: '4px',
                      marginBottom: '0.5rem',
                    }}
                  />
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
