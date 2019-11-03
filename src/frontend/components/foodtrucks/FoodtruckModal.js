import React, { Component } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getFoodtruckInfo } from '../../actions/foodtrucks_action'

import {
  Title,
  Text,
  ModalFoodtrucks,
  ModalContainer,
  Image,
  Tag,
  Map,
  Subtext,
} from '../shared'
import { SNOW } from '../../styles/colors'
import Hours from './Hours'
import Menu from './Menu'

const Credit = s.div`
  width: 100%;
  padding: 0 1rem;
`

class FoodtruckModal extends Component {
  componentDidMount() {
    const { foodtruckId, dispatchGetFoodtruckInfo } = this.props
    if (foodtruckId) {
      dispatchGetFoodtruckInfo(foodtruckId)
    }
  }

  componentDidUpdate(prevProps) {
    const { foodtruckId: currId, dispatchGetFoodtruckInfo } = this.props
    const { foodtruckId: prevId } = prevProps

    if (prevId !== currId) {
      dispatchGetFoodtruckInfo(currId)
    }
  }

  render() {
    const { foodtruckId, infoPending, infoError, foodtruckInfo } = this.props
    const show = Boolean(foodtruckId)

    const {
      name,
      image,
      description,
      address,
      location,
      imageCredit,
      start,
      end,
      tags,
    } = foodtruckInfo || {}

    return (
      <ModalFoodtrucks show={show} toggle={this.toggle}>
        {foodtruckInfo ? (
          <>
            <ModalContainer>
              <Title marginBottom="2.5vh">{name}</Title>
            </ModalContainer>

            {image && <Image src={image} alt={name} marginBottom="2.5vh" />}

            {imageCredit && (
              <Credit>
                <Subtext>
                  {'Image credit: '}
                  <a href={imageCredit.link}>{imageCredit.name}</a>
                </Subtext>
              </Credit>
            )}

            {description && (
              <ModalContainer paddingTop="0.5rem">
                <Text>{description}</Text>
              </ModalContainer>
            )}

            {tags && (
              <ModalContainer paddingBottom="0.5rem">
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ModalContainer>
            )}

            <ModalContainer
              background={SNOW}
              paddingTop="1.5rem"
              paddingBottom="1rem"
            >
              <Text>
                <strong>Address</strong>
              </Text>
              <br />
              <Text>{address}</Text>
            </ModalContainer>

            {location && location.lat && location.lng ? (
              <Map
                mapId={name}
                location={location}
                showMarker
                gestureHandling="cooperative"
                height="50%"
              />
            ) : null}

            <ModalContainer paddingTop="1.5rem">
              <Menu foodtruckInfo={foodtruckInfo} />
              {/* <Hours start={start} end={end} /> */}
            </ModalContainer>
          </>
        ) : (
          <div />
        )}
      </ModalFoodtrucks>
    )
  }
}

FoodtruckModal.defaultProps = {
  location: null,
  spacesData: {},
  foodtruckId: null,
}

FoodtruckModal.propTypes = {
  foodtruckId: PropTypes.string,
  dispatchGetFoodtruckInfo: PropTypes.func.isRequired,
  spacesData: PropTypes.object, // eslint-disable-line
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

const mapStateToProps = ({ foodtrucks }) => {
  const { infoPending, infoError, foodtruckInfo } = foodtrucks
  return {
    infoPending,
    infoError,
    foodtruckInfo,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFoodtruckInfo: id => dispatch(getFoodtruckInfo(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoodtruckModal)
