/* global window */

import React, { useState, useEffect } from 'react'
import { withRouter, SingletonRouter } from 'next/router'
import s from 'styled-components'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

// import Redux actions
import {
  getFoodtruckInfo,
  updateFoodtruckReview,
} from '../../actions/foodtrucks_action'

// import styles
import { SNOW } from '../../styles/colors'

// import Components
import Hours from './Hours'
import Menu from './Menu'
import Form from './Form'
import Review from './Review'
import { Button } from '../shared/Button'
import ModalFoodtrucks from '../shared/Modal'
import {
  Title,
  Text,
  ModalContainer,
  Image,
  Tag,
  FoodtruckMap,
} from '../shared'

// import SVG
import EditIcon from '../../../../public/img/foodtrucks/edit.svg'
import CommentIcon from '../../../../public/img/foodtrucks/message-circle.svg'
import StarIcon from '../../../../public/img/foodtrucks/star.svg'
import InfoIcon from '../../../../public/img/foodtrucks/info.svg'

// import constants
import { FOODTRUCKS_ROUTE } from '../../constants/routes'
import { IFormattedFoodtruck, IFoodTrucksReducerState } from '../../../types/foodtrucks'
import { IUser } from '../../../types/authentication'

const Buttons = s.div`
  float: right;
`

interface IChevronProps {
  expanded: boolean
}

const Chevron = s.span<IChevronProps>`
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

  ${({ expanded }): string =>
    expanded ?
    `
    margin: 4px 10px 0px 10px;
    -webkit-transform: rotate(-135deg);
    transform: rotate(-135deg);
    ` : ''}
`

const GOOGLE_URL = 'https://maps.google.com/maps?q='

interface IFoodtruckModalProps {
  foodtruckId: string
  dispatchGetFoodtruckInfo: (id: string) => void
  foodtruckInfo: IFormattedFoodtruck
  dispatchUpdateFoodtruckReview: (
    foodtruckID: string,
    pennID: number,
    fullName: string,
    rating: number,
    comment: string,
    showName: boolean,
  ) => void
  userInfo: IUser
  router: SingletonRouter
}

const FoodtruckModal: React.FC<IFoodtruckModalProps> = ({
  foodtruckId,
  dispatchGetFoodtruckInfo,
  foodtruckInfo,
  dispatchUpdateFoodtruckReview,
  userInfo,
  router,
}: IFoodtruckModalProps) => {
  const [showForm, setShowForm] = useState(false)
  const [showReview, setShowReview] = useState(false)

  useEffect(() => {
    if (foodtruckId) {dispatchGetFoodtruckInfo(foodtruckId)}
  }, [dispatchGetFoodtruckInfo, foodtruckId])

  const handleReviewOnClick = (): void => {
    if (loggedIn) {
      setShowForm(true)
    } else {
      window.location.href = `/api/auth/authenticate?successRedirect=${router.asPath}&failureRedirect=${router.asPath}`
    }
  }

  const show = Boolean(foodtruckId)

  const {
    name,
    image,
    description,
    location,
    start,
    end,
    tags,
    reviews,
    overallRating,
  } = foodtruckInfo || {}

  const { pennid, loggedIn } = userInfo || {}
  const userName = (userInfo || {}).displayName || (userInfo || {}).fullName

  return (
    <ModalFoodtrucks show={show} ROUTE={FOODTRUCKS_ROUTE}>
      <div style={{ minHeight: '80vh' }}>
        {(foodtruckInfo && name) && (
          <>
            <ModalContainer padding="5" style={{ marginBottom: '3vh' }}>
              {!showForm && (
                <Buttons>
                  <Button // eslint-disable-line
                    onClick={handleReviewOnClick}
                  >
                    <EditIcon style={{ fill: 'none', transform: 'scale(0.8)' }} /> Leave a Review
                  </Button>
                </Buttons>
              )}
              <Title marginBottom="0.5vh">{name}</Title>
              <span style={{ fontSize: '80%' }}>
                {(Math.round(overallRating * 100) / 100).toFixed(2)}
                &nbsp;
                <StarIcon
                  style={{
                    fill: 'none',
                    opacity: '0.7',
                    transform: 'scale(0.7) translateY(10px) translateX(-4px)',
                  }}
                />
              </span>
              <span style={{ fontSize: '80%' }}>
                {reviews.length}
                &nbsp;
                <CommentIcon
                  style={{
                    fill: 'none',
                    opacity: '0.7',
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
                hideFunction={(): void => {
                  setShowForm(false)
                }}
                updateReview={(rating, comment, showName): void => {
                  dispatchUpdateFoodtruckReview(
                    foodtruckId,
                    pennid,
                    userName,
                    rating,
                    comment,
                    showName
                  )
                }}
              />
            </ModalContainer>

            {image && <Image src={image} alt={name} marginBottom="2.5vh" />}

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
                  multiline={true}
                >
                  <div> Click on the marker to open Google Maps </div>
                </ReactTooltip>
              </Text>
              <br />
            </ModalContainer>

            {location && location.lat && location.lng ? (
              <FoodtruckMap
                mapId={name}
                location={location}
                showMarker
                gestureHandling="cooperative"
                height="50vh"
                handleClickMarker={(): void => {
                  window.open(`${GOOGLE_URL}${location.lat},${location.lng}`)
                }}
              />
            ) : null}

            <ModalContainer padding="5" paddingTop="1.5rem">
              <Text>
                <strong> Read Reviews ({reviews.length}) </strong>
              </Text>
              <Chevron
                onClick={(): void => {
                  setShowReview(!showReview)
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

interface IStateProps {
  foodtrucks: IFoodTrucksReducerState
  authentication: { userInfo: IUser }
}

const mapStateToProps = ({ foodtrucks, authentication }: IStateProps) => {
  const { infoPending, infoError, foodtruckInfo } = foodtrucks
  const { userInfo } = authentication
  return {
    infoPending,
    infoError,
    foodtruckInfo,
    userInfo,
  }
}

const mapDispatchToProps = (dispatch: (action: any) => any ) => ({
  dispatchGetFoodtruckInfo: (id: string) => dispatch(getFoodtruckInfo(id)),
  dispatchUpdateFoodtruckReview: (
    foodtruckID: string,
    pennID: number,
    fullName: string,
    rating: number,
    comment: string,
    showName: boolean,
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
