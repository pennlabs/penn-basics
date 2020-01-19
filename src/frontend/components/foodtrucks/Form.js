import React, { useState } from 'react'
import s from 'styled-components'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

import StarIcon from '../../../../public/img/foodtrucks/star.svg'
import InfoIcon from '../../../../public/img/foodtrucks/info.svg'
import { Text } from '../shared'
import { FOCUS_GRAY, BORDER } from '../../styles/colors'

const TextArea = s.textarea`
  resize: none;
  width: 100%;
  height: 10em;
  border: 1px solid ${FOCUS_GRAY};
  padding: 1em;
  margin-bottom: 1em;

  :focus {
    outline: none;
    border: 1px solid ${BORDER};
  }
`

const Buttons = s.div`
  float: right;
`

const array = [1, 2, 3, 4, 5]

const Rating = ({ rating, setRating }) => (
  <div>
    {array.map(index => (
      <span // eslint-disable-line
        style={{ marginRight: '0.5em', cursor: 'pointer' }}
        onClick={() => {
          setRating(index)
        }}
      >
        <StarIcon
          color="#ffc520"
          fill={rating && index <= rating ? '#ffc520' : 'none'}
          viewBox="0 0 25 25"
        />
      </span>
    ))}
  </div>
)

const Form = ({ show, hideFunction, updateReview }) => {
  const [rating, setRating] = useState(null)
  const [comment, setComment] = useState(null)
  if (!show) return null

  return (
    <div style={{ marginBottom: '3rem' }}>
      <Text>
        <strong>Write a Review</strong>
      </Text>
      <br />
      <Rating rating={rating} setRating={setRating} />
      <br />
      <TextArea onChange={e => setComment(e.target.value)} />
      <Buttons>
        <span // eslint-disable-line
          className="button is-light"
          onClick={() => {
            hideFunction()
            setRating(null)
            setComment(null)
          }}
        >
          Cancel
        </span>
        <span // eslint-disable-line
          className="button is-success is-light"
          style={{ marginLeft: '0.5rem' }}
          disabled={!rating || !comment}
          onClick={() => {
            hideFunction()
            updateReview(rating, comment)
          }}
        >
          Submit
        </span>
      </Buttons>
      <div>
        <span style={{ fontSize: '80%' }}>
          Show My Name
          <InfoIcon
            style={{ transform: 'scale(0.8) translateY(8px) translateX(2px)' }}
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
            <div style={{ width: '200px' }}>
              Please note that every submitted review will be associated with
              your account information.
            </div>
          </ReactTooltip>
        </span>
      </div>
    </div>
  )
}

Form.defaultProps = {
  show: false,
}

Form.propTypes = {
  show: PropTypes.bool,
  hideFunction: PropTypes.func.isRequired,
  updateReview: PropTypes.func.isRequired,
}

Rating.defaultProps = {
  rating: null,
}

Rating.propTypes = {
  rating: Number,
  setRating: PropTypes.func.isRequired,
}

export default Form
