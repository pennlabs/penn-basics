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
  FoodtruckMap,
  Subtext,
} from '../shared'
import { SNOW, LIGHT_GRAY } from '../../styles/colors'
import Hours from './Hours'
import Menu from './Menu'
import Form from './Form'
import Review from './Review'
import EditIcon from '../../../../public/img/foodtrucks/edit.svg'
import CommentIcon from '../../../../public/img/foodtrucks/message-circle.svg'
import StarIcon from '../../../../public/img/foodtrucks/star.svg'

const Credit = s.div`
  width: 100%;
  padding: 0 1rem;
`

const Buttons = s.div`
  float: right;
`

const Chevron = s.span`
  cursor: pointer;
  right: 0;
  margin: 4px 10px 4px 10px;
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);

  ${({ expanded }) =>
    expanded &&
    `
    margin: 4px 10px 0px 10px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    `}
`
const reviews = ["hello", "this is a nice foodtruck"]

class FoodtruckModal extends Component {
  constructor(props) {
    super(props)
    this.state = { showForm: false, showReview: false }
  }

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

    const { showForm, showReview } = this.state

    return (
      <ModalFoodtrucks show={show} toggle={this.toggle}>
        {foodtruckInfo ? (
          <>
            <ModalContainer padding="5" style={{ marginBottom: '3vh' }}>
              {!showForm && (
                <Buttons>
                  <span // eslint-disable-line
                    className="button is-info"
                    onClick={() => {
                      this.setState({ showForm: true })
                    }}
                  >
                    <EditIcon fill="none" />
                    &nbsp; Leave a Review
                  </span>
                </Buttons>
              )}
              <Title marginBottom="0.5vh">{name}</Title>
              <span style={{ fontSize: '80%' }}>
                5.00&nbsp;
                <StarIcon fill="none" viewBox="0 -18 40 40" />
                {/* <i className="fas fa-star" /> */}
              </span>
              <span style={{ fontSize: '80%' }}>
                10&nbsp;
                <CommentIcon fill="none" viewBox="0 -18 40 40" />
                {/* <i className="fas fa-comment-alt" /> */}
              </span>
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
              <ModalContainer paddingTop="0.5rem" padding="5">
                <Text>{description}</Text>
              </ModalContainer>
            )}

            {tags && (
              <ModalContainer paddingBottom="0.5rem" padding="5">
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </ModalContainer>
            )}

            <ModalContainer
              background={SNOW}
              paddingTop="1.5rem"
              paddingBottom="1rem"
              padding="5"
            >
              <Form
                show={showForm}
                hideFunction={() => {
                  this.setState({ showForm: false })
                }}
              />
              <Text>
                <strong>Address</strong>
              </Text>
              <br />
              <Text>{address}</Text>
            </ModalContainer>

            {location && location.lat && location.lng ? (
              <FoodtruckMap
                mapId={name}
                location={location}
                showMarker
                gestureHandling="cooperative"
                height="50%"
              />
            ) : null}

            <ModalContainer padding="5" paddingTop="1.5rem">
              <Text>
                <strong> Read Reviews (10)</strong>
              </Text>
              <Chevron
                onClick={() => {
                  this.setState({ showReview: !showReview })
                }}
                expanded={showReview}
              />
              <Review show={showReview} reviews={reviews} />
            </ModalContainer>

            <ModalContainer paddingTop="1.5rem" padding="5">
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
