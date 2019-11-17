import React from 'react'
import moment from 'moment'

import { Line } from '../shared'
import StarIcon from '../../../../public/img/foodtrucks/star.svg'

const array = [1, 2, 3, 4, 5]

const Rating = ({ rating }) => (
  <span>
    {array.map(index => (
      <StarIcon
        color="#ffc520"
        fill={rating && index <= rating ? '#ffc520' : 'none'}
        style={{ transform: 'scale(0.7) translateY(9px)' }}
      />
    ))}
  </span>
)

const Review = ({ show, reviews }) => {
  if (!show) return null
  return reviews.map(({ rating, comment, timeEdited }) => (
    <div style={{ fontSize: '90%' }}>
      <div style={{ marginBottom: '1em' }}>
        <strong style={{ marginRight: '0.3em' }}> Peter Chen </strong>
        <Rating rating={rating} />
        <span style={{ float: 'right', transform: 'translateY(9px)' }}>
          {moment(timeEdited).format('MM/D/YYYY h:mma')}
        </span>
      </div>
      {comment}
      <Line style={{ marginTop: '1em', marginBottom: '1em' }} />
    </div>
  ))
}

export default Review
