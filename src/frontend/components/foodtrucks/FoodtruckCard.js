import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'next/link'
import s from 'styled-components'

import { Card, Subtitle, Subtext, Row, Col, Circle } from '../shared'
import { setHoveredFoodtruck } from '../../actions/foodtrucks_action'
import { DARK_GRAY } from '../../styles/colors'
import StarIcon from '../../../../public/img/foodtrucks/star.svg'
// import { getNoiseLevel, getOutletsLevel } from './mapper'

const StyledLink = s.a`
  h2 {
    color: ${DARK_GRAY} !important;
  }
`

const Content = s.div`
  width: 100%;
  position: relative;
  overflow-x: visible;
  padding-right: 0.5rem;
`

class FoodtruckCard extends Component {
  constructor(props) {
    super(props)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
  }

  handleMouseEnter() {
    const {
      hoveredFoodtruck,
      foodtruckId,
      dispatchSetHoveredFoodtruck,
    } = this.props

    // If there is no change to be made
    if (hoveredFoodtruck === foodtruckId) return

    dispatchSetHoveredFoodtruck(foodtruckId)
  }

  render() {
    const { name, open, hours, foodtruckId, overallRating, image } = this.props

    return (
      <Link
        href={`/foodtrucks?id=${foodtruckId}`}
        as={`/foodtrucks/${foodtruckId}`}
      >
        <StyledLink>
          <Card padding="0.5rem 0.5rem 0.5rem 1rem" hoverable>
            <Row>
              {image && (
                <Col backgroundImage={image} width="30%" borderRadius="4px" />
              )}
              <Col
                padding={image ? '0.5rem 0 0.5rem 1rem' : '0'}
                onMouseEnter={this.handleMouseEnter}
              >
                <Content>
                  <Subtitle marginBottom="0">{name}</Subtitle>

                  <Subtext marginBottom="0">
                    {open
                      ? ` Open: ${hours}`
                      : ` Closed • Opens at ${hours.substring(
                          0,
                          hours.indexOf('am')
                        )}am`}
                    {` • ${parseFloat(
                      Math.round(overallRating * 100) / 100
                    ).toFixed(2)}`}
                    &nbsp;
                    <StarIcon
                      fill="black"
                      color="black"
                      style={{
                        transform: 'scale(0.7) translateY(10px) translateX(-3px)',
                      }}
                      opacity="0.5"
                    />
                    {/* {outletsLevel ? ` • ${outletsLevel}` : ''}
                    {noiseLevel ? ` • ${noiseLevel}` : ''} */}
                  </Subtext>

                  <Circle open={open} />
                </Content>
              </Col>
            </Row>
          </Card>
        </StyledLink>
      </Link>
    )
  }
}

FoodtruckCard.defaultProps = {
  open: false,
  image: '',
  // outlets: -1,
  // quiet: -1,
  overallRating: null,
  hoveredFoodtruck: null,
}

FoodtruckCard.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool,
  image: PropTypes.string,
  // outlets: PropTypes.number,
  // quiet: PropTypes.number,
  overallRating: PropTypes.number,
  hours: PropTypes.string.isRequired,
  hoveredFoodtruck: PropTypes.string,
  foodtruckId: PropTypes.string.isRequired,
  dispatchSetHoveredFoodtruck: PropTypes.func.isRequired,
}

const mapStateToProps = ({ foodtrucks }) => {
  const { hoveredFoodtruck } = foodtrucks
  return { hoveredFoodtruck }
}

const mapDispatchToProps = dispatch => ({
  dispatchSetHoveredFoodtruck: foodtruckId =>
    dispatch(setHoveredFoodtruck(foodtruckId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodtruckCard)
