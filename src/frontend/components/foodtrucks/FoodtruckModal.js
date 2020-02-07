/* global window */

import React, { Component } from 'react'
import { withRouter } from 'next/router'
import s from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

import {
  getFoodtruckInfo,
  updateFoodtruckReview,
} from '../../actions/foodtrucks_action'
import {
  Title,
  Text,
  ModalContainer,
  Image,
  Tag,
  FoodtruckMap,
  Subtext,
} from '../shared'
import ModalFoodtrucks from '../shared/Modal'
import { SNOW } from '../../styles/colors'
import Hours from './Hours'
import Menu from './Menu'
import Form from './Form'
import Review from './Review'
import EditIcon from '../../../../public/img/foodtrucks/edit.svg'
import CommentIcon from '../../../../public/img/foodtrucks/message-circle.svg'
import StarIcon from '../../../../public/img/foodtrucks/star.svg'
import InfoIcon from '../../../../public/img/foodtrucks/info.svg'
import { Button } from '../shared/Button'
import { FOODTRUCKS_ROUTE } from '../../constants/routes'

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

const GOOGLE_URL = `https://maps.google.com/maps?q=`

class FoodtruckModal extends Component {
  constructor(props) {
    super(props)
    this.state = { showForm: false, showReview: false }
    this.handleReviewOnClick = this.handleReviewOnClick.bind(this)
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

    if (prevId !== currId && currId) {
      dispatchGetFoodtruckInfo(currId)
    }
  }

  handleReviewOnClick() {
    const {
      userInfo: { loggedIn },
      router,
    } = this.props
    if (loggedIn) {
      this.setState({ showForm: true })
    } else {
      console.log(router.pathname)
      window.location.href = `/api/auth/authenticate?successRedirect=${router.asPath}&failureRedirect=${router.asPath}`
    }
  }

  render() {
    const {
      foodtruckId,
      infoPending,
      infoError,
      foodtruckInfo,
      dispatchUpdateFoodtruckReview,
      userInfo,
    } = this.props

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
      reviews,
      overallRating,
    } = foodtruckInfo || {}

    const { pennid, fullName } = userInfo || {}

    const { showForm, showReview } = this.state

    return (
      <ModalFoodtrucks show={show} toggle={false} ROUTE={FOODTRUCKS_ROUTE}>
        <div style={{ minHeight: '80vh' }}>
          {foodtruckInfo && (
            <>
              <ModalContainer padding="5" style={{ marginBottom: '3vh' }}>
                {!showForm && (
                  <Buttons>
                    <Button // eslint-disable-line
                      onClick={this.handleReviewOnClick}
                    >
                      <EditIcon fill="none" viewBox="0 -2 30 30" /> Leave a
                      Review
                    </Button>
                  </Buttons>
                )}
                <Title marginBottom="0.5vh">{name}</Title>
                <span style={{ fontSize: '80%' }}>
                  {parseFloat(Math.round(overallRating * 100) / 100).toFixed(2)}
                  &nbsp;
                  <StarIcon
                    fill="none"
                    opacity="0.7"
                    style={{
                      transform: 'scale(0.7) translateY(10px) translateX(-4px)',
                    }}
                  />
                </span>
                <span style={{ fontSize: '80%' }}>
                  {reviews.length}
                  &nbsp;
                  <CommentIcon
                    fill="none"
                    opacity="0.7"
                    style={{
                      transform: 'scale(0.7) translateY(10px) translateX(-4px)',
                    }}
                  />
                </span>
              </ModalContainer>

              {tags && (
                <ModalContainer paddingBottom="0.5rem" padding="5">
                  {tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </ModalContainer>
              )}

              <ModalContainer
                paddingTop="1.5rem"
                paddingBottom="1rem"
                padding="5"
              >
                <Form
                  show={showForm}
                  hideFunction={() => {
                    this.setState({ showForm: false })
                  }}
                  updateReview={(rating, comment, showName) => {
                    dispatchUpdateFoodtruckReview(
                      foodtruckId,
                      pennid,
                      fullName,
                      rating,
                      comment,
                      showName
                    )
                  }}
                />
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

              <ModalContainer
                background={SNOW}
                paddingTop="1.5rem"
                paddingBottom="1rem"
                padding="5"
              >
                <Text>
                  <strong>Address</strong>
                  <InfoIcon
                    style={{
                      transform: 'scale(0.8) translateY(8px)',
                      marginLeft: '0.5rem',
                    }}
                    data-tip
                    data-for="infoIcon"
                  />
                  <ReactTooltip
                    id="infoIcon"
                    place="right"
                    type="dark"
                    effect="solid"
                    multiline="true"
                  >
                    <div> Click on the marker to open Google Maps </div>
                  </ReactTooltip>
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
                  height="50vh"
                  handleClickMarker={() => {
                    window.open(`${GOOGLE_URL}${location.lat},${location.lng}`)
                  }}
                />
              ) : null}

              <ModalContainer padding="5" paddingTop="1.5rem">
                <Text>
                  <strong> Read Reviews ({reviews.length}) </strong>
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
                <Hours start={start} end={end} />
                <Menu foodtruckInfo={foodtruckInfo} />
              </ModalContainer>
            </>
          )}
        </div>
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

const mapStateToProps = ({ foodtrucks, authentication }) => {
  const { infoPending, infoError, foodtruckInfo } = foodtrucks
  const { userInfo } = authentication
  return {
    infoPending,
    infoError,
    foodtruckInfo,
    userInfo,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchGetFoodtruckInfo: id => dispatch(getFoodtruckInfo(id)),
  dispatchUpdateFoodtruckReview: (
    foodtruckID,
    pennID,
    fullName,
    rating,
    comment,
    showName
  ) =>
    dispatch(
      updateFoodtruckReview(
        foodtruckID,
        pennID,
        fullName,
        rating,
        comment,
        showName
      )
    ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FoodtruckModal))
