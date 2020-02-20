import React from 'react'
import moment from 'moment'

import { Line } from '../shared'
import StarIcon from '../../../../public/img/foodtrucks/star.svg'
import { IFoodTruckUserReview } from '../../../types/foodtrucks'

const array = [1, 2, 3, 4, 5]

interface IRatingProps {
  rating: number
}

const Rating: React.FC<IRatingProps> = ({ rating }) => (
  <span>
    {array.map(index => (
      <StarIcon
        key={`rating-icon-${index}`}
        fill={rating && index <= rating ? '#ffc520' : 'none'}
        style={{ transform: 'scale(0.7) translateY(9px)', color: '#ffc520' }}
      />
    ))}
  </span>
)

interface IReviewProps {
  show: boolean
  reviews: IFoodTruckUserReview[]
}

const Review: React.FC<IReviewProps> = ({ show, reviews }) => {
  if (!show) {return <React.Fragment />}

  return (
    <>
      {reviews.map(({ rating, fullName, comment, timeEdited, showName }, idx) => (
        <div style={{ fontSize: '90%' }} key={`review-div-${idx}`}>
          <div style={{ marginBottom: '1em' }}>
            <strong style={{ marginRight: '0.3em' }}>
              {' '}
              {showName ? fullName : 'Anonymous Reviewer'}{' '}
            </strong>
            <Rating rating={rating} />
            <span style={{ float: 'right', transform: 'translateY(9px)' }}>
              {moment(timeEdited).format('MM/D/YYYY h:mma')}
            </span>
          </div>
          {comment}
          <Line style={{ marginTop: '1em', marginBottom: '1em' }} />
        </div>
      ))}
    </>
  )
}

export default Review
