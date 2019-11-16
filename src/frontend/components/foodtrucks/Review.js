import React from 'react'

import { Line } from '../shared'

const Review = ({ show, reviews }) => {
  if (!show) return null
  return reviews.map(({ rating, comment }) => (
    <div style={{ fontSize: '90%' }}>
      {comment}
      <Line style={{ marginTop: '1em', marginBottom: '1em' }} />
    </div>
  ))
}

export default Review
